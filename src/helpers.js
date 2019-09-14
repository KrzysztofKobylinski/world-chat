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
    return "NIE JESTEŚ WŁAŚCICLELEM TEGO POSTA!";
  }
};

//no Avatar placeholder
export const noAvatar =
  "https://m.media-amazon.com/images/M/MV5BMjA1MjE2MTQ2MV5BMl5BanBnXkFtZTcwMjE5MDY0Nw@@._V1_.jpg";
