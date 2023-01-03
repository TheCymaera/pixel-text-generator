// core
import {} from "helion/core/core.js";
import {} from "helion/themes/LightTheme.js";

// layout
import {} from "helion/layout/AspectRatio.js";
import {} from "helion/layout/Stack.js";

// navigation
import {} from "helion/navigation/AppBar.js";

// containers
import {} from "helion/containers/Panel.js";

// inputs
import {} from "helion/inputs/CircleButton.js";
import {} from "helion/inputs/OutlinedTextField.js";
import {} from "helion/inputs/ColorPickerField.js";

// views
import {} from "helion/views/StandardView.js";

import App from "./App.svelte";

new App({
	target: document.body,
});