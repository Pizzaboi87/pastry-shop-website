import styled from "styled-components";
import { useContext } from "react";
import { ThemeContext } from "../context";
import { colors } from "./colors";

export const Theme_H1 = styled.h1`
  color: ${(props) => {
    const { theme } = useContext(ThemeContext);

    switch (theme) {
      case "blue":
        return "blue";
      case "green":
        return "green";
      case "brown":
        return "brown";
      default:
        return colors.brown;
    }
  }};
`;

export const Theme_Div = styled.div`
  background: ${(props) => {
    const { theme } = useContext(ThemeContext);

    switch (theme) {
      case "blue":
        return "blue";
      case "green":
        return "green";
      case "brown":
        return "brown";
      default:
        return "#e45a84";
    }
  }};
`;
