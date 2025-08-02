<script>
	let fullscreen = false;
	function toggleFullscreen() {
		const iframe = document.getElementsByClassName('iframe')?.[0];
		if (document && document.fullscreenEnabled && iframe.requestFullscreen) {
			iframe.requestFullscreen();
		}

		console.log('Fullscreen mode: ', fullscreen);
	}

	let url = 'https://takeiteasy-game.vercel.app';
</script>

<div class="row-container">
	<iframe src={url} title="Take it Easy - Boardgame" class="iframe" allowfullscreen />
	<div class="first-row">
		<span class="m-5"
			>If fullscreen is not working go <a
				href={url}
				class="font-bold uppercase text-xl text-emerald-400 p-2">here</a
			></span
		>
		<div style="float: right; margin: 10px;">Enable fullscreen mode</div>
		<img
			src="/assets/fullscreen.png"
			alt="Full Screen"
			class="iframe-button btn right-1"
			on:click={toggleFullscreen}
		/>
	</div>
</div>

<style>
	.row-container {
		display: flex;
		width: 100%;
		height: 100%;
		flex-direction: column;
		background-color: #264226;
		overflow: hidden;
	}
	.iframe {
		flex-grow: 1;
		border: none;
		margin: 0;
		padding: 0;
	}
	.iframe-button {
		width: 70px;
		right: 10px;
		float: right;
		cursor: pointer;
		color: #ffffff;
	}
</style>
