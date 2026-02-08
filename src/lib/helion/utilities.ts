let id = 0;
export function generateId() {
	return `helion-id-${id++}`;
}

export function cleanClassName(classes: string) {
	return classes.replaceAll(/\s+/g, " ").trim();
}