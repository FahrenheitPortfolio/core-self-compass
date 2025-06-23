import React, { useState, useRef } from 'react';
import { Mic, MicOff, Play, Pause, Square } from 'lucide-react';

const VoiceJournal = ({ onTranscript }: { onTranscript: (text: string) => void }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/wav' });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        
        // Simple speech recognition (if available)
        if ('webkitSpeechRecognition' in window) {
          const recognition = new (window as any).webkitSpeechRecognition();
          recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            onTranscript(transcript);
          };
          recognition.start();
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const playAudio = () => {
    if (audioUrl && audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
      <h3 className="font-medium text-gray-800 mb-3">Voice Journal</h3>
      
      <div className="flex items-center justify-center space-x-4">
        {!isRecording ? (
          <button
            onClick={startRecording}
            className="w-16 h-16 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <Mic className="w-8 h-8" />
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="w-16 h-16 bg-gray-500 hover:bg-gray-600 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <Square className="w-8 h-8" />
          </button>
        )}

        {audioUrl && (
          <button
            onClick={isPlaying ? pauseAudio : playAudio}
            className="w-12 h-12 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center text-white transition-colors"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </button>
        )}
      </div>

      {isRecording && (
        <div className="text-center mt-3">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">Recording...</span>
          </div>
        </div>
      )}

      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onEnded={() => setIsPlaying(false)}
          className="hidden"
        />
      )}
    </div>
  );
};

export default VoiceJournal;