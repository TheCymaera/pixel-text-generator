export class LocalStorageEntry<T> {
	static new<T>(key: string, defaultValue: T): LocalStorageEntry<T> {
		return new LocalStorageEntry<T>(key, defaultValue);
	}

	private constructor(
		private readonly key: string,
		private readonly defaultValue: T
	) {}

	get value(): T {
		this.#signal; // track signal for reactivity
		
		const item = localStorage.getItem(this.key);
		if (!item) return this.defaultValue;
		try {
			return JSON.parse(item) as T;
		} catch {
			return this.defaultValue;
		}
	}

	set value(value: T) {
		if (value === this.defaultValue) {
			localStorage.removeItem(this.key);
		} else {
			localStorage.setItem(this.key, JSON.stringify(value));
		}

		this.#signal++;
	}

	#signal = $state(0);
}