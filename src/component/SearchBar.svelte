<script>
    import debounce from 'lodash.debounce'
    import {fly} from "svelte/transition";

    export let value = '';

    const handleInput = debounce(e => {
        value = e.target.value;
    }, 500)

    export let placeholder = 'enter your search here';
</script>

<div class="box" in:fly={{ y: -100, duration: 500, delay: 1000 }}>
    <form name="search">
        <input type="text" class="input" name="txt" onmouseout="this.value = ''; this.blur();" {placeholder}
               on:input={handleInput} autocomplete="off">
    </form>
</div>

<style>
    .box {
        position: relative;
    }

    .input {
        padding: 10px;
        width: 180px;
        height: 80px;
        background: none;
        border: 4px solid #ffd52d;
        border-radius: 50px;
        box-sizing: border-box;
        font-size: 26px;
        color: #ffd52d;
        outline: none;
        transition: .5s;
    }

    .box:hover input {
        width: 375px;
        background: #3b3640;
        border-radius: 10px;
    }

    .box i {
        position: absolute;
        top: 50%;
        right: 15px;
        transform: translate(-50%, -50%);
        font-size: 26px;
        color: #ffd52d;
        transition: .2s;
    }

    .box:hover i {
        opacity: 0;
        z-index: -1;
    }
</style>