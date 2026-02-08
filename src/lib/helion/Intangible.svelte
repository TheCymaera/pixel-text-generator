<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props {
		children: Snippet,
		className?: string
	}

	let { children, className }: Props = $props();
</script>

<helion-intangible class={className}>
	{@render children()}
</helion-intangible>

<style>
@layer base {
	helion-intangible {
		pointer-events: none;

		> :global(*) {
			pointer-events: auto;
		}
	}
}
</style>