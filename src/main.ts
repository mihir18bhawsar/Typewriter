import "./style.css";
import Typewriter from "./Typewriter";

let app = document.querySelector<HTMLDivElement>("#app")!;
let typewriter = new Typewriter(app, {
	loop: true,
	writeSpeed: 10,
	deleteSpeed: 10,
});

typewriter
	.writeText("Welcome to the Fight Club.")
	.pauseFor(1000)
	.writeText("\n\nRule number 1...")
	.pauseFor(600)
	.writeText("\nYou do not talk about the Fight Club!")
	.pauseFor(500)
	.deleteChars(42)
	.writeText("2... ")
	.pauseFor(600)
	.writeText("\nYou do not talk about the Fight Club!!!")
	.pauseFor(500)
	.deleteAll(10)
	.pauseFor(400)
	.start();
