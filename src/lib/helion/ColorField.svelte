<script lang="ts">
  import { generateId } from "./utilities.js";

	interface Props {
		value: string,
		label?: string,
		readonly?: boolean,
		className?: string,
		onInput?: (event: { value: string}) => void,
	}

	let {
		value = $bindable(),
		label = "",
		readonly = false,
		onInput = () => {},
		className = "",
	}: Props = $props();

	const id = generateId();
</script>

<helion-color-field class={className}>
	<input 
		id={id}
		type="color"
		bind:value={value}
		readonly={readonly}
		oninput={(e) => onInput({ value: (e.target as HTMLInputElement).value })}
		class="
			block rounded
			py-[.2rem] px-[.2rem] h-7
			border border-containerBorder
			bg-surfaceContainer text-onSurfaceContainer
			disabled:opacity-50
		"
	/>

	<label for={id} class="block">
		{label}
	</label>
</helion-color-field>
<style>
@layer base {
	helion-color-field {
		display: flex;
		align-items: center;
		gap: 0.5em;

		> * {
			cursor: pointer;
		}
	}
}
</style>