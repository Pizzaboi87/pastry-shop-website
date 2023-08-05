import styled from "styled-components";
import { useContext } from "react";
import { ThemeContext } from "../context";
import { colors } from "./colors";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

export const Theme_H1 = styled.h1`
  color: ${(props) => {
    const { theme } = useContext(ThemeContext);

    switch (theme) {
      case "blue":
        return colors.blue[props.$textcolor];
      case "green":
        return colors.green[props.$textcolor];
      case "brown":
        return colors.brown[props.$textcolor];
      default:
        return colors.pink[props.$textcolor];
    }
  }};
`;

export const Theme_P = styled.p`
  color: ${(props) => {
    const { theme } = useContext(ThemeContext);

    switch (theme) {
      case "blue":
        return colors.blue[props.$textcolor];
      case "green":
        return colors.green[props.$textcolor];
      case "brown":
        return colors.brown[props.$textcolor];
      default:
        return colors.pink[props.$textcolor];
    }
  }};
`;

export const Theme_Li = styled.li`
  color: ${(props) => {
    const { theme } = useContext(ThemeContext);

    switch (theme) {
      case "blue":
        return colors.blue[props.$textcolor];
      case "green":
        return colors.green[props.$textcolor];
      case "brown":
        return colors.brown[props.$textcolor];
      default:
        return colors.pink[props.$textcolor];
    }
  }};
  &:hover {
    color: ${(props) => {
      const { theme } = useContext(ThemeContext);

      switch (theme) {
        case "blue":
          return colors.blue[props.$hovertext];
        case "green":
          return colors.green[props.$hovertext];
        case "brown":
          return colors.brown[props.$hovertext];
        default:
          return colors.pink[props.$hovertext];
      }
    }};
  }
`;

export const Theme_Div = styled.div`
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
`;

export const Theme_Motion_Div = styled(motion.div)`
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
`;

export const Theme_Motion_Span = styled(motion.span)`
  color: ${(props) => {
    const { theme } = useContext(ThemeContext);

    switch (theme) {
      case "blue":
        return colors.blue[props.$textcolor];
      case "green":
        return colors.green[props.$textcolor];
      case "brown":
        return colors.brown[props.$textcolor];
      default:
        return colors.pink[props.$textcolor];
    }
  }};
`;

export const Theme_Form = styled.form`
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
        return colors.blue[props.$textcolor];
      case "green":
        return colors.green[props.$textcolor];
      case "brown":
        return colors.brown[props.$textcolor];
      default:
        return colors.pink[props.$textcolor];
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
    color: ${(props) => {
      const { theme } = useContext(ThemeContext);
      switch (theme) {
        case "blue":
          return colors.blue[props.$hovertext];
        case "green":
          return colors.green[props.$hovertext];
        case "brown":
          return colors.brown[props.$hovertext];
        default:
          return colors.pink[props.$hovertext];
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
        return colors.blue[props.$textcolor];
      case "green":
        return colors.green[props.$textcolor];
      case "brown":
        return colors.brown[props.$textcolor];
      default:
        return colors.pink[props.$textcolor];
    }
  }};
  &:hover {
    color: ${(props) => {
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
`;

export const Theme_Icon = styled(Icon)`
  color: ${(props) => {
    const { theme } = useContext(ThemeContext);
    switch (theme) {
      case "blue":
        return colors.blue[props.$iconcolor];
      case "green":
        return colors.green[props.$iconcolor];
      case "brown":
        return colors.brown[props.$iconcolor];
      default:
        return colors.pink[props.$iconcolor];
    }
  }};
`;

export const Theme_Footer = styled.footer`
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
`;

export const Theme_Nav = styled.nav`
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
`;
