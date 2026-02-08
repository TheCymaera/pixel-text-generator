import { cleanClassName } from "./utilities.js"

const primaryClasses = `
rounded-full py-2 px-5

bg-primary-500 text-onPrimary 
not-disabled:hover:bg-primary-600
not-disabled:active:bg-primary-700
not-disabled:data-pressed:bg-primary-700
data-on:bg-primary-600

transition-colors

disabled:opacity-50

text-center
[text-decoration:inherit]

cursor-pointer
`

const filledClasses = `
rounded-full py-2 px-5

bg-button text-onButton
not-disabled:hover:bg-buttonHover
not-disabled:active:bg-buttonActive
not-disabled:data-pressed:bg-buttonActive

transition-colors

disabled:opacity-50

text-center
[text-decoration:inherit]

cursor-pointer
`

const outlinedClasses = `
rounded-full py-2 px-5

border-[.08rem] border-containerBorder
not-disabled:hover:bg-inkWellHover
not-disabled:active:bg-inkWellActive
[&:not(:disabled)][&[data-pressed]]:bg-inkWellActive
data-on:bg-primary-500/30!
data-on:border-transparent!

transition-colors 

inset-outline
disabled:opacity-50

text-center
[text-decoration:inherit]

cursor-pointer
`

const inkWellClasses = `
text-inherit
hover:bg-inkWellHover
active:bg-inkWellActive
data-pressed:bg-inkWellActive

transition-colors

inset-outline
disabled:opacity-70

[text-align:inherit]
[text-decoration:inherit]

cursor-pointer
`

const cardClasses = `
rounded-xl

bg-surfaceContainer text-onSurfaceContainer 

relative z-0
before:rounded-xl before:absolute before:inset-0 before:content before:bg-transparent before:z-[-1]
hover:before:bg-inkWellHover
active:before:bg-inkWellActive
data-pressed:before:bg-inkWellActive

disabled:before:bg-transparent!
data-on:before:bg-[color-mix(in_srgb,transparent,var(--color-primary-500)_30%)]!

before:transition-[opacity,background-color]
transition-colors

inset-outline
disabled:opacity-50

[text-align:inherit]
[text-decoration:inherit]

cursor-pointer
`

export const buttonVariants = {
	primary: cleanClassName(primaryClasses),
	filled: cleanClassName(filledClasses),
	inkWell: cleanClassName(inkWellClasses),
	outlined: cleanClassName(outlinedClasses),
	card: cleanClassName(cardClasses),
	unstyled: "",
}


export function buttonBehaviour(element: HTMLElement) {
	const minPressTime = 200;

	function press() {
		element.dataset.pressed = "";
		setTimeout(() => delete element.dataset.pressed, minPressTime);
	}

	element.addEventListener("pointerdown", press);

	return ()=>element.removeEventListener("pointerdown", press);
}