<script lang="ts">
import AppInfo from "./AppInfo.svelte";
import { Font, PixelData } from "./PixelData.js";
import font3x3 from "./fonts/3x3.json";
import font3x5 from "./fonts/3x5.json";
import font5x7 from "./fonts/5x7.json";
import { onMount } from "svelte";
import Icon from "./Icon.svelte";
import closeIcon from "./icons/times.svg";
import infoIcon from "./icons/info.svg";
import backIcon from "./icons/angle-left.svg";
import saveIcon from "./icons/save.svg";
import githubIcon from "./icons/github.svg";
import { placeholderText } from "./text.js";

const fonts: Font[] = [
	font3x3,
	font3x5,
	font5x7,
];

// settings
let text = placeholderText;
let selectedFont = fonts[1]!;
let color: string;
let scale = 1;
let padding = 2;

// state
let data = new PixelData(0, 0);
let aspectRatio = 1;
let canvas: HTMLCanvasElement|undefined;
let ctx: CanvasRenderingContext2D|undefined;
onMount(()=>{
	ctx = canvas!.getContext("2d")!;
	// make canvas pixelated
	canvas!.style.imageRendering = "pixelated";
	ctx.imageSmoothingEnabled = false;
	render();
});

const render = ()=>{
	if (!ctx || !canvas) return;

	data = new PixelData(100, 100);
	data.print(text, selectedFont);

	canvas.width = (data.width + padding * 2) * scale;
	canvas.height = (data.height + padding * 2) * scale;
	aspectRatio = canvas.width / canvas.height;

	ctx.fillStyle = color;

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (let x = 0; x < data.width; x++) {
		for (let y = 0; y < data.height; y++) {
			if (data.pixels[y]![x] === " ") continue;
			ctx.fillRect(
				(x + padding) * scale,
				(y + padding) * scale,
				scale,
				scale
			);
		}
	}
}

const saveImage = ()=>{
	if (!canvas) return;
	const a = document.createElement("a");
	a.href = canvas.toDataURL("image/png", undefined);
	a.download = "pixel-text.png";
	a.click();
}


$: text, selectedFont, color, scale, padding, render();

let dialogOpen = false;
</script>
<helion-standard-view>
	<helion-app-bar slot="header" center-title="">
		<helion-app-bar-left>
			<a class="helion-app-bar-icon-button" href="/">
				<Icon url="{backIcon}" />
			</a>
		</helion-app-bar-left>
		<helion-app-bar-title>Pixel Text Generator</helion-app-bar-title>
	</helion-app-bar>


	<main slot="body">
		<helion-panel style="overflow: auto;">
			<h3>Text</h3>
			<textarea class="helion-outlined-text-field" bind:value={text} style="min-width: 100%; max-width: 100%; height: 10em;"></textarea>
			
			<h3>Font</h3>
			<select class="helion-outlined-text-field" bind:value={selectedFont}>
				{#each fonts as font}
					<option value={font}>{font.title}</option>
				{/each}
			</select>

			<small>{selectedFont.description}</small>

			<h3>Display</h3>
			<label class="icon-field-container">
				<input type="color" class="helion-color-picker-field" bind:value={color}>
				<span>Colour</span>
			</label>

			<br />
			<br />

			<div>Image Scale</div>
			<input type="number" class="helion-outlined-text-field" bind:value={scale}>
			<div><small>Resolution: {canvas?.width} x {canvas?.height}</small></div>

			<br />

			<div>Padding</div>
			<input type="number" class="helion-outlined-text-field" bind:value={padding}>

			<!--<div style="height: 300px;"></div>-->

		</helion-panel>
		<helion-stack>
			<helion-aspect-ratio style="--aspect-ratio: {aspectRatio}; padding: 1em 4em;">
				<canvas bind:this={canvas} class="helion-panel"></canvas>
			</helion-aspect-ratio>
			<helion-intangible class="actionButtons">
				<button title="Information" class="helion-circle-button" on:click={()=>dialogOpen = true}>
					<Icon url="{infoIcon}" />
				</button>
				<button title="Save Image" class="helion-circle-button" on:click={saveImage}>
					<Icon url="{saveIcon}" />
				</button>
				<div style="flex: 1;"></div>
				<a title="GitHub" class="helion-circle-button" target="_blank" href="https://github.com/TheCymaera/pixel-text-generator">
					<Icon url="{githubIcon}" />
				</a>
			</helion-intangible>
		</helion-stack>
	</main>
</helion-standard-view>

<helion-panel 
	style="
		opacity: {dialogOpen ? 1 : 0};
		pointer-events: {dialogOpen ? "all" : "none"};
		transition: opacity .1s;
	">
	<div style="height: 100%; overflow: auto;">
		<div style="
			margin: auto; 
			max-width: 800px; 
			padding: .5em 1em;
		">
			<AppInfo />
		</div>
	</div>
	<button 
		class="helion-circle-button" 
		style="position: absolute; right: 0.5em; top: 0.5em;"
		title="Close"
		on:click={()=>dialogOpen = false}
	>
		<Icon url="{closeIcon}" />
	</button>
</helion-panel>

<style>
.actionButtons {
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	justify-content: start;
	grid-gap: .5em;
	padding: .5em;
}


main {
	display: grid;
	grid-template-columns: 300px 1fr;
}

main > helion-panel {
	padding: .5em;
}

@media (max-width: 800px) {
	main {
		grid-template-columns: unset;
		grid-template-rows: 1fr 1fr;
	}

	/* the sidebar should be at the bottom */
	main > :first-child {
		order: 2;
	}
	main > :last-child {
		order: 1;
	}
}
</style>