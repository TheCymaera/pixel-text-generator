<script lang="ts">
	interface Props {
		centerTitle?: boolean
		left?: import('svelte').Snippet
		title?: import('svelte').Snippet
		right?: import('svelte').Snippet
		className?: string
	}
	
	let {
		centerTitle = false,
		left,
		title,
		right,
		className = ""
	}: Props = $props();
</script>
<helion-app-bar data-center-title={centerTitle} class="grid overflow-hidden select-none font-bold bg-appBar text-onAppBar {className}">
	<helion-app-bar-left class="flex items-center justify-start">
		{@render left?.()}
	</helion-app-bar-left>
	<helion-app-bar-title class="px-4 text-lg self-center">
		{@render title?.()}
	</helion-app-bar-title>
	<helion-app-bar-right class="flex items-center justify-end">
		{@render right?.()}
	</helion-app-bar-right>
</helion-app-bar>
<style>
@layer base {
	helion-app-bar {
		--helion-AppBar-width: 3.3rem;
		padding-top: env(safe-area-inset-top, 0);
		grid-template: "l t r" var(--helion-AppBar-width) / auto 1fr auto;
	}

	helion-app-bar[data-center-title] {
		grid-template: "l t r" var(--helion-AppBar-width) / 1fr auto 1fr;
	}

	helion-app-bar-title {
		grid-area: t;
	}

	helion-app-bar-left {
		grid-area: l;
	}

	helion-app-bar-right {
		grid-area: r;
	}

	helion-app-bar :global(.helion-icon-button) {
		width: var(--helion-AppBar-width) !important;
		height: var(--helion-AppBar-width) !important;
		--helion-IconButton-splashSize: 5rem;
	}
}
</style>