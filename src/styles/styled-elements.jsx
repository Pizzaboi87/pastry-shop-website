import styled from "styled-components";
import { useContext } from "react";
import { ThemeContext } from "../context";
import { colors } from "./colors";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

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
        return colors.pink.title;
    }
  }};
`;

export const Theme_Div = styled.div`
  background: ${(props) => {
    const { theme } = useContext(ThemeContext);

    switch (theme) {
      case "blue":
        return colors.blue[props.$color];
      case "green":
        return colors.green[props.$color];
      case "brown":
        return colors.brown[props.$color];
      default:
        return colors.pink[props.$color];
    }
  }};
`;

export const Theme_Motion_Div = styled(motion.div)`
  background: ${(props) => {
    const { theme } = useContext(ThemeContext);

    switch (theme) {
      case "blue":
        return colors.blue[props.$color];
      case "green":
        return colors.green[props.$color];
      case "brown":
        return colors.brown[props.$color];
      default:
        return colors.pink[props.$color];
    }
  }};
`;

export const Theme_Form = styled.form`
  background: ${(props) => {
    const { theme } = useContext(ThemeContext);

    switch (theme) {
      case "blue":
        return colors.blue[props.$color];
      case "green":
        return colors.green[props.$color];
      case "brown":
        return colors.brown[props.$color];
      default:
        return colors.pink[props.$color];
    }
  }};
`;

export const Theme_Img = styled.img`
  background: ${(props) => {
    const { theme } = useContext(ThemeContext);
    switch (theme) {
      case "blue":
        return colors.blue[props.$bg];
      case "green":
        return colors.green[props.$bg];
      case "brown":
        return colors.brown[props.$bg];
      default:
        return colors.pink[props.$bg];
    }
  }};

  border: ${(props) => {
    const { theme } = useContext(ThemeContext);
    switch (theme) {
      case "blue":
        return colors.blue[props.$border];
      case "green":
        return colors.green[props.$border];
      case "brown":
        return colors.brown[props.$border];
      default:
        return colors.pink[props.$border];
    }
  }};
`;

export const Theme_Button = styled.button`
  background: ${(props) => {
    const { theme } = useContext(ThemeContext);
    switch (theme) {
      case "blue":
        return colors.blue[props.$bg];
      case "green":
        return colors.green[props.$bg];
      case "brown":
        return colors.brown[props.$bg];
      default:
        return colors.pink[props.$bg];
    }
  }};
  color: ${(props) => {
    const { theme } = useContext(ThemeContext);
    switch (theme) {
      case "blue":
        return colors.blue[props.$text];
      case "green":
        return colors.green[props.$text];
      case "brown":
        return colors.brown[props.$text];
      default:
        return colors.pink[props.$text];
    }
  }};
  border-color: ${(props) => {
    const { theme } = useContext(ThemeContext);
    switch (theme) {
      case "blue":
        return colors.blue[props.$border];
      case "green":
        return colors.green[props.$border];
      case "brown":
        return colors.brown[props.$border];
      default:
        return colors.pink[props.$border];
    }
  }};
  &:hover {
    background: ${(props) => {
      const { theme } = useContext(ThemeContext);
      switch (theme) {
        case "blue":
          return colors.blue[props.$hover];
        case "green":
          return colors.green[props.$hover];
        case "brown":
          return colors.brown[props.$hover];
        default:
          return colors.pink[props.$hover];
      }
    }};
  }
`;

export const Theme_Link = styled(Link)`
  background: ${(props) => {
    const { theme } = useContext(ThemeContext);
    switch (theme) {
      case "blue":
        return colors.blue[props.$bg];
      case "green":
        return colors.green[props.$bg];
      case "brown":
        return colors.brown[props.$bg];
      default:
        return colors.pink[props.$bg];
    }
  }};
  color: ${(props) => {
    const { theme } = useContext(ThemeContext);
    switch (theme) {
      case "blue":
        return colors.blue[props.$text];
      case "green":
        return colors.green[props.$text];
      case "brown":
        return colors.brown[props.$text];
      default:
        return colors.pink[props.$text];
    }
  }};
  &:hover {
    background: ${(props) => {
      const { theme } = useContext(ThemeContext);
      switch (theme) {
        case "blue":
          return colors.blue[props.$hover];
        case "green":
          return colors.green[props.$hover];
        case "brown":
          return colors.brown[props.$hover];
        default:
          return colors.pink[props.$hover];
      }
    }};
  }
`;
