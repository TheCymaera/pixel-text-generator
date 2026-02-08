<script lang="ts">
  import { generateId } from "./utilities.js";

	interface Props {
		value: string
		label?: string
		placeholder?: string
		readonly?: boolean
		hint?: string
		error?: string
		rows?: number
		boxClassName?: string
		className?: string
		onInput?: (this: HTMLTextAreaElement, event: Event) => void
	}

	let {
		value = $bindable(),
		label = "",
		placeholder = "",
		readonly = false,
		hint = "",
		error = "",
		rows = 3,
		boxClassName = "",
		className = "",
		onInput
	}: Props = $props();

	const id = generateId();
</script>

<helion-multiline-text-field class={className}>
	<label for={id} class="block pl-1">{label}</label>
	<textarea id={id} bind:value={value} {placeholder} disabled={readonly} rows={rows} oninput={onInput} class="
		w-full p-3 border-[.08rem] border-containerBorder rounded-md bg-transparent
		inset-outline
		focus-visible:outline-primary-500 disabled:opacity-50
		{boxClassName}
	"></textarea>
	<output class="pl-1" style:display={(error || hint) ? "" : "none"}>
		<small class="whitespace-pre {error ? "text-red-500" : ""}">{error || hint}</small>
	</output>
</helion-multiline-text-field>

<style>
@layer base {
	helion-multiline-text-field {
		display: block;
	}
}
</style>