import { Button } from "react-bootstrap";
import React from "react";

//if there is no A, returns B
export const chooseWhatToShow = (a, b) => {
  if (a !== null) {
    return a;
  } else {
    return b;
  }
};

export const isPoster = (a, b) => {
  if (a === b) {
    return <Button bsStyle="danger">Usuń</Button>
  } else {
    return null;
  }
};

//no Avatar placeholder
export const noAvatar = (author) =>
  'https://api.adorable.io/avatars/60/' + encodeURI(author)

