<script lang="ts">

	import { DotLottieSvelte } from '@lottiefiles/dotlottie-svelte';

	export let path = '94729-not-found';
    export let playing = false;
    export let loop = true;
    export let replayFrameFrom = 0;
    export let replayFrameTo = 0;
    export let stopTo = 1;
    export let currentFrame =  "0";

    let animation;
    export let moreClass = '';
</script>

<DotLottieSvelte
  src={`/animations/${path}.json`}
  loop
  autoplay
/>