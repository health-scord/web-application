import * as React from "react";
import { storiesOf } from "@storybook/react";
import Stats from "./Stats";
import TestProvider from "../../modules/client/TestProvider";

const stories = storiesOf("UI Components", module);

stories.add("Stats", () => (
  <TestProvider>
    <Stats />
  </TestProvider>
));
