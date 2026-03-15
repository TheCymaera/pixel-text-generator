import App from "./App.svelte";
import { mount } from "svelte";
import "./main.css";
import "./typography.css";

// Fix iOS Safari :active styles.
document.documentElement.addEventListener("touchstart",()=>undefined);

mount(App, { target: document.body });