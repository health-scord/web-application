import * as React from "react";

import { ConfirmEmailProps } from "./ConfirmEmail.d";
import { Card, Text, Callout } from "@blueprintjs/core";
import { useCurrentRoute, useLoadingRoute, useNavigation } from "react-navi";
import AuthClient from "../../../services/AuthClient";

const ConfirmEmail: React.FC<ConfirmEmailProps> = () => {
  const authClient = new AuthClient();

  let route = useCurrentRoute();
  let loadingRoute = useLoadingRoute();
  let navigation = useNavigation();

  let [calledApi, setCalledApi] = React.useState(false);
  let [error, setError] = React.useState(null);

  const { confirmHash } = route.lastChunk.request.params;

  if (true) {
    return (
      <Card className="floatingForm">
        {error ? (
          <Callout title="Attention" intent="danger">
            There was an error confirming your email.
          </Callout>
        ) : (
          <></>
        )}
        <Text tagName="h1" className="headline">
          Confirming Email...
        </Text>
      </Card>
    );
  } else {
    return (
      <Card className="floatingForm">
        <Text tagName="h1" className="headline">
          Waiting...
        </Text>
      </Card>
    );
  }
};

export default ConfirmEmail;
