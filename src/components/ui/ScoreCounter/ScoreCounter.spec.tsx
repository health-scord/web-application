import * as React from "react";
import { render } from "enzyme";

import ScoreCounter from "./ScoreCounter";
import TestProvider from "../../modules/client/TestProvider";

describe("ScoreCounter", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <TestProvider>
        <ScoreCounter />
      </TestProvider>
    );
  });

  it("", () => {});
});
