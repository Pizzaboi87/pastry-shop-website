import styled, { css } from "styled-components";
import { useContext } from "react";
import { UserContext } from "../context";
import { colors } from "./colors";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

const getTextColor = (props) => {
  const { userTheme } = useContext(UserContext);

  switch (userTheme) {
    case "blue":
      return colors.blue[props.$textcolor];
    case "green":
      return colors.green[props.$textcolor];
    case "brown":
      return colors.brown[props.$textcolor];
    default:
      return colors.pink[props.$textcolor];
  }
};

const getBackgroundColor = (props) => {
  const { userTheme } = useContext(UserContext);

  switch (userTheme) {
    case "blue":
      return colors.blue[props.$bgcolor];
    case "green":
      return colors.green[props.$bgcolor];
    case "brown":
      return colors.brown[props.$bgcolor];
    default:
      return colors.pink[props.$bgcolor];
  }
};

const getBorderColor = (props) => {
  const { userTheme } = useContext(UserContext);

  switch (userTheme) {
    case "blue":
      return colors.blue[props.$bordercolor];
    case "green":
      return colors.green[props.$bordercolor];
    case "brown":
      return colors.brown[props.$bordercolor];
    default:
      return colors.pink[props.$bordercolor];
  }
};

const getHoverTextColor = (props) => {
  const { userTheme } = useContext(UserContext);

  switch (userTheme) {
    case "blue":
      return colors.blue[props.$hovertextcolor];
    case "green":
      return colors.green[props.$hovertextcolor];
    case "brown":
      return colors.brown[props.$hovertextcolor];
    default:
      return colors.pink[props.$hovertextcolor];
  }
};

const getHoverBackgroundColor = (props) => {
  const { userTheme } = useContext(UserContext);

  switch (userTheme) {
    case "blue":
      return colors.blue[props.$hoverbgcolor];
    case "green":
      return colors.green[props.$hoverbgcolor];
    case "brown":
      return colors.brown[props.$hoverbgcolor];
    default:
      return colors.pink[props.$hoverbgcolor];
  }
};

const getIconColor = (props) => {
  const { userTheme } = useContext(UserContext);

  switch (userTheme) {
    case "blue":
      return colors.blue[props.$iconcolor];
    case "green":
      return colors.green[props.$iconcolor];
    case "brown":
      return colors.brown[props.$iconcolor];
    default:
      return colors.pink[props.$iconcolor];
  }
};

const getOutlineColor = (props) => {
  const { userTheme } = useContext(UserContext);

  switch (userTheme) {
    case "blue":
      return colors.blue[props.$outlinecolor];
    case "green":
      return colors.green[props.$outlinecolor];
    case "brown":
      return colors.brown[props.$outlinecolor];
    default:
      return colors.pink[props.$outlinecolor];
  }
};

export const Theme_H1 = styled.h1`
  color: ${getTextColor};
`;

export const Theme_P = styled.p`
  color: ${getTextColor};
`;

export const Theme_Li = styled.li`
  color: ${getTextColor};
  &:hover {
    color: ${getHoverTextColor};
  }
`;

export const Theme_Div = styled.div`
  background-color: ${getBackgroundColor};
  border-color: ${getBorderColor};
`;

export const Theme_Motion_Div = styled(motion.div)`
  background-color: ${getBackgroundColor};
`;

export const Theme_Motion_Span = styled(motion.span)`
  color: ${getTextColor};
`;

export const Theme_Span = styled.span`
  background-color: ${getBackgroundColor};
  &:hover {
    background-color: ${getHoverBackgroundColor};
  }
`;

export const Theme_Form = styled.form`
  background-color: ${getBackgroundColor};
`;

export const Theme_Img = styled.img`
  background-color: ${getBackgroundColor};
  border-color: ${getBorderColor};
`;

export const Theme_Button = styled.button`
  background-color: ${getBackgroundColor};
  color: ${getTextColor};
  border-color: ${getBorderColor};
  &:hover {
    background-color: ${getHoverBackgroundColor};
    color: ${getHoverTextColor};
  }
`;

export const Theme_Link = styled(Link)`
  color: ${getTextColor};
  background-color: ${getBackgroundColor};
  &:hover {
    color: ${getHoverTextColor};
  }
`;

export const Theme_Icon = styled(Icon)`
  color: ${getIconColor};
`;

export const Theme_Footer = styled.footer`
  background-color: ${getBackgroundColor};
`;

export const Theme_Nav = styled.nav`
  background-color: ${getBackgroundColor};
`;

export const Theme_Hr = styled.hr`
  border-color: ${getBorderColor};
`;

export const Theme_Input = styled.input`
  outline-color: ${getOutlineColor};
`;

export const Theme_Select = styled.select`
  outline-color: ${getOutlineColor};
`;

export const Theme_Textarea = styled.textarea`
  outline-color: ${getOutlineColor};
`;

export const Theme_Stamp = styled.div`
  ${(props) => {
    const { userTheme } = useContext(UserContext);
    let bgColor = "";
    switch (userTheme) {
      case "blue":
        bgColor = colors.blue[props.$bgcolor];
        break;
      case "green":
        bgColor = colors.green[props.$bgcolor];
        break;
      case "brown":
        bgColor = colors.brown[props.$bgcolor];
        break;
      default:
        bgColor = colors.pink[props.$bgcolor];
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
    const { userTheme } = useContext(UserContext);
    let outlineColor = "";
    switch (userTheme) {
      case "blue":
        outlineColor = colors.blue[props.$outlinecolor];
        break;
      case "green":
        outlineColor = colors.green[props.$outlinecolor];
        break;
      case "brown":
        outlineColor = colors.brown[props.$outlinecolor];
        break;
      default:
        outlineColor = colors.pink[props.$outlinecolor];
        break;
    }

    return `
      margin-top: 0.5rem; 
      width: 100%;
      height: 2.3rem;
      background-color: white;
      border-radius: 10px;
      outline-style: dotted;
      outline-offset: 2px;
      outline-width: 2px;
      outline-color: ${outlineColor};
    `;
  }};
`;
