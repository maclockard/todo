import { render } from "react-dom";
import { FocusStyleManager } from "@blueprintjs/core";
import * as React from "react";

import { App } from "./components";

export function run() {
    FocusStyleManager.onlyShowFocusOnTabs();

    render(<App />, document.getElementById("root"));
}
