import * as React from "react";
import { storiesOf } from "@storybook/react";
import LoginHero from "./LoginHero";
import TestProvider from "../../modules/client/TestProvider";

const stories = storiesOf("UI Components", module);

stories.add("LoginHero", () => (
  <TestProvider>
    <LoginHero />
  </TestProvider>
));
