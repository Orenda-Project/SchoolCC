import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, X } from 'lucide-react';

export interface MobileTourStep {
  title: string;
  content: string;
  action?: string; // What the user should do
}

interface MobileOnboardingProps {
  steps: MobileTourStep[];
  isOpen: boolean;
  onComplete: () => void;
  storageKey?: string;
  mandatory?: boolean;
}

/**
 * Mobile-first onboarding that NEVER blocks content
 * Uses a bottom sheet approach instead of spotlight overlay
 */
export function MobileOnboarding({ steps, isOpen, onComplete, storageKey, mandatory = false }: MobileOnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const step = steps[currentStep];

  useEffect(() => {
    if (isOpen) {
      // Small delay for smooth entrance
      const timer = setTimeout(() => setIsVisible(true), 300);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    if (storageKey) {
      localStorage.setItem(storageKey, 'completed');
    }
    setIsVisible(false);
    setTimeout(onComplete, 300);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Minimal semi-transparent backdrop - doesn't block interaction */}
      <div
        className={`fixed inset-0 bg-black/20 transition-opacity duration-300 z-30 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={!mandatory ? handleComplete : undefined}
      />

      {/* Bottom sheet that slides up - NEVER covers content */}
      <div
        className={`fixed left-0 right-0 bottom-0 z-[45] bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/90 dark:to-orange-900/90 rounded-t-3xl shadow-2xl transition-transform duration-500 ease-out ${
          isVisible ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{
          maxHeight: '40vh', // Only takes up bottom 40% of screen
        }}
      >
        {/* Handle bar for visual affordance */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full" />
        </div>

        <div className="px-6 pb-6 overflow-y-auto" style={{ maxHeight: 'calc(40vh - 60px)' }}>
          {/* Progress indicator */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-2">
              {steps.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === currentStep
                      ? 'w-8 bg-amber-600'
                      : idx < currentStep
                      ? 'w-4 bg-amber-400'
                      : 'w-4 bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-medium text-amber-700 dark:text-amber-300">
              {currentStep + 1} of {steps.length}
            </span>
          </div>

          {/* Content */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {step.title}
            </h3>
            <p className="text-base text-gray-700 dark:text-gray-200 leading-relaxed">
              {step.content}
            </p>
            {step.action && (
              <div className="flex items-center gap-2 p-3 bg-amber-100 dark:bg-amber-800/50 rounded-lg">
                <ChevronRight className="w-5 h-5 text-amber-700 dark:text-amber-300 flex-shrink-0" />
                <p className="text-sm font-medium text-amber-900 dark:text-amber-100">
                  {step.action}
                </p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-6">
            <Button
              onClick={handleNext}
              className="flex-1 h-12 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold shadow-lg"
              size="lg"
            >
              {currentStep === steps.length - 1 ? 'Got it! Start Using App' : 'Next'}
            </Button>
            {!mandatory && (
              <Button
                onClick={handleComplete}
                variant="ghost"
                className="h-12 min-w-[48px]"
                size="icon"
              >
                <X className="w-5 h-5" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export function useMobileOnboardingStatus(storageKey: string) {
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(() => {
    return localStorage.getItem(storageKey) !== null;
  });

  const markComplete = () => {
    localStorage.setItem(storageKey, 'completed');
    setHasSeenOnboarding(true);
  };

  const resetOnboarding = () => {
    localStorage.removeItem(storageKey);
    setHasSeenOnboarding(false);
  };

  return { hasSeenOnboarding, markComplete, resetOnboarding };
}
