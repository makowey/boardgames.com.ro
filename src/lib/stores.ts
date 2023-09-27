import {readable, writable} from 'svelte/store';

export const isMobile = writable(false);

export const loadingAnimations = readable(["loading", "circleLoading", "handLoading", "triangleLoading", "search"]);