import { writable, type Writable } from 'svelte/store';

type Theme = 'dark' | 'light';

export const theme: Writable<Theme> = writable('dark');
