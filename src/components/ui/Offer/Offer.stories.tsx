import * as React from "react";
import { storiesOf } from "@storybook/react";
import Offer from "./Offer";
import TestProvider from "../../modules/client/TestProvider";

const stories = storiesOf("UI Components", module);

stories.add("Offer", () => (
  <TestProvider>
    <Offer />
  </TestProvider>
));
