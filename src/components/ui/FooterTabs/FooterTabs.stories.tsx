import * as React from "react";
import { storiesOf } from "@storybook/react";
import FooterTabs from "./FooterTabs";
import TestProvider from "../../modules/client/TestProvider";

const stories = storiesOf("UI Components", module);

stories.add("FooterTabs", () => (
  <TestProvider>
    <FooterTabs />
  </TestProvider>
));
