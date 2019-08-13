import * as React from "react";
import { render } from "enzyme";

import Stats from "./Stats";
import TestProvider from "../../modules/client/TestProvider";

describe("Stats", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <TestProvider>
        <Stats />
      </TestProvider>
    );
  });

  it("", () => {});
});
