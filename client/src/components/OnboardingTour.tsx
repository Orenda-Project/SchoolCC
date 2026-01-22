import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export interface TourStep {
  target: string;
  title: string;
  content: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  onBeforeStep?: () => void;
  allowSkip?: boolean; // New: allow skipping specific steps
}

interface OnboardingTourProps {
  steps: TourStep[];
  isOpen: boolean;
  onComplete: () => void;
  onSkip?: () => void; // Made optional - not all tours are skippable
  storageKey?: string;
  mandatory?: boolean; // New: makes tour mandatory (no skip/close)
}

export function OnboardingTour({ steps, isOpen, onComplete, onSkip, storageKey, mandatory = false }: OnboardingTourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const step = steps[currentStep];

  const updateTargetPosition = useCallback(() => {
    if (!step?.target) return;

    const element = document.querySelector(step.target);
    if (element) {
      const rect = element.getBoundingClientRect();
      setTargetRect(rect);
      setIsVisible(true);

      // Scroll element into view without blocking it
      element.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
    }
  }, [step?.target]);

  useEffect(() => {
    if (!isOpen || !step) return;

    step.onBeforeStep?.();

    const timer = setTimeout(updateTargetPosition, 100);

    window.addEventListener('resize', updateTargetPosition);
    window.addEventListener('scroll', updateTargetPosition);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateTargetPosition);
      window.removeEventListener('scroll', updateTargetPosition);
    };
  }, [isOpen, step, updateTargetPosition]);

  // Don't prevent scrolling - let users interact naturally
  useEffect(() => {
    if (isOpen) {
      // Allow scrolling but prevent body from shifting
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setIsVisible(false);
      setTimeout(() => setCurrentStep(prev => prev + 1), 150);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setIsVisible(false);
      setTimeout(() => setCurrentStep(prev => prev - 1), 150);
    }
  };

  const handleComplete = () => {
    if (storageKey) {
      localStorage.setItem(storageKey, 'completed');
    }
    onComplete();
  };

  const handleSkip = () => {
    if (mandatory) return; // Can't skip mandatory tours

    if (storageKey) {
      localStorage.setItem(storageKey, 'skipped');
    }
    onSkip?.();
  };

  if (!isOpen || !step || !targetRect) return null;

  const getTooltipPosition = () => {
    const preferredPlacement = step.placement || 'bottom';
    const padding = 16;
    const arrowOffset = 16;

    // Responsive tooltip sizing
    const isMobile = window.innerWidth < 640;
    const tooltipWidth = isMobile ? Math.min(window.innerWidth - 32, 280) : 320;
    const maxTooltipHeight = isMobile ? 180 : 220;

    const calculatePosition = (placement: string) => {
      let top = 0;
      let left = 0;

      switch (placement) {
        case 'top':
          top = targetRect.top - maxTooltipHeight - arrowOffset;
          left = targetRect.left + (targetRect.width / 2) - (tooltipWidth / 2);
          break;
        case 'bottom':
          top = targetRect.bottom + arrowOffset;
          left = targetRect.left + (targetRect.width / 2) - (tooltipWidth / 2);
          break;
        case 'left':
          top = targetRect.top + (targetRect.height / 2) - (maxTooltipHeight / 2);
          left = targetRect.left - tooltipWidth - arrowOffset;
          break;
        case 'right':
          top = targetRect.top + (targetRect.height / 2) - (maxTooltipHeight / 2);
          left = targetRect.right + arrowOffset;
          break;
      }

      return { top, left, placement };
    };

    let result = calculatePosition(preferredPlacement);

    // Smart repositioning to avoid covering target or going off-screen
    if (result.left < padding) {
      if (preferredPlacement === 'left') {
        result = calculatePosition('right');
      } else {
        result.left = padding;
      }
    }
    if (result.left + tooltipWidth > window.innerWidth - padding) {
      if (preferredPlacement === 'right') {
        result = calculatePosition('left');
      } else {
        result.left = window.innerWidth - tooltipWidth - padding;
      }
    }
    if (result.top < padding + 60) { // Extra padding at top for status bar
      if (preferredPlacement === 'top') {
        result = calculatePosition('bottom');
      } else {
        result.top = padding + 60;
      }
    }
    if (result.top + maxTooltipHeight > window.innerHeight - padding - 100) { // Extra padding at bottom for nav/buttons
      if (preferredPlacement === 'bottom') {
        result = calculatePosition('top');
      } else {
        result.top = window.innerHeight - maxTooltipHeight - padding - 100;
      }
    }

    return result;
  };

  const getArrowStyle = (actualPlacement: string) => {
    const baseStyle = {
      position: 'absolute' as const,
      width: 0,
      height: 0,
      borderStyle: 'solid',
    };

    switch (actualPlacement) {
      case 'top':
        return {
          ...baseStyle,
          bottom: -10,
          left: '50%',
          transform: 'translateX(-50%)',
          borderWidth: '10px 10px 0 10px',
          borderColor: 'white transparent transparent transparent',
        };
      case 'bottom':
        return {
          ...baseStyle,
          top: -10,
          left: '50%',
          transform: 'translateX(-50%)',
          borderWidth: '0 10px 10px 10px',
          borderColor: 'transparent transparent white transparent',
        };
      case 'left':
        return {
          ...baseStyle,
          right: -10,
          top: '50%',
          transform: 'translateY(-50%)',
          borderWidth: '10px 0 10px 10px',
          borderColor: 'transparent transparent transparent white',
        };
      case 'right':
        return {
          ...baseStyle,
          left: -10,
          top: '50%',
          transform: 'translateY(-50%)',
          borderWidth: '10px 10px 10px 0',
          borderColor: 'transparent white transparent transparent',
        };
    }
  };

  const tooltipPos = getTooltipPosition();

  return (
    <div className="fixed inset-0 z-[35]" data-testid="onboarding-tour">
      {/* Semi-transparent overlay with spotlight - lower z-index than PWA button (z-40) */}
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ pointerEvents: 'none' }}
      >
        <defs>
          <mask id="spotlight-mask">
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            <rect
              x={targetRect.left - 8}
              y={targetRect.top - 8}
              width={targetRect.width + 16}
              height={targetRect.height + 16}
              rx="12"
              fill="black"
            />
          </mask>
        </defs>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="rgba(0, 0, 0, 0.6)"
          mask="url(#spotlight-mask)"
        />
      </svg>

      {/* Clickable area over the highlighted element - allows users to interact */}
      <div
        className="absolute"
        style={{
          top: targetRect.top - 8,
          left: targetRect.left - 8,
          width: targetRect.width + 16,
          height: targetRect.height + 16,
          zIndex: 36,
          pointerEvents: 'auto',
        }}
        onClick={(e) => {
          // Allow click-through to the actual element
          const targetElement = document.querySelector(step.target) as HTMLElement;
          if (targetElement && targetElement.contains(e.target as Node)) {
            // Let the natural click propagate
            return;
          }
        }}
      />

      {/* Visual highlight ring around the target */}
      <div
        className="absolute rounded-2xl ring-4 ring-amber-400 ring-offset-2 pointer-events-none transition-all duration-300"
        style={{
          top: targetRect.top - 8,
          left: targetRect.left - 8,
          width: targetRect.width + 16,
          height: targetRect.height + 16,
          opacity: isVisible ? 1 : 0,
          zIndex: 36,
          boxShadow: '0 0 0 4px rgba(251, 191, 36, 0.3), 0 0 30px rgba(251, 191, 36, 0.4)',
        }}
      />

      {/* Tooltip - positioned to not cover important content */}
      <div
        className={`absolute bg-white dark:bg-slate-800 rounded-lg shadow-2xl p-4 transition-all duration-300 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
        style={{
          top: tooltipPos.top,
          left: tooltipPos.left,
          maxWidth: 'calc(100vw - 2rem)',
          width: window.innerWidth < 640 ? 'calc(100vw - 2rem)' : '320px',
          zIndex: 36,
        }}
      >
        <div style={getArrowStyle(tooltipPos.placement)} />

        <div className="mb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-amber-600 bg-amber-100 dark:bg-amber-900/30 px-2 py-1 rounded-full">
              Step {currentStep + 1} of {steps.length}
            </span>
            {!mandatory && (
              <span className="text-xs text-gray-400">Tap any step to skip</span>
            )}
          </div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">
            {step.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            {step.content}
          </p>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-slate-700">
          <div className="flex gap-1.5">
            {steps.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (!mandatory) {
                    setIsVisible(false);
                    setTimeout(() => setCurrentStep(idx), 150);
                  }
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentStep
                    ? 'bg-amber-500 w-6'
                    : idx < currentStep
                    ? 'bg-amber-300'
                    : 'bg-gray-200 dark:bg-slate-600'
                } ${!mandatory ? 'cursor-pointer hover:scale-125' : ''}`}
                disabled={mandatory}
              />
            ))}
          </div>

          <div className="flex gap-2">
            {currentStep > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrev}
                className="h-9 min-w-[44px]"
                data-testid="tour-prev-button"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
            )}
            <Button
              size="sm"
              onClick={handleNext}
              className="h-9 min-w-[44px] bg-amber-500 hover:bg-amber-600 text-white"
              data-testid="tour-next-button"
            >
              {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
              {currentStep < steps.length - 1 && <ChevronRight className="w-4 h-4 ml-1" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function useTourStatus(storageKey: string) {
  const [hasSeenTour, setHasSeenTour] = useState(() => {
    return localStorage.getItem(storageKey) !== null;
  });

  const markComplete = () => {
    localStorage.setItem(storageKey, 'completed');
    setHasSeenTour(true);
  };

  const resetTour = () => {
    localStorage.removeItem(storageKey);
    setHasSeenTour(false);
  };

  return { hasSeenTour, markComplete, resetTour };
}
