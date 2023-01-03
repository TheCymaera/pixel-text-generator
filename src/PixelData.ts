export interface Font {
	title: string;
	description: string;
	fallback: string[];
	lineHeight: number;
	characterSpacing: number;
	
	characters: {
		[x: string]: string[];
	}
};

export class PixelData {
	pixels: string[][] = [];
	width: number;
	height: number;

	constructor(width: number, height: number) {
		this.pixels = [];
		this.setWidth(width);
		this.setHeight(height);
	}

	setWidth(width: number) {
		this.width = width;
		for (const line of this.pixels) {
			line.length = width;
			for (let i = 0; i < line.length; i++) if (line[i] === undefined) line[i] = " ";
		}
	}

	setHeight(height: number) {
		this.height = height;
		this.pixels.length = height;
		
		for (let i = 0; i < this.pixels.length; i++) {
			if (this.pixels[i] === undefined) {
				this.pixels[i] = new Array(this.width).fill(" ");
			}
		}
	}

	print(text: string, font: Font) {
		let x = 0, y = 0;

		for (const char of text) {
			if (char === "\n") {
				this.#printPixels(x, y, new Array(font.lineHeight).fill(""));
				x = 0;
				y += font.lineHeight;
			} else {
				const pixels = font.characters[char] ?? font.characters[char.toUpperCase()] ?? font.characters[char.toLowerCase()] ?? font.fallback;

				this.#printPixels(x, y, pixels);
				x += Math.max(...pixels.map(i=>i.length)) + font.characterSpacing;
			}
		}

	}

	#printPixels(startX: number, startY: number, pixels: string[]) {
		const pixelsWidth = Math.max(...pixels.map(i=>i.length));
		if (this.width <= startX + pixelsWidth) this.setWidth(startX + pixelsWidth);
		if (this.height <= startY + pixels.length) this.setHeight(startY + pixels.length);

		for (let y = 0; y < pixels.length; y++) {
			for (let x = 0; x < pixels[y]!.length; x++) {
				const ny = startY + y;
				const nx = startX + x;
				this.pixels[ny]![nx] = pixels[y]![x]!;
			}	
		}
	}
}