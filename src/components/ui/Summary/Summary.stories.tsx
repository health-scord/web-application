import * as React from "react";
import { storiesOf } from "@storybook/react";
import Summary from "./Summary";
import TestProvider from "../../modules/client/TestProvider";

const stories = storiesOf("UI Components", module);

stories.add("Summary", () => (
  <TestProvider>
    <Summary />
  </TestProvider>
));
