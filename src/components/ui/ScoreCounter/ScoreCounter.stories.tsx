import * as React from "react";
import { storiesOf } from "@storybook/react";
import ScoreCounter from "./ScoreCounter";
import TestProvider from "../../modules/client/TestProvider";

const stories = storiesOf("UI Components", module);

stories.add("ScoreCounter", () => (
  <TestProvider>
    <ScoreCounter />
  </TestProvider>
));
