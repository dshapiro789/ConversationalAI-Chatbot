
import { AppSettings } from './types';

export const DEFAULT_SETTINGS: AppSettings = {
  systemPrompt: 'You are a friendly and helpful conversational AI assistant. Keep your responses concise and to the point.',
  voice: 'Zephyr',
  primaryColor: '#6366F1', // Indigo 500
  secondaryColor: '#EC4899', // Pink 500
  backgroundColor: '#111827', // Gray 900
  textColor: '#F9FAFB', // Gray 50
};

export const AVAILABLE_VOICES: AppSettings['voice'][] = ['Zephyr', 'Puck', 'Charon', 'Kore', 'Fenrir'];
