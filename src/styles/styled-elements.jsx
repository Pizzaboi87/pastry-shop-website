import styled, { css } from "styled-components";
import { useContext } from "react";
import { ThemeContext } from "../context";
import { colors } from "./colors";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import PhoneInput from "react-phone-input-2";

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
  background-color: ${(props) => {
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

export const Theme_Hr = styled.hr`
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

export const Theme_Input = styled.input`
  outline-color: ${(props) => {
    const { theme } = useContext(ThemeContext);
    switch (theme) {
      case "blue":
        return colors.blue[props.$outline];
      case "green":
        return colors.green[props.$outline];
      case "brown":
        return colors.brown[props.$outline];
      default:
        return colors.pink[props.$outline];
    }
  }};
`;

export const Theme_Select = styled.select`
  outline-color: ${(props) => {
    const { theme } = useContext(ThemeContext);
    switch (theme) {
      case "blue":
        return colors.blue[props.$outline];
      case "green":
        return colors.green[props.$outline];
      case "brown":
        return colors.brown[props.$outline];
      default:
        return colors.pink[props.$outline];
    }
  }};
`;

export const Theme_Textarea = styled.textarea`
  outline-color: ${(props) => {
    const { theme } = useContext(ThemeContext);
    switch (theme) {
      case "blue":
        return colors.blue[props.$outline];
      case "green":
        return colors.green[props.$outline];
      case "brown":
        return colors.brown[props.$outline];
      default:
        return colors.pink[props.$outline];
    }
  }};
`;

export const Theme_Stamp = styled.div`
  ${(props) => {
    const { theme } = useContext(ThemeContext);
    let bgColor = "";
    switch (theme) {
      case "blue":
        bgColor = colors.blue[props.$bg];
        break;
      case "green":
        bgColor = colors.green[props.$bg];
        break;
      case "brown":
        bgColor = colors.brown[props.$bg];
        break;
      default:
        bgColor = colors.pink[props.$bg];
        break;
    }

    return css`
      background: ${bgColor} radial-gradient(#fff 0, #fff 7px, transparent 7px);
      background-size: 20px 20px;
      background-position: -10px;
    `;
  }}
`;

export const Theme_PhoneInput = styled.div`
  ${(props) => {
    const { theme } = useContext(ThemeContext);
    let outlineColor = "";
    switch (theme) {
      case "blue":
        outlineColor = colors.blue[props.$outline];
        break;
      case "green":
        outlineColor = colors.green[props.$outline];
        break;
      case "brown":
        outlineColor = colors.brown[props.$outline];
        break;
      default:
        outlineColor = colors.pink[props.$outline];
        break;
    }

    return `
      margin-top: 0.5rem; 
      width: 100%;
      height: 2.3rem;
      border-radius: 10px;
      outline-style: dotted;
      outline-offset: 2px;
      outline-width: 2px;
      outline-color: ${outlineColor};
    `;
  }};
`;
