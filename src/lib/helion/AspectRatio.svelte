<script lang="ts">
	interface Props {
		aspectRatio?: number;
		children?: import('svelte').Snippet;
	}

	let { aspectRatio = 1, children }: Props = $props();
</script>
<helion-aspect-ratio style="--aspect-ratio: {aspectRatio}">
	<helion-aspect-ratio-wrapper>
		{@render children?.()}
	</helion-aspect-ratio-wrapper>
</helion-aspect-ratio>
<style>
@layer base {
	helion-aspect-ratio {
		position: relative;
		display: grid;
		place-items: center;
		container: helion-aspect-ratio / size;
	}

	helion-aspect-ratio-wrapper {
		--_width: min(100%, calc(100cqh * var(--aspect-ratio)));
		--_height: min(100%, calc(100cqw / var(--aspect-ratio)));

		min-width: var(--_width);
		max-width: var(--_width);
		min-height: var(--_height);
		max-height: var(--_height);
		box-sizing: border-box;

		position: relative;
		display: grid;
	}

	helion-aspect-ratio-wrapper > :global(*) {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}
}
</style>