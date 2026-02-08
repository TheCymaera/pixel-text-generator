import { buttonVariants } from "./buttonVariants.js"
import { cleanClassName } from "./utilities.js"

const plainClasses = `
helion-has-splash
w-[1em] h-[1em]
bg-transparent rounded-full

inset-outline
disabled:opacity-30

before:transition-colors before:duration-200
before:bg-transparent
disabled:before:transparent!
hover:before:bg-inkWellHover
active:before:bg-inkWellActive

cursor-pointer
`

const primaryClasses = `
${buttonVariants.primary}
shadow-md/30
text-lg
min-w-12 min-h-12
max-w-12 max-h-12
`

const filledClasses = `
${buttonVariants.filled}
shadow-md/30
text-lg
min-w-12 min-h-12
max-w-12 max-h-12
`

export const iconButtonVariants = {
	plain: cleanClassName(plainClasses),
	primary: cleanClassName(primaryClasses),
	filled: cleanClassName(filledClasses),
}