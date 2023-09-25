<script>
    import lottie from 'lottie-web';
    import {onMount} from "svelte";

    export let path = '94729-not-found';
    export let playing = false;
    export let loop = true;
    export let replayFrameFrom = 0;
    export let replayFrameTo = 0;
    export let stopTo = 1;
    export let currentFrame =  "0";

    let animation;
    onMount(() => {
        animation = lottie.loadAnimation({
            container: document.getElementById("lottie-animation"), // the dom element that will contain the animation
            renderer: 'svg',
            loop: loop,
            autoplay: playing,
            path: "/animations/" + path + ".json"
        });

        playAnimation();
        animation.onLoopComplete = function () {
            // do nothing...
        }
    });

    function playAnimation() {
        animation.play();

        animation.onComplete = function () {
            replayAnimation();
        }

        animation.onEnterFrame = function() {
            currentFrame = animation.currentFrame;
            if(stopTo > 1 && animation.currentFrame > stopTo) {
                animation.goToAndStop(stopTo, true);
            }
        }
    }

    function replayAnimation() {
        if (replayFrameFrom > 0) {
            animation.setSegment(replayFrameFrom, replayFrameTo);
            animation.play();
        }
    }

    export let moreClass = '';
</script>

<div id="lottie-animation"
     class="lottie {moreClass}"
     style="max-width: 600px; max-height: 600px; margin: 0 auto"
     data-anim-loop="true"
     data-name="ninja">
    <slot/>
</div>