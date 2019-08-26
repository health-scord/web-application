import * as React from "react";

import { BackButtonProps } from "./BackButton.d";
import { Button } from "@blueprintjs/core";
import { useCurrentRoute, useNavigation } from "react-navi";

const BackButton: React.FC<BackButtonProps> = ({
  ref = null,
  className = "",
  onClick = e => console.info("Click"),
}) => {
  const clickHandler = e => onClick(e);

  const route = useCurrentRoute();
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  return <Button className="textButton" icon="chevron-left" rightIcon={false} onClick={goBack}>Back</Button>;
};

export default BackButton;
