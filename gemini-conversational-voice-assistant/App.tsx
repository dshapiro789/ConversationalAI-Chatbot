
import React, { useState } from 'react';
import { ChatWindow } from './components/ChatWindow';
import { SettingsPanel } from './components/SettingsPanel';
import { AppSettings } from './types';
import { DEFAULT_SETTINGS } from './constants';
import { SettingsIcon } from './components/icons/SettingsIcon';

function App() {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <main className="relative w-screen h-screen overflow-hidden font-sans">
      <style>{`
        :root {
          --primary-color: ${settings.primaryColor};
          --secondary-color: ${settings.secondaryColor};
          --background-color: ${settings.backgroundColor};
          --text-color: ${settings.textColor};
        }
      `}</style>
      
      <div className="w-full h-full" style={{ backgroundColor: 'var(--background-color)'}}>
        <ChatWindow settings={settings} />
      </div>

      <button
        onClick={() => setIsSettingsOpen(true)}
        className="absolute top-4 right-4 p-3 rounded-full transition-colors z-20"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'var(--text-color)'}}
        aria-label="Open settings"
      >
        <SettingsIcon className="w-6 h-6" />
      </button>

      <SettingsPanel
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSettingsChange={setSettings}
      />
      {isSettingsOpen && (
        <div
          onClick={() => setIsSettingsOpen(false)}
          className="fixed inset-0 bg-black/50 z-40"
        />
      )}
    </main>
  );
}

export default App;
