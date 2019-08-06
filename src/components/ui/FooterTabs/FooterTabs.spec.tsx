import * as React from "react";
import { render } from "enzyme";

import FooterTabs from "./FooterTabs";
import TestProvider from "../../modules/client/TestProvider";

describe("FooterTabs", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <TestProvider>
        <FooterTabs />
      </TestProvider>
    );
  });

  it("", () => {});
});
