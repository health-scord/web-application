import * as React from "react";
import { render } from "enzyme";

import Offer from "./Offer";
import TestProvider from "../../modules/client/TestProvider";

describe("Offer", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <TestProvider>
        <Offer />
      </TestProvider>
    );
  });

  it("", () => {});
});
