import * as React from "react";
import { render } from "enzyme";

import LoginHero from "./LoginHero";
import TestProvider from "../../modules/client/TestProvider";

describe("LoginHero", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <TestProvider>
        <LoginHero />
      </TestProvider>
    );
  });

  it("", () => {});
});
