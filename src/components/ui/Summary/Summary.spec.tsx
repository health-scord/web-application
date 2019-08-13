import * as React from "react";
import { render } from "enzyme";

import Summary from "./Summary";
import TestProvider from "../../modules/client/TestProvider";

describe("Summary", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <TestProvider>
        <Summary />
      </TestProvider>
    );
  });

  it("", () => {});
});
