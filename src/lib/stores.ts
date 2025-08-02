import { readable, writable } from 'svelte/store';

export const isMobile = writable(false);

export const loadingAnimations = readable(['handLoading', 'triangleLoading', 'search']); //"loading", "circleLoading"
