type Callback = () => Promise<void>;

class Typewriter {
	private callbackQueue: Callback[] = [];
	private loop: boolean;
	private writeSpeed: number;
	private deleteSpeed: number;
	private element: HTMLElement;
	private parent: HTMLElement;
	constructor(
		parent: HTMLElement,
		{ loop = false, writeSpeed = 50, deleteSpeed = 50 }
	) {
		this.parent = parent;
		this.element = document.createElement("div") as HTMLDivElement;
		this.element.style.whiteSpace = "pre-wrap";
		this.parent.append(this.element);
		this.loop = loop;
		this.writeSpeed = writeSpeed;
		this.deleteSpeed = deleteSpeed;
	}

	writeText(string: string) {
		this.registerCallback((resolve) => {
			let i = 0;
			let interval = setInterval(() => {
				this.element.append(string[i]);
				i++;
				if (i == string.length) {
					clearInterval(interval);
					resolve();
				}
			}, this.writeSpeed);
		});
		return this;
	}

	deleteChars(number: number) {
		this.registerCallback((resolve) => {
			let text = this.element.innerText;
			const initialLength = text.length;
			let currentlength = initialLength;
			let interval = setInterval(() => {
				if (initialLength - currentlength >= number) {
					clearInterval(interval);
					resolve();
					return;
				}
				text = text.slice(0, -1);
				this.element.innerText = text;
				currentlength -= 1;
			}, this.deleteSpeed);
		});

		return this;
	}

	deleteAll(speed = this.deleteSpeed) {
		this.registerCallback((resolve) => {
			let text = this.element.innerText;
			const initialLength = text.length;
			let currentlength = initialLength;
			let interval = setInterval(() => {
				if (initialLength - currentlength == initialLength) {
					clearInterval(interval);
					resolve();
					return;
				}
				text = text.slice(0, -1);
				this.element.innerText = text;
				currentlength -= 1;
			}, speed || this.deleteSpeed);
		});
		return this;
	}
	pauseFor(duration: number) {
		this.registerCallback((resolve) => {
			setTimeout(() => resolve(), duration);
		});
		return this;
	}
	async start() {
		while (this.callbackQueue.length > 0) {
			let cb = this.callbackQueue.shift();
			if (cb) {
				await cb();
				if (this.loop) this.callbackQueue.push(cb);
			}
		}
	}
	private registerCallback(cb: (resolve: () => void) => void) {
		this.callbackQueue.push(() => new Promise(cb));
	}
}

export default Typewriter;
