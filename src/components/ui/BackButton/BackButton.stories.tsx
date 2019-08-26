import * as React from "react";
import { storiesOf } from "@storybook/react";
import BackButton from "./BackButton";
import TestProvider from "../../modules/client/TestProvider";

const stories = storiesOf("UI Components", module);

stories.add("BackButton", () => (
  <TestProvider>
    <BackButton />
  </TestProvider>
));
