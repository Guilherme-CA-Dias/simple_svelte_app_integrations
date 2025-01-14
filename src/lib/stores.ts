import { writable } from 'svelte/store';

export const connectionStatus = writable<string>('Disconnected');
export const integrationStatuses = writable<Record<string, string>>({});
export const integrations = writable<{ items: any[] }>({ items: [] }); 