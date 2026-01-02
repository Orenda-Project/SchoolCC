import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, Square, Play, Pause, Trash2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface VoiceRecorderProps {
  onTranscriptionComplete: (transcription: string, audioBlob: Blob) => void;
  disabled?: boolean;
}

export function VoiceRecorder({ onTranscriptionComplete, disabled }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setAudioBlob(blob);
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

      toast.success('Recording started');
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast.error('Could not access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      toast.success('Recording stopped');
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      if (isPaused) {
        mediaRecorderRef.current.resume();
        setIsPaused(false);
        // Resume timer
        timerRef.current = setInterval(() => {
          setRecordingTime(prev => prev + 1);
        }, 1000);
      } else {
        mediaRecorderRef.current.pause();
        setIsPaused(true);
        // Pause timer
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      }
    }
  };

  const playAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const deleteRecording = () => {
    setAudioBlob(null);
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
    setRecordingTime(0);
    toast.info('Recording deleted');
  };

  const transcribeAudio = async () => {
    if (!audioBlob) {
      toast.error('No audio to transcribe');
      return;
    }

    setIsTranscribing(true);
    try {
      const formData = new FormData();
      formData.append('audio', audioBlob, 'recording.webm');

      const response = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Transcription failed');
      }

      const data = await response.json();
      onTranscriptionComplete(data.transcription, audioBlob);
      toast.success('Audio transcribed successfully');
    } catch (error) {
      console.error('Transcription error:', error);
      toast.error('Failed to transcribe audio. Please try again.');
    } finally {
      setIsTranscribing(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-4 p-4 border border-border rounded-lg bg-card">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Voice Notes</h3>
        {isRecording && (
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
            <span className="text-sm font-mono text-muted-foreground">
              {formatTime(recordingTime)}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {!isRecording && !audioBlob && (
          <Button
            onClick={startRecording}
            disabled={disabled}
            className="flex items-center gap-2"
          >
            <Mic className="w-4 h-4" />
            Start Recording
          </Button>
        )}

        {isRecording && (
          <>
            <Button
              onClick={pauseRecording}
              variant="outline"
              className="flex items-center gap-2"
            >
              {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
              {isPaused ? 'Resume' : 'Pause'}
            </Button>
            <Button
              onClick={stopRecording}
              variant="destructive"
              className="flex items-center gap-2"
            >
              <Square className="w-4 h-4" />
              Stop
            </Button>
          </>
        )}

        {audioBlob && !isRecording && (
          <>
            <Button
              onClick={playAudio}
              variant="outline"
              className="flex items-center gap-2"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isPlaying ? 'Pause' : 'Play'}
            </Button>
            <Button
              onClick={transcribeAudio}
              disabled={isTranscribing}
              className="flex items-center gap-2"
            >
              {isTranscribing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Transcribing...
                </>
              ) : (
                'Transcribe'
              )}
            </Button>
            <Button
              onClick={deleteRecording}
              variant="ghost"
              size="icon"
              className="text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </>
        )}
      </div>

      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onEnded={() => setIsPlaying(false)}
          onTimeUpdate={() => {
            if (audioRef.current) {
              setRecordingTime(Math.floor(audioRef.current.currentTime));
            }
          }}
          onLoadedMetadata={() => {
            if (audioRef.current && !isPlaying) {
              setRecordingTime(Math.floor(audioRef.current.duration));
            }
          }}
          className="hidden"
        />
      )}

      {audioBlob && (
        <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
          <Button
            onClick={playAudio}
            variant="ghost"
            size="icon"
            className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          <div className="flex-1">
            <div className="h-2 bg-background rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-150"
                style={{
                  width: audioRef.current ?
                    `${(audioRef.current.currentTime / audioRef.current.duration) * 100}%` :
                    '0%'
                }}
              />
            </div>
          </div>
          <span className="text-xs font-mono text-muted-foreground flex-shrink-0 w-12 text-right">
            {formatTime(recordingTime)}
          </span>
        </div>
      )}
    </div>
  );
}
