<script lang="ts">
	import { iconButtonVariants } from "./iconButtonVariants.js";

	interface Props {
		disabled?: boolean
		onPress: () => void
		label: string
		children?: import('svelte').Snippet
		variant?: keyof typeof iconButtonVariants
		className?: string
	}

	let {
		disabled = false,
		onPress,
		label,
		children,
		variant = "plain",
		className = ""
	}: Props = $props();
</script>
<button 
	onclick={onPress} 
	disabled={disabled}
	title={label}
	class="helion-icon-button {iconButtonVariants[variant]} {className}"
>
	{@render children?.()}
</button>
<style>
@layer base {
	:root {
		--helion-IconButton-splashSize: 2.5em;
	}

	button {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	button.helion-has-splash::before {
		content: "";

		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		width: var(--helion-IconButton-splashSize);
		height: var(--helion-IconButton-splashSize);
		border-radius: 50%;
	}
}
</style>