import {
  Theme_Div,
  Theme_Motion_Div,
  Theme_Motion_Span,
  Theme_H1,
  Theme_P,
  Theme_Form,
  Theme_Img,
  Theme_Button,
  Theme_Link,
  Theme_Icon,
  Theme_Footer,
  Theme_Nav,
  Theme_Li,
  Theme_Hr,
  Theme_Input,
  Theme_Textarea,
  Theme_Stamp,
  Theme_Span,
  Theme_Select,
  Theme_PhoneInput,
} from "./styled-elements";

const adminLoginStyle = {
  form: "grid grid-cols-5 md:w-[40rem] w-full rounded-xl shadow-xl items-center p-4 gap-8",
  title:
    "md:col-span-3 col-span-5 md:col-start-2 text-center text-text text-[2rem] font-[600]",
  span: "md:col-span-3 col-span-5 md:col-start-2 flex flex-col gap-y-4",
  label:
    "flex flex-col text-text xl:text-[1.2rem] lg:text-[1rem] md:text-[1.4rem] text-[1rem] font-[500] gap-y-2",
  input:
    "text-text xl:text-[1.2rem] lg:text-[1rem] md:text-[1.4rem] text-[1rem] font-[400] py-1 px-4 rounded-xl outline-none outline-dotted",
  button:
    "col-start-4 py-2 rounded-xl shadow-xl border-none font-[500] xl:text-[1.2rem] lg:text-[1rem] md:text-[1.4rem] text-[1rem] md:col-span-1 col-span-2 col-start-2 md:col-start-3",
};

const adminMenuStyle = {
  wrapper:
    "pt-4 px-2 md:col-span-1 col-span-6 md:mb-0 mb-4 flex flex-col bg-white rounded-xl items-center md:sticky top-[10rem] shadow-inner shadow-black",
  mainList: "md:pt-0 pt-4",
  mainListItem: "text-text text-[1.2rem] font-[600]",
  subList: "pl-2 pb-4",
  subListItem: "text-text text-[1.4rem] font-[700] mb-4",
  title: "text-text text-[1rem] font-[500] hover:text-logopink",
  icon: "md:hidden block text-[3rem] mx-auto cursor-pointer hover:text-logopink",
};

const adminPanelStyle = {
  wrapper:
    "glass grid grid-cols-6 xl:w-[90%] w-full bg-purpleglass rounded-xl md:p-12 p-4 gap-x-8 shadow-2xl",
  container:
    "md:col-span-5 col-span-6 bg-white rounded-xl shadow-inner shadow-black p-4",
  button:
    "md:col-start-6 md:col-auto col-span-6 bg-purple text-white text-[1.2rem] hover:bg-yellowdark hover:text-text font-[500] rounded-xl mt-4 py-2",
};

const authButtonStyle = {
  wrapper:
    "relative lg:w-[50%] w-full lg:h-full h-[14vh] flex flex-col items-center justify-center",
  title: "text-text font-[500] xs:text-[1.2rem] text-[0.9rem] mb-2",
  button:
    "rounded-xl shadow-sm border-none font-[400] text-center px-3 xs:py-2 py-1",
};

const awningStyle = {
  wrapper: "w-full h-[3.5rem] fixed top-0 left-0 z-[11] flex",
  awning: "piece w-[80px] h-full rounded-b-full shadow-xl",
  shadow: "w-full h-full rounded-b-full",
};

const blogCarouselStyle = {
  image:
    "w-[20rem] h-[12rem] object-cover border-2 border-white rounded-xl shadow-xl mb-4",
  title: "text-text text-center text-[1.2rem] font-[600]",
};

const blogCategoryCardStyle = {
  wrapper:
    "rounded-xl xl:mb-0 mb-6 flex flex-col h-fit items-center justify-center shadow-xl px-3 py-3",
  list: "flex flex-wrap justify-center gap-x-6 gap-y-2",
  title: "mb-3 text-text text-[1.5rem] font-[600]",
  button:
    "rounded-xl py-1 px-2 shadow-sm font-[700] text-[1rem] cursor-pointer",
};

const blogCommentStyle = {
  wrapper: "col-span-4 mb-16",
  container: "w-full rounded-2xl shadow-xl p-6 mb-16",
  title: "text-text text-[1.3rem] font-[600] mb-16",
  commentWrapper: "flex flex-col my-8",
  span: "w-full flex justify-between",
  author: "tex-text font-[600]",
  commentTitle: "text-text text-[1.2rem] decoration-double underline",
  loginWrapper: "w-full text-center",
  loginTitle: "text-text text-[1.2rem] font-[600]",
};

const blogCommentFormStyle = {
  form: "flex flex-col mt-4",
  span: "flex w-full justify-evenly items-end",
  input:
    "w-full text-text xl:text-[1.2rem] lg:text-[1rem] md:text-[1.4rem] text-[1rem] font-[400] py-1 px-3 rounded-xl outline-none outline-dotted",
  textarea:
    "bg-white rounded-2xl shadow-xl p-6 w-full text-text xl:text-[1.2rem] lg:text-[1rem] md:text-[1.4rem] text-[1rem] font-[400] outline-none outline-dotted mb-4",
  label:
    "w-[30%] flex flex-col text-text xl:text-[1.2rem] lg:text-[1rem] md:text-[1.4rem] text-[1rem] font-[500] pb-1",
  button:
    "px-16 py-2 rounded-xl shadow-xl border-none font-[500] block xl:text-[1.2rem] lg:text-[1rem] md:text-[1.4rem] text-[1rem]",
};

const blogFormStyle = {
  form: "w-full grid grid-cols-4 md:gap-x-16 gap-y-8",
  container: "md:col-span-2 col-span-4 flex flex-col gap-y-4 justify-between",
  label:
    "flex flex-col text-text xl:text-[1.2rem] lg:text-[1rem] md:text-[1.4rem] text-[1rem] font-[500] gap-y-2",
  input:
    "text-text xl:text-[1.2rem] lg:text-[1rem] md:text-[1.4rem] text-[1rem] font-[400] py-1 px-4 rounded-xl outline-none outline-dotted outline-purple",
  button:
    "md:col-start-4 md:col-auto col-span-4 py-2 bg-purple hover:bg-yellowdark hover:text-text rounded-xl shadow-xl border-none text-white font-[500] xl:text-[1.2rem] lg:text-[1rem] md:text-[1.4rem] text-[1rem]",
};

const blogPostCardStyle = {
  wrapper: "w-full rounded-2xl mb-16 shadow-xl",
  image: "w-full h-[25rem] object-cover rounded-t-2xl",
  container: "p-8 flex flex-col items-center justify-center",
  title: "self-center mb-4 text-text text-[1.3rem] font-[600]",
  dateAuthor: "flex w-full justify-between mb-4",
  text: "text-text text-justify text-[1rem] mb-4",
  list: "flex gap-4 self-start mt-4",
  listItem: "text-[1.2rem]",
  button: "rounded-xl px-4 py-2 font-[600] shadow-xl self-center",
};

const blogProposalStyle = {
  wrapper: "h-fit rounded-xl p-3 grid grid-cols-6 shadow-xl cursor-pointer",
  image: "col-span-2 rounded-full w-[5rem] h-[5rem] object-cover border-2",
  container: "col-span-4 flex flex-col items-center w-full",
  title: "text-text text-[1rem] font-[600] self-start",
};

const blogStickyStyle = {
  wrapper:
    "xl:sticky top-[20%] xl:col-span-2 col-span-6 w-full h-fit flex flex-col",
  container: "flex xl:flex-col mb-6 gap-x-4 xl:gap-y-4 xl:mt-4",
};

const courseCardStyle = {
  wrapper:
    "w-full sm:w-[20rem] xs:h-[35rem] md:h-[31rem] mx-auto mb-4 text-justify p-4 rounded-xl shadow-xl flex flex-col items-center justify-between",
  titleWrapper: "flex flex-col justify-center items-center w-full",
  title: "mb-4 text-text text-[1.3rem] font-[500]",
  imageWrapper: "overflow-hidden w-full md:h-[10rem] h-[13rem] mb-8",
  image:
    "w-full sm:h-[10rem] h-[13rem] object-cover mb-4 hover:scale-150 hover:translate-y-8 ease-in-out transition-all duration-500",
  detailsWrapper: "h-full flex flex-col justify-between",
  details: "text-text text-justify mb-4 text-[1.15rem] md:text-[1rem]",
  button:
    "flex mx-auto justify-center rounded-xl shadow-sm border-none text-center px-3 py-2 text-[1rem] font-[400] w-[50%]",
};

const courseFormStyle = {
  form: "col-span-2 md:py-8 md:px-8 py-4 px-1 rounded-xl shadow-xl",
  title: "md:text-4xl text-xl text-center text-text font-[500] mb-8",
  input:
    "text-text md:text-[1.2rem] text-[1rem] font-[400] py-2 px-4 rounded-xl outline-2 outline-offset-2 outline-dotted outline-text",
  label: "flex flex-col text-text md:text-[1.2rem] text-[1rem] font-[500] p-4",
  button:
    "px-16 py-2 rounded-xl shadow-xl border-none text-[1rem] font-[500] mx-auto block",
};

const footerStyle = {
  wrapper: "w-full flex flex-col xl:mt-24 mt-8 text-text",
  image: "h-[7rem]",
  container:
    "flex flex-wrap sm:flex-row flex-col justify-between items-center sm:px-20",
  logoContainer: "flex flex-col items-center justify-center",
  logo: "bg-logo bg-logoimage w-[6rem] h-[6rem] bg-white bg-center rounded-full",
  copyright: "font-[400] text-[1rem] text-center",
  linkContainer:
    "flex sm:flex-row flex-col sm:pl-0 pl-8 sm:pt-0 pt-8 sm:w-[50%] w-full justify-between",
  linkList: "flex flex-col leading-8 pb-8",
  linkTitle: "font-[600] sm:text-[1.2rem] text-[1.5rem]",
  linkItem: "font-[400] sm:text-[1rem] text-[1.2rem]",
  underLinks:
    "flex justify-end flex-wrap sm:px-16 px-6 py-2 border-t-2 border-dotted",
  underLinkSpan: "flex gap-4 font-[400] text-[1rem]",
  underLink: "text-center",
};

const phoneInputStyle = {
  width: "100%",
  fontSize: "1.2rem",
  fontWeight: "400",
  borderRadius: "15px",
  outline: "none",
  border: "none",
  padding: "0.5rem 4rem",
  color: "#2f2f2f",
  backgroundColor: "#fff",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  outlineStyle: "dotted",
  outlineOffset: "2px",
  outlineWidth: "2px",
  outlineColor: "#2b2730",
};

const userPhoneInputStyle = {
  width: "100%",
  height: "100%",
  padding: "0 0 0 4rem",
  margin: "0.5rem 0 0 0",
  fontSize: "1rem",
  fontWeight: "400",
  outline: "none",
  border: "none",
  color: "#2f2f2f",
  display: "flex",
  alignItems: "center",
  backgroundColor: "white",
};

const recolorStyle = {
  filter:
    "grayscale(100%) invert(62%) sepia(26%) saturate(7061%) hue-rotate(307deg) brightness(93%) contrast(93%)",
};

const shadowStyle = {
  background:
    "linear-gradient(180deg, rgba(166, 163, 163, 0.3) 30%, rgba(255, 255, 255, 1) 100%)",
};

const containerStyle = {
  transition: "0.5s ease-in-out",
};

const authStyle = {
  background: "rgba(255, 255, 255, 0.2)",
  boxShadow: "rgba(0, 0, 0, 0.12)",
};

const formStyle = {
  boxShadow: "0 5px 45px rgba(0,0,0,0.25",
  transition: "0.5s ease-in-out",
};

const menuOffStyle = {
  transition: "0.5s ease-in-out",
  transform: "translateX(-100vw)",
  width: 0,
  height: "100vh",
};

const menuOnStyle = {
  transition: "0.5s ease-in-out",
  transform: "translateX(0)",
  width: "100vw",
  height: "100vh",
};

const personalMenuOffStyle = {
  transition: "0.5s ease-in-out",
  transform: "translateX(200vw)",
  width: 0,
  height: "100vh",
};

const glassStyle = `bg-[rgba(255, 255, 255, 0.2)] rounded-2xl boxShadow-[0 4px 30px rgba(0, 0, 0, 0.1)] backdrop-blur-sm border-1 border-solid border-[rgba(255, 255, 255, 0.3)]`;

const tableStyle = "text-text text-[1rem] font-[500] pl-2 md:py-2";

const postcardStyle = {
  stampImage:
    "absolute lg:border-[0.3125rem] md:border-[0.2rem] border-[0.15rem] lg:top-2 md:top-[0.75rem] top-[0.5rem] lg:left-2 left-[0.5rem] lg:w-[11.5rem] md:w-[6.5rem] w-[5.25rem] lg:h-[9rem] h-[4rem] bg-stamp bg-cover",
  message:
    "font-letter text-text xl:text-[2.2rem] sm:text-[1.3rem] text-[1rem]",
  addressWrapper: "sm:w-[70%] ms:w-[45%] w-[60%] border-b-4",
  address:
    "font-letter text-text xl:text-[2.7rem] sm:text-[1.8rem] text-[1.4rem] ml-8",
};

const signInFormStyle = {
  input:
    "text-text xl:text-[1.2rem] lg:text-[1rem] md:text-[1.4rem] text-[1rem] font-[400] py-1 px-4 rounded-xl outline-none outline-dotted",
  label:
    "flex flex-col text-text xl:text-[1.2rem] lg:text-[1rem] md:text-[1.4rem] text-[1rem] font-[500] pb-1",
  button:
    "px-16 py-2 rounded-xl shadow-xl border-none font-[500] mx-auto block mt-8 xl:text-[1.2rem] lg:text-[1rem] md:text-[1.4rem] text-[1rem]",
  forgotButton:
    "flex items-center justify-center border-2 shadow-xl rounded-md px-2 py-1 mt-6 xl:text-[1.2rem] lg:text-[1rem] md:text-[1.4rem] text-[1rem]",
};

const signUpFormStyle = {
  input:
    "text-text xl:text-[1.2rem] lg:text-[1rem] md:text-[1.4rem] text-[1rem] font-[400] py-1 px-4 rounded-xl outline-none outline-dotted",
  label:
    "flex flex-col text-text xl:text-[1.2rem] lg:text-[1rem] md:text-[1.4rem] text-[1rem] font-[500] pb-1 mt-4",
  button:
    "px-16 py-2 rounded-xl shadow-xl border-none font-[500] mx-auto block xs:mt-8 mt-4 xl:text-[1.2rem] lg:text-[1rem] md:text-[1.4rem] text-[1rem]",
};

const adminPageStyle = {
  wrapper: "w-full h-full flex flex-col items-center p-4",
  title: "text-text text-[1.5rem] text-center font-[600] mb-8",
};

const userPageStyle = {
  input:
    "text-text md:text-[1.2rem] text-[1rem] font-[400] py-1 px-4 mt-2 rounded-xl outline-2 outline-offset-2 outline-dotted",
  label:
    "flex flex-col text-text md:text-[1.2rem] text-[1rem] font-[500] xl:py-4 py-2",
  button:
    "py-1 rounded-xl shadow-xl border-none text-[1.2rem] font-[500] xl:col-span-1 md:col-span-3 md:col-start-3 xl:col-start-7 xl:mx-0 xl:px-0 mx-auto px-6 py-2",
  passwordButton:
    "py-2 rounded-2xl shadow-xl border-none text-[1.2rem] font-[500] md:col-start-5 col-start-3 md:col-span-2 col-span-4 md:mt-0 mt-4",
  deleteButton:
    "py-2 rounded-2xl shadow-xl border-none text-[1.2rem] font-[500] md:self-end col-start-3 md:px-8 col-span-4 md:mt-0 mt-4",

  title: "col-span-6 xl:text-[3rem] text-[2rem] font-[600] mb-8 text-center",
};

const tooltipStyle = {
  backgroundColor: "#6554af",
  color: "#fff",
  fontWeight: 600,
};

const titleStyle = "xl:text-[3rem] text-[2rem] text-center font-[600] mb-8";

const subTitleStyle =
  "xl:text-[1.5rem] text-[1rem] text-center font-[400] -mt-8 mb-8";

export {
  adminLoginStyle,
  adminMenuStyle,
  adminPanelStyle,
  authButtonStyle,
  awningStyle,
  blogCarouselStyle,
  blogCategoryCardStyle,
  blogCommentStyle,
  blogCommentFormStyle,
  blogFormStyle,
  blogPostCardStyle,
  blogProposalStyle,
  blogStickyStyle,
  courseCardStyle,
  courseFormStyle,
  footerStyle,
  phoneInputStyle,
  recolorStyle,
  shadowStyle,
  authStyle,
  formStyle,
  containerStyle,
  menuOffStyle,
  menuOnStyle,
  personalMenuOffStyle,
  glassStyle,
  tableStyle,
  postcardStyle,
  signInFormStyle,
  signUpFormStyle,
  adminPageStyle,
  tooltipStyle,
  userPageStyle,
  userPhoneInputStyle,
  titleStyle,
  subTitleStyle,
  Theme_Div,
  Theme_Motion_Div,
  Theme_Motion_Span,
  Theme_Img,
  Theme_Form,
  Theme_H1,
  Theme_P,
  Theme_Button,
  Theme_Link,
  Theme_Icon,
  Theme_Footer,
  Theme_Nav,
  Theme_Li,
  Theme_Hr,
  Theme_Input,
  Theme_Textarea,
  Theme_Stamp,
  Theme_Span,
  Theme_Select,
  Theme_PhoneInput,
};
