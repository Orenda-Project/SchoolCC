import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VoiceNotePlayerProps {
  audioUrl: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function VoiceNotePlayer({ audioUrl, className, size = 'md' }: VoiceNotePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const sizeClasses = {
    sm: {
      container: 'p-2 gap-2',
      button: 'w-8 h-8',
      icon: 'w-3 h-3',
      progress: 'h-1',
      text: 'text-[10px] w-10',
    },
    md: {
      container: 'p-3 gap-3',
      button: 'w-10 h-10',
      icon: 'w-4 h-4',
      progress: 'h-2',
      text: 'text-xs w-12',
    },
    lg: {
      container: 'p-4 gap-4',
      button: 'w-12 h-12',
      icon: 'w-5 h-5',
      progress: 'h-2.5',
      text: 'text-sm w-14',
    },
  };

  const sizes = sizeClasses[size];

  return (
    <div className={cn('flex items-center bg-muted rounded-lg', sizes.container, className)}>
      <Button
        onClick={togglePlay}
        variant="ghost"
        size="icon"
        className={cn('flex-shrink-0 rounded-full bg-primary text-primary-foreground hover:bg-primary/90', sizes.button)}
      >
        {isPlaying ? (
          <Pause className={sizes.icon} />
        ) : (
          <Play className={cn(sizes.icon, 'ml-0.5')} />
        )}
      </Button>

      <div className="flex-1 min-w-0">
        <div className={cn('bg-background rounded-full overflow-hidden', sizes.progress)}>
          <div
            className="h-full bg-primary transition-all duration-150"
            style={{
              width: duration > 0 ? `${(currentTime / duration) * 100}%` : '0%',
            }}
          />
        </div>
      </div>

      <span className={cn('font-mono text-muted-foreground flex-shrink-0 text-right', sizes.text)}>
        {formatTime(isPlaying ? currentTime : duration)}
      </span>

      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        className="hidden"
      />
    </div>
  );
}
