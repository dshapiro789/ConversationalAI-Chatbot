
import React from 'react';
import { AppSettings, ConnectionState } from '../types';
import { useGeminiLive } from '../hooks/useGeminiLive';
import { MicIcon } from './icons/MicIcon';

interface ChatWindowProps {
  settings: AppSettings;
}

const MicButton: React.FC<{ state: ConnectionState; onClick: () => void }> = ({ state, onClick }) => {
  const isConnecting = state === ConnectionState.CONNECTING;
  const isConnected = state === ConnectionState.CONNECTED;
  
  const getButtonText = () => {
    switch (state) {
      case ConnectionState.CONNECTING: return 'Connecting...';
      case ConnectionState.CONNECTED: return 'Tap to Stop';
      case ConnectionState.DISCONNECTING: return 'Stopping...';
      case ConnectionState.ERROR: return 'Retry';
      default: return 'Tap to Talk';
    }
  };

  const pulseClass = isConnected ? 'animate-pulse' : '';
  const bgColor = isConnected ? 'bg-red-600 hover:bg-red-700' : 'bg-[var(--primary-color)] hover:opacity-90';

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={onClick}
        disabled={isConnecting || state === ConnectionState.DISCONNECTING}
        className={`relative w-24 h-24 rounded-full flex items-center justify-center text-white transition-all duration-300 ease-in-out shadow-lg transform active:scale-95 ${bgColor} ${isConnecting ? 'cursor-wait' : ''}`}
        style={{
            boxShadow: isConnected ? '0 0 20px 5px var(--secondary-color)' : '0 4px 14px 0 rgba(0, 0, 0, 0.25)',
        }}
      >
        <MicIcon className={`w-12 h-12 transition-transform duration-300 ${isConnected ? "scale-110" : ""}`} />
        <span className={`absolute w-full h-full rounded-full ${pulseClass}`} style={{backgroundColor: 'var(--secondary-color)', opacity: '0.4'}}></span>
      </button>
      <p className="mt-4 text-lg font-medium tracking-wide" style={{ color: 'var(--text-color)' }}>{getButtonText()}</p>
    </div>
  );
};

const TranscriptDisplay: React.FC<{ user: string; model: string }> = ({ user, model }) => {
  return (
    <div className="w-full text-center space-y-4 min-h-[100px]">
      <div className="min-h-[50px]">
        <p className="text-xl font-light opacity-80" style={{ color: 'var(--text-color)' }}>{user || '...'}</p>
      </div>
      <div className="min-h-[50px]">
        <p className="text-2xl font-semibold" style={{ color: 'var(--primary-color)' }}>{model}</p>
      </div>
    </div>
  );
};


export const ChatWindow: React.FC<ChatWindowProps> = ({ settings }) => {
  const { connectionState, userTranscript, modelTranscript, error, connect, disconnect } = useGeminiLive(settings);

  const handleMicClick = () => {
    if (connectionState === ConnectionState.IDLE || connectionState === ConnectionState.ERROR) {
      connect();
    } else {
      disconnect();
    }
  };

  return (
    <div 
      className="w-full h-full flex flex-col justify-between items-center p-6 sm:p-8"
      style={{ backgroundColor: 'var(--background-color)', color: 'var(--text-color)' }}
    >
        <div className="w-full flex-grow flex flex-col items-center justify-center">
             <TranscriptDisplay user={userTranscript} model={modelTranscript} />
        </div>

        <div className="flex-shrink-0 my-8">
            <MicButton state={connectionState} onClick={handleMicClick} />
        </div>

        <div className="h-8 text-center">
            {error && <p className="text-red-400">{error}</p>}
        </div>
    </div>
  );
};
