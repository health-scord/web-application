import * as React from "react";
import { render } from "enzyme";

import BackButton from "./BackButton";
import TestProvider from "../../modules/client/TestProvider";

describe("BackButton", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <TestProvider>
        <BackButton />
      </TestProvider>
    );
  });

  it("", () => {});
});
