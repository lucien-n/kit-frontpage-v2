import type { Session } from '@supabase/supabase-js';
import { writable } from 'svelte/store';

export const titleStore = writable<string>('Lucien Neuhoff');

export const sessionStore = writable<Session | null>(null);
