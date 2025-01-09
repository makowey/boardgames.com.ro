<script>
	let fullscreen = false;
	function toggleFullscreen() {
		const iframe = document.getElementsByClassName('iframe')?.[0];
		if(document && document.fullscreenEnabled && iframe.requestFullscreen) {
				iframe.requestFullscreen();
		}

		console.log('Fullscreen mode: ', fullscreen);
	}
</script>

<div class="row-container">
	<iframe src="https://takeiteasy-game.vercel.app" title="Take it Easy - Boardgame" class="iframe" allowfullscreen/>
	<div class="first-row">
		<div style="float: right; margin: 10px;">Enable fullscreen mode</div>
		<img src="/assets/fullscreen.png" alt="Full Screen" class="iframe-button btn right-1" on:click={toggleFullscreen}/>
	</div>
</div>

<style>
    .row-container {display: flex; width: 100%; height: 100%; flex-direction: column; background-color: #264226; overflow: hidden;}
    .iframe { flex-grow: 1; border: none; margin: 0; padding: 0; }
		.iframe-button {
				width: 70px;
				right: 10px;
				float: right;
				cursor: pointer;
				color: #ffffff;
		}
</style>