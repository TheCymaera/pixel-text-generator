<script lang="ts">
import AppInfo from "./AppInfo.svelte";
import { type Font, PixelData } from "./PixelData.js";
import font3x3 from "./fonts/3x3.json" with { type: "json" };
import font3x5 from "./fonts/3x5.json" with { type: "json" };
import font5x7 from "./fonts/5x7.json" with { type: "json" };
import { onMount } from "svelte";
import { placeholderText } from "./placeholderText.js";
import { fa5_solid_angleLeft, fa5_solid_info, fa5_solid_save, fa5_brands_github, fa5_solid_times } from "fontawesome-svgs";
import AppBar from "./lib/helion/AppBar.svelte";
import IconButton from "./lib/helion/IconButton.svelte";
import AspectRatio from "./lib/helion/AspectRatio.svelte";
import Stack from "./lib/helion/Stack.svelte";
import Intangible from "./lib/helion/Intangible.svelte";
import MultilineTextField from "./lib/helion/MultilineTextField.svelte";
import SelectField from "./lib/helion/SelectField.svelte";
import NumberField from "./lib/helion/NumberField.svelte";
import ColorField from "./lib/helion/ColorField.svelte";

const fonts: Font[] = [
	font3x3,
	font3x5,
	font5x7,
];

// settings
let text = $state(placeholderText);
let selectedFont = $state(fonts[1]!);
let color = $state("#000000");
let scale = $state(1);
let padding = $state(2);

// state
let canvas = $state.raw() as HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
let resolution = $state.raw({ width: 0, height: 0 });

onMount(()=>{
	ctx = canvas.getContext("2d")!;

	// make canvas pixelated
	canvas.style.imageRendering = "pixelated";
	ctx.imageSmoothingEnabled = false;
	
	render();
});

function render() {
	const data = new PixelData(100, 100);
	data.print(text, selectedFont);

	canvas.width = (data.width + padding * 2) * scale;
	canvas.height = (data.height + padding * 2) * scale;
	resolution = { width: canvas.width, height: canvas.height };

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

function saveImage() {
	const a = document.createElement("a");
	a.href = canvas.toDataURL("image/png", undefined);
	a.download = "pixel-text.png";
	a.click();
}


$effect(() => {
	render();
});

let hash = $state(location.hash);
const dialogOpen = $derived(hash === "#info");
</script>
<svelte:window on:hashchange={() => hash = location.hash} />


<style>
main {
	display: grid;
	grid-template-columns: 300px 1fr;
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

<div class="absolute inset-0 grid grid-rows-[auto_1fr] z-0">
	<AppBar centerTitle className="shadow-md z-1">
		{#snippet left()}
			<a href="/" class="contents">
				<IconButton label="Back" onPress={()=>{}}>
					{@html fa5_solid_angleLeft}
				</IconButton>
			</a>
		{/snippet}
		{#snippet title()}
			Pixel Text Generator
		{/snippet}
	</AppBar>

	<main>
		<aside class="overflow-auto block p-4 bg-surfaceContainer text-onSurfaceContainer shadow-md">
			<MultilineTextField
				label="Text"
				bind:value={text}
				rows={6}
				className="mb-4 [&_label]:font-bold"
			/>

			<SelectField
				label="Font"
				bind:value={selectedFont}
				options={fonts.map(font => ({ value: font, label: font.title }))}
				hint={selectedFont.description}
				className="mb-4 [&_label]:font-bold"
			/>

			<ColorField
				label="Colour"
				bind:value={color}
				className="mb-4"
			/>

			<NumberField
				label="Image Scale"
				bind:value={scale}
				hint={`Resolution: ${resolution.width} x ${resolution.height}`}
				className="mb-4 [&_label]:font-bold"
			/>

			<NumberField
				label="Padding"
				bind:value={padding}
				className="mb-4 [&_label]:font-bold"
			/>
		</aside>

		<Stack>
			<div class="absolute py-4 px-16 grid">
				<AspectRatio aspectRatio={resolution.width / resolution.height}>
					<canvas
						bind:this={canvas}
						class="bg-surfaceContainer text-onSurfaceContainer"
					></canvas>
				</AspectRatio>
			</div>

			<Intangible className="flex flex-col items-end justify-start gap-2 p-2">
				<IconButton variant="filled" label="Information" onPress={()=>location.hash = "#info"}>
					{@html fa5_solid_info}
				</IconButton>
				<IconButton variant="filled" label="Save Image" onPress={saveImage}>
					{@html fa5_solid_save}
				</IconButton>
				
				<div class="flex-1"></div>

				<a class="contents" title="GitHub" target="_blank" href="https://github.com/TheCymaera/pixel-text-generator">
					<IconButton variant="filled" label="GitHub" onPress={()=>{}}>
						{@html fa5_brands_github}
					</IconButton>
				</a>
			</Intangible>
		</Stack>
	</main>
</div>

<div
	class="absolute inset-0 bg-surface text-onSurface p-4"
	style="
		opacity: {dialogOpen ? 1 : 0};
		pointer-events: {dialogOpen ? "all" : "none"};
		transition: opacity .1s;
	">
	<div class="h-full overflow-auto">
		<div class="m-auto max-w-200 px-4 py-2">
			<AppInfo />
		</div>
	</div>
	<IconButton 
		variant="filled"
		className="absolute right-2 top-2" 
		label="Close"
		onPress={()=>location.hash = ""}
	>
		{@html fa5_solid_times}
	</IconButton>
</div>