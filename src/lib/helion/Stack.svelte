<script lang="ts">
	interface Props { className?: string, children?: import('svelte').Snippet }

	let { className = "", children }: Props = $props();
</script>

<helion-stack class={className}>
	{@render children?.()}
</helion-stack>

<style>
@layer base {
	helion-stack {
		position: relative;

		> :global(*) {
			position: absolute;
			inset: 0 !important;
			width: 100% !important;
			height: 100% !important;
		}
	}
}
</style>