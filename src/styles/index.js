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

export const tableStyle = "text-text text-[1rem] font-[500] pl-2 md:py-2";

export const titleStyle =
  "xl:text-[3rem] text-[2rem] text-center font-[600] mb-8";

export const adminLoginStyle = {
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

export const adminMenuStyle = {
  wrapper:
    "pt-4 px-2 md:col-span-1 col-span-6 md:mb-0 mb-4 flex flex-col bg-white rounded-xl items-center md:sticky top-[10rem] shadow-inner shadow-black",
  mainList: "md:pt-0 pt-4",
  mainListItem: "text-text text-[1.2rem] font-[600]",
  subList: "pl-2 pb-4",
  subListItem: "text-text text-[1.4rem] font-[700] mb-4",
  title: "text-text text-[1rem] font-[500] hover:text-logopink",
  icon: "md:hidden block text-[3rem] mx-auto cursor-pointer hover:text-logopink",
  squeezed: "h-[5rem]",
  notSqueezed: "h-fit",
};

export const adminPageStyle = {
  wrapper: "w-full h-full flex flex-col items-center p-4",
  wrapperRelative: "w-full h-full flex flex-col items-center p-4 relative",
  title: "text-text text-[1.5rem] text-center font-[600] mb-8",
  icon: "text-text text-[3rem] hover:text-yellowdark cursor-pointer self-start md:mb-0 mb-4 md:absolute top-[1rem] left-[1rem]",
  deleteIcon:
    "delete outline-none text-text text-[3rem] hover:text-logopink cursor-pointer md:absolute self-start top-[1rem] left-[1rem]",
};

export const adminPanelStyle = {
  title: `${titleStyle} col-span-6`,
  wrapper:
    "glass grid grid-cols-6 xl:w-[90%] w-full bg-purpleglass rounded-xl md:p-12 p-4 gap-x-8 shadow-2xl",
  container:
    "md:col-span-5 col-span-6 bg-white rounded-xl shadow-inner shadow-black p-4",
  button:
    "md:col-start-6 md:col-auto col-span-6 bg-purple text-white text-[1.2rem] hover:bg-yellowdark hover:text-text font-[500] rounded-xl mt-4 py-2",
};

export const allFavouritesStyle = {
  container:
    "flex items-center min-w-[75%] md:w-auto w-full md:h-[3rem] h-[3.5rem] rounded-xl shadow-xl p-2 cursor-pointer gap-x-4 hover:-translate-y-1 transition-all duration-500 border border-text",
  title:
    "text-text md:text-[1.2rem] md:w-auto w-[75%] text-[1rem] text-center font-[600]",
  icon: "text-[2.2rem] cursor-pointer",
};

export const appStyle = {
  container:
    "md:pt-56 pt-36 w-full flex flex-col items-center bg-main lg:bg-background bg-mobBackground",
};

export const authButtonStyle = {
  wrapper:
    "relative lg:w-[50%] w-full lg:h-full h-[14vh] flex flex-col items-center justify-center",
  title: "text-text font-[500] xs:text-[1.2rem] text-[0.9rem] mb-2",
  button:
    "rounded-xl shadow-sm border-none font-[400] text-center px-3 xs:py-2 py-1",
};

export const authenticationStyle = {
  container:
    "glass shadow-xl md:-mt-40 -mt-20 lg:h-[102vh] h-[90vh] xl:w-[90%] 3xl:w-[80%] w-full rounded-xl md:p-12 p-4 flex flex-col items-center justify-center relative",
  buttonContainer:
    "lg:w-[80%] w-[85%] lg:h-[70vh] h-[90%] lg:mt-0 mt-[15%] flex items-center justify-between lg:flex-row flex-col rounded-xl",
  isReg:
    "lg:left-[47.5%] lg:top-auto xs:top-[27%] md:top-[29%] ms:top-[31%] top-[26%] lg:rounded-r-xl rounded-xl",
  notIsReg:
    "lg:left-[12.5%] lg:top-auto xs:top-[10%] ms:top-[14%] top-[9.75%] lg:rounded-l-xl rounded-xl",
  formContainer:
    "absolute lg:w-[40%] w-[85%] lg:h-[75vh] md:h-[68%] ms:h-[67%] h-[70%] bg-white z-[10] flex justify-center items-center",
};

export const awningStyle = {
  wrapper: "w-full h-[3.5rem] fixed top-0 left-0 z-[11] flex",
  awning: "piece w-[80px] h-full rounded-b-full shadow-xl",
  shadow: "w-full h-full rounded-b-full",
};

export const blogAllStyle = {
  container: "flex w-full h-full flex-wrap gap-y-8 gap-x-4 justify-evenly",
  postContainer:
    "card relative bg-primary overflow-hidden 3xl:w-[15rem] w-[17rem] 3xl:h-[15rem] h-[12rem] flex flex-col items-center cursor-pointer rounded-xl shadow-xl",
  image: "absolute w-full 3xl:h-[12rem] h-[10rem] object-cover",
  filter: "filter absolute w-full h-full bg-purpleglass",
  content:
    "w-full 3xl:h-[12rem] h-[10rem] flex items-center justify-center gap-4",
  icon: "text-white text-[3rem] hover:text-yellowdark cursor-pointer",
  titleContainer: "absolute bottom-0 w-full 3xl:h-[3rem] h-[2rem]",
  bg: "bg-yellowdark",
  flex: "flex items-center justify-center",
  title: "text-text text-[1.2rem] font-[500]",
};

export const blogCarouselStyle = {
  image:
    "w-[20rem] h-[12rem] object-cover border-2 border-white rounded-xl shadow-xl mb-4",
  title: "text-text text-center text-[1.2rem] font-[600]",
  link: "cursor-pointer",
};

export const blogCategoryCardStyle = {
  wrapper:
    "rounded-xl xl:mb-0 mb-6 flex flex-col h-fit items-center justify-center shadow-xl px-3 py-3",
  list: "flex flex-wrap justify-center gap-x-6 gap-y-2",
  title: "mb-3 text-text text-[1.5rem] font-[600]",
  button:
    "rounded-xl py-1 px-2 shadow-sm font-[700] text-[1rem] cursor-pointer",
};

export const blogCommentStyle = {
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

export const blogCommentFormStyle = {
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

export const blogFormStyle = {
  form: "w-full grid grid-cols-4 md:gap-x-16 gap-y-8",
  container: "md:col-span-2 col-span-4 flex flex-col gap-y-4 justify-between",
  label:
    "flex flex-col text-text xl:text-[1.2rem] lg:text-[1rem] md:text-[1.4rem] text-[1rem] font-[500] gap-y-2",
  input:
    "text-text xl:text-[1.2rem] lg:text-[1rem] md:text-[1.4rem] text-[1rem] font-[400] py-1 px-4 rounded-xl outline-none outline-dotted outline-purple",
  language:
    "h-[2.2rem] text-text xl:text-[1.2rem] lg:text-[1rem] md:text-[1.4rem] text-[1rem] font-[400] py-1 px-4 rounded-xl outline-none outline-dotted outline-purple",
  button:
    "md:col-start-4 md:col-auto col-span-4 py-2 bg-purple hover:bg-yellowdark hover:text-text rounded-xl shadow-xl border-none text-white font-[500] xl:text-[1.2rem] lg:text-[1rem] md:text-[1.4rem] text-[1rem]",
  dbPost: "cursor-not-allowed",
  notDbPost: "cursor-normal",
  loading: "cursor-progress",
  pointer: "cursor-pointer",
};

export const blogCommentPageStyle = {
  span: "md:absolute md:mb-0 mb-4 top-0 right-0 w-full flex justify-between items-center md",
  deleteIcon:
    "delete outline-none text-text text-[3rem] hover:text-logopink cursor-pointer",
  publishIcon: "outline-none text-[4rem] cursor-pointer",
  green: "text-green",
  red: "text-red",
  form: "w-full grid grid-cols-4 gap-y-8 gap-x-16",
  label: `${blogFormStyle.label} md:col-span-2 col-span-4`,
  flex: "md:col-span-2 col-span-4 flex flex-col gap-8",
};

export const blogCommentsStyle = {
  input: `${adminLoginStyle.input} border-2 w-[20rem] h-[3rem] mb-4`,
  list: "grid grid-cols-8 w-full md:px-8 px-4 items-center",
  header:
    "min-h-[2rem] text-text text-[1.1rem] font-[600] pl-2 hidden md:flex gap-x-4 items-center",
  sortIcon: "text-[1.8rem] hover:text-logopink cursor-pointer",
  imageContainer: `${tableStyle} md:col-span-1 col-span-8`,
  image:
    "md:w-12 w-16 md:h-12 h-16 mx-auto rounded-full object-cover cursor-pointer",
  textContainer: `${tableStyle} md:col-span-2 col-span-8 md:text-left text-center`,
  author: `${tableStyle} cursor-pointer hover:text-logopink inline`,
  hoverText: "hover:text-logopink cursor-pointer",
  mobileHide: `${tableStyle} hidden md:block col-span-2`,
  iconContainer:
    "md:flex hidden gap-4 justify-center items-center py-2 col-span-1",
  deleteIcon: "delete text-text outline-none text-[2rem]",
  editIcon: "edit text-text outline-none text-[1.5rem]",
  published: "published text-green",
  notPublished: "hided text-red",
  publishIcon: "outline-none text-[2.5rem] mt-[0.1rem] cursor-pointer",
  hrLine: "h-[0.1rem] md:hidden col-span-8 bg-black mb-4 mt-2",
};

export const blogPostCardStyle = {
  wrapper: "w-full rounded-2xl mb-16 shadow-xl",
  image: "w-full h-[25rem] object-cover rounded-t-2xl",
  container: "p-8 flex flex-col items-center justify-center",
  title: "self-center mb-4 text-text text-[1.3rem] font-[600]",
  dateAuthor: "flex w-full justify-between mb-4",
  text: "text-text text-justify text-[1rem] mb-4",
  list: "flex gap-4 self-start mt-4",
  listItem: "text-[1.2rem]",
  button: "rounded-xl px-4 py-2 font-[600] shadow-xl self-center",
  own: "font-[600]",
  notOwn: "font-[400]",
  hidden: "hidden",
  block: "block",
};

export const blogPostPageStyle = {
  title: `${titleStyle} col-span-6`,
  cardContainer: "xl:col-span-4 col-span-6",
};

export const blogProposalStyle = {
  wrapper: "h-fit rounded-xl p-3 grid grid-cols-6 shadow-xl cursor-pointer",
  image: "col-span-2 rounded-full w-[5rem] h-[5rem] object-cover border-2",
  container: "col-span-4 flex flex-col items-center w-full",
  title: "text-text text-[1rem] font-[600] self-start",
};

export const blogStickyStyle = {
  wrapper:
    "xl:sticky top-[20%] xl:col-span-2 col-span-6 w-full h-fit flex flex-col",
  container: "flex xl:flex-col mb-6 gap-x-4 xl:gap-y-4 xl:mt-4",
};

export const blogStyle = {
  title: `${titleStyle} col-span-6`,
  carouselContainer: "col-span-6 xl:mb-24 mb-8 -mx-12",
  postContainer: "xl:col-span-4 col-span-6",
};

export const blogTagPageStyle = {
  title: `${titleStyle} col-span-6`,
  cardContainer: "xl:col-span-4 col-span-6",
};

export const contextStyle = {
  loadingContainer: "w-full h-[100vh]",
};

export const courseCardStyle = {
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

export const courseFormStyle = {
  form: "col-span-2 md:py-8 md:px-8 py-4 px-1 rounded-xl shadow-xl",
  title: "md:text-4xl text-xl text-center text-text font-[500] mb-8",
  input:
    "text-text md:text-[1.2rem] text-[1rem] font-[400] py-2 px-4 rounded-xl outline-2 outline-offset-2 outline-dotted outline-text",
  label: "flex flex-col text-text md:text-[1.2rem] text-[1rem] font-[500] p-4",
  button:
    "px-16 py-2 rounded-xl shadow-xl border-none text-[1rem] font-[500] mx-auto block",
  loading: "cursor-progress",
  notLoading: "cursor-pointer",
};

export const coursesStyle = {
  container:
    "w-full flex md:flex-row flex-col gap-4 items-center justify-center",
};

export const coursePageStyle = {
  arrayContainer:
    "flex md:flex-row flex-col items-center justify-center xl:gap-16 mb-8",
  imageSpan: "flex flex-col gap-8 xl:gap-12",
  imageFirst: "3xl:w-[60rem] md:w-[30rem] w-full rounded-xl shadow-xl",
  imageSecond: "3xl:w-[60rem] md:w-[30rem] w-full mb-6 rounded-xl shadow-xl",
  list: "list-disc pl-4 xl:mb-8 xl:w-[60rem] w-full ml-4 pr-4",
  listItem:
    "text-text 2xl:text-[1.25rem] text-[1.5rem] font-[400] text-justify",
  firstItem: "font-[600] list-none",
  notArrayContainer:
    "xl:flex md:flex-row-reverse flex-col items-center justify-center text-justify mb-8",
  imageRegular:
    "xl:w-[30rem] md:w-[20rem] w-full mb-8 md:float-right md:ml-8 rounded-xl shadow-xl",
  paragraph:
    "text-text 2xl:text-[1.25rem] text-[1.5rem] font-[400] mb-8 inline",
  formContainer:
    "w-full xl:grid xl:grid-cols-3 flex-col flex self-center mt-16 md:pb-16 pb-4 xl:px-16 2xl:px-0 md:gap-8 justify-between",
  imageContainer: "w-full flex flex-col gap-4 self-center mb-8 md:mb-0",
};

export const favouritesStyle = {
  container:
    "3xl:w-[80%] xl:w-[90%] w-full glass shadow-xl rounded-xl grid grid-cols-6 gap-x-12 md:p-12 p-4",
  outletContainer: "min-h-[30rem] w-full flex flex-col gap-y-6 items-center",
};

export const footerStyle = {
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

export const homeStyle = {
  container:
    "xl:w-[75%] w-full flex xl:flex-row flex-col items-center justify-center",
  motionSpan: "px-8 2xl:px-0",
  titleContainer: "lg:mb-6 2xl:max-w-[95%]",
  titleSpan: "flex xl:flex-col flex-row flex-wrap lg:mb-2",
  title:
    "3xl:text-[4.5rem] 2xl:text-[3.5rem] text-[1.9rem] 2xl:font-[400] font-[600]",
  titleSpace: "visible xl:hidden text-[2rem]",
  subTitle:
    "xl:my-2 2xl:text-[1rem] xl:text-[1.2rem] text-[1.4rem] text-justify 2xl:max-w-[80%]",
  buttonFirst:
    "rounded-xl shadow-sm border-none text-center font-[500] px-8 py-3 text-[1.3rem] 2xl:inline-block hidden",
  buttonSecond:
    "rounded-xl shadow-sm border-none text-center font-[500] px-8 py-3 text-[2rem] md:text-[3rem] xl:hidden inline-block mt-16 mb-0",
};

export const imageStyle = {
  image: "md:w-[80%] xl:w-[40%] w-[100%] mt-8 rounded-3xl shadow-xl",
  first: "ml-0",
  notFirst: "2xl:ml-24",
};

export const imageCarouselStyle = {
  container: "w-full flex items-center",
  dotList: "custom-dot-list-style mb-3",
};

export const loadingStyle = {
  wrapper: "flex flex-col w-full h-full items-center justify-start",
  image: "w-[20rem] h-[20rem]",
  title: "text-text text-[2rem] font-[500] -mt-[5rem]",
};

export const mainContentStyle = {
  wrapper: "flex flex-col items-center w-full",
};

export const myCartStyle = {
  container: "w-full h-[30rem]",
};

export const navDesktopStyle = {
  wrapper:
    "lg:visible invisible 2xl:w-[85%] w-full h-[7rem] fixed pt-4 top-7 rounded-2xl flex items-center justify-around text-[1rem] 2xl:text-[1.3rem] font-[400] shadow-md z-10",
  list: "flex justify-evenly items-center w-full",
  listWrapper: "flex justify-evenly items-center w-[45%]",
  logo: "rounded-full h-[6rem] contrast-100",
  logoWrapper: "flex justify-center items-center w-[10%]",
  button:
    "rounded-xl shadow-sm border-none text-center font-[400] px-8 py-1 cursor-pointer",
  cursor: "cursor-pointer",
};

export const navMobileStyle = {
  logo: "w-[5rem] h-[5rem] mx-auto fixed top-[3rem] left-0 right-0 z-[3]",
  menuContainer:
    "lg:invisible visible fixed top-0 left-0 w-full h-[8rem] z-[2] flex justify-between items-end rounded-b-xl shadow-xl",
  menuIcon: "md:text-[4.2rem] text-[3.4rem] ml-4 mb-2",
  userMenuIcon: "md:text-[3.8rem] text-[2.8rem] mr-4 mb-2",
  sideMenuContainer:
    "bg-main bg-mobBackground fixed top-0 left-0 z-[12] flex items-center justify-center",
  sideMenuList:
    "flex flex-col md:text-[5rem] text-[2.5rem] font-[400] items-center",
  userListItem: "text-[1.2rem]",
  userButton: "md:text-[5rem] text-[2.5rem] font-[400]",
  closeIconRight:
    "absolute top-[2rem] right-[1rem] md:text-[4.8rem] text-[4rem]",
  closeIconLeft: "absolute top-[2rem] left-[1rem] md:text-[4.8rem] text-[4rem]",
};

export const navUserStyle = {
  wrapper:
    "lg:visible invisible flex flex-col items-center justify-center fixed 3xl:right-[12rem] 2xl:right-[8rem] right-4 top-[8rem] w-[15rem] rounded-b-xl shadow-xl z-[9] transition-all duration-500 ease-in-out",
  openWrapper: "h-[15rem]",
  closeWrapper: "h-0",
  openList: "visible opacity-1 delay-300",
  closeList: "invisible opacity-0",
  list: "flex flex-col p-5 transition-all ease-in-out",
  listItem: "text-[1.2rem]",
};

export const noPermissionStyle = {
  image: "w-[15rem]",
};

export const notFoundStyle = {
  container: "flex items-center justify-center",
  title: "error text-[#e0e0e0] text-[6.4rem] font-[400] mb-5 mr-2",
  image: "w-[15rem]",
};

export const ourStoryStyle = {
  textContainer: "mb-10",
  staffContainer:
    "w-full flex md:flex-row flex-col flex-wrap justify-between gap-8",
  image: "w-[30rem] float-right ml-6 mb-4 rounded-xl shadow-xl",
  paragraph:
    "text-text 2xl:text-[1.25rem] text-[1.5rem] text-justify font-[400] mb-4",
  sign: "text-text text-[2.5rem] font-[400] mb-4 font-letter",
};

export const paragraphsStyle = {
  imgFirst: "2xl:ml-24",
  imgLast: "ml-0",
  paragraph: "my-2",
  wrapper:
    "md:text-justify 2xl:max-w-[40%] max-w-[90%] 2xl:text-[1.25rem] text-[1.5rem] mt-8 xl:mt-0  text-text leading-9",
};

export const phoneInputStyle = {
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

export const postcardStyle = {
  wrapper:
    "hidden xs:flex sm:w-[90%] ms:w-[75%] bg-white sm:flex-row flex-col xs:mb-24",
  messageWrapper:
    "sm:w-[50%] sm:p-8 p-2 pb-10 sm:my-4 sm:mx-0 mx-4 sm:border-r-2 border-r-0 sm:border-b-0 border-b-2",
  stampImage:
    "absolute lg:border-[0.3125rem] md:border-[0.2rem] border-[0.15rem] lg:top-2 md:top-[0.75rem] top-[0.5rem] lg:left-2 left-[0.5rem] lg:w-[11.5rem] md:w-[6.5rem] w-[5.25rem] lg:h-[9rem] h-[4rem] bg-stamp bg-cover",
  message:
    "font-letter text-text xl:text-[2.2rem] sm:text-[1.3rem] text-[1rem]",
  messageOne: "lg:my-8 sm:my-4 my-2",
  messageTwo: "lg:mb-8 sm:mb-8 my-2",
  messageThree: "lg:mb-16 sm:mb-8 mb-4",
  stampContainer:
    "sm:w-[50%] sm:rotate-0 rotate-90 flex flex-col items-center sm:pb-24 pb-2 sm:pt-8 pt-0",
  stamp:
    "lg:w-[12.5rem] md:w-[7.5rem] w-[6.25rem] xl:h-[10rem] lg:h-[11.3rem] md:h-[5.5rem] h-[5rem] relative lg:self-end lg:mr-8 lg:ml-0 ml-36",
  stampPicture:
    "absolute w-full lg:bottom-[-2rem] bottom-[-1rem] lg:left-[-2rem] left-[-1rem]",
  addressWrapper:
    "h-[75%] w-full flex flex-col items-center justify-center gap-6",
  addressContainer: "sm:w-[70%] ms:w-[45%] w-[60%] border-b-4",
  address:
    "font-letter text-text xl:text-[2.7rem] sm:text-[1.8rem] text-[1.4rem] ml-8",
  zipWrapper: "sm:w-[70%] ms:w-[45%] w-[60%] flex gap-4",
  zipContainer:
    "border-4 lg:w-[3rem] sm:[2.2rem] w-[2rem] md:h-[4rem] sm:h-[3rem] h-[2.5rem] text-center",
  zip: "font-letter text-text lg:text-[2.2rem] sm:text-[1.8rem] text-[1.5rem]",
};

export const previousOrdersStyle = {
  container: "w-full h-[30rem] bg-purple",
};

export const recipeCardStyle = {
  wrapper:
    "w-full sm:w-[20rem] xs:h-[35rem] md:h-[31rem] mx-auto mb-4 text-justify p-4 rounded-xl shadow-xl flex flex-col items-center justify-between",
  titleWrapper: "flex flex-col justify-center items-center w-full",
  title:
    "h-[4rem] text-text text-[1.2rem] font-[500] text-center line-clamp-2 overflow-hidden",
  imageWrapper: "overflow-hidden w-full h-[20rem] mb-8",
  image:
    "w-full h-[20rem] object-cover mb-4 hover:scale-150 hover:translate-y-8 ease-in-out transition-all duration-500 cursor-pointer",
  detailsWrapper: "h-full flex flex-col justify-between",
  details: "text-text text-justify mb-4 text-[1.15rem] md:text-[1rem]",
  button:
    "flex mx-auto justify-center rounded-xl shadow-sm border-none text-center px-3 py-2 text-[1rem] font-[400] w-[50%] cursor-pointer",
};

export const recipePageStyle = {
  wrapper: "w-full h-auto md:p-12 p-4 rounded-xl shadow-xl border",
  notOwn: "mb-20",
  likeIcon: "text-[4rem] cursor-pointer",
  iconContainer: "w-full flex items-center justify-between",
  title:
    "mb-4 xl:text-[1.8rem] text-[1.4rem] text-left font-[500] text-text xl:mt-0 mt-8",
  cardTitle: "text-[1.3rem] text-text font-[400]",
  list: "mb-8 font-[300] text-text text-[1rem] xl:w-[50%]",
  listItem: "flex flex-row gap-2 md:mb-0 my-1",
  span: "w-[2rem] h-[2rem]",
  ingredientsIcon: "text-[2rem] cursor-pointer self-center",
  instructions: "text-[1.1rem] text-justify font-[400] text-text pb-4",
  socialWrapper: "mt-8 flex gap-4",
  email: "cursor-pointer",
  ingredientsWrapper:
    "flex xl:flex-row flex-col-reverse items-center justify-between",
  imageWrapper: "xl:w-[40%] mb-8",
  image: "rounded-xl shadow-xl",
  icon: "text-[4rem] cursor-pointer hover:-translate-y-1 transition-all duration-300 self-start",
};

export const recipesStyle = {
  loadingContainer: "mt-[-5rem]",
  text: "text-text py-3 text-[1.3rem]",
  button: "px-8 rounded-xl shadow-xl border-none py-3 text-[1.3rem] font-bold",
  cardContainer: "flex w-full h-full flex-wrap",
  pagination: "flex justify-center w-full gap-4 mt-4",
  activePage:
    "text-logopink font-bold border border-black px-2 bg-white rounded-md",
};

export const reviewCardStyle = {
  wrapper:
    "mx-auto xs:w-[20rem] w-[16rem] h-[30rem] border relative flex flex-col items-center rounded-xl shadow-xl hover:cursor-grab active:cursor-grabbing",
  background: "w-full h-[25%] bg-cover rounded-t-xl object-cover",
  profile:
    "rounded-full w-[10rem] h-[10rem] absolute top-[10%] object-cover border-4",
  nameContainer: "flex flex-col items-center absolute top-[45%]",
  name: "text-text text-[1.6rem] font-[600]",
  job: "text-text text-[1.3rem] font-[400]",
  review:
    "italic text-text text-[1rem] font-[300] absolute top-[65%] text-justify px-4",
  span: "absolute top-[88%] flex w-full left-[33%]",
  star: "text-yellowdark text-[1.4rem]",
};

export const settingsStyle = {
  title: "text-text text-[1.4rem] font-[600]",
  titleMt: "text-text text-[1.4rem] font-[600] mt-8",
  hrLine: "my-8 border-dotted border-t-2",
};

export const shop = {
  bannerContainer:
    "xl:w-[85vw] w-full flex xl:flex-row flex-col-reverse items-center justify-evenly xl:px-16 rounded-xl self-center shadow-inner shadow-black",
  formContainer:
    "flex flex-col xl:w-auto w-full items-center justify-between min-h-[12rem] xl:mr-10",
  form: "flex gap-4 xl:flex-row flex-col mt-6 xl:mt-0",
  input: "rounded-xl p-2 pl-4 w-[20rem]",
  button: "rounded-xl px-2 xl:w-auto w-[50%] self-center py-2",
  categoryContainer:
    "w-full flex items-center justify-center my-6 xl:my-0 mx-2 xl:mx-0 xl:gap-8 gap-2 flex-wrap",
  categoryIcon:
    "md:w-[7rem] w-[28vw] md:h-[7rem] h-[28vw] bg-white flex items-center justify-center rounded-full cursor-pointer relative container overflow-hidden",
  categoryLayer: "layer w-full h-full absolute z-[0] rounded-full",
  categoryDetails: "absolute z-1 flex-col flex items-center justify-center",
  categoryPic: "text-[3rem]",
  millContainer: "mill w-[15rem] h-[15rem] rounded-full bg-white",
  millBackground:
    "background w-full h-full bg-logoimage bg-cover bg-center absolute",
  macaronBlue: "w-[5rem] h-[5rem] rounded-full -translate-y-6 translate-x-8",
  macaronBrown:
    "w-[5rem] h-[5rem] rounded-full -translate-y-[4rem] translate-x-[11rem]",
  macaronGreen:
    "w-[5rem] h-[5rem] rounded-full -translate-y-[1rem] translate-x-[11rem]",
  macaronPurple:
    "w-[5rem] h-[5rem] rounded-full -translate-y-[4rem] translate-x-[2rem]",
  macaronYellow:
    "w-[5rem] h-[5rem] rounded-full -translate-y-[16rem] -translate-x-[2rem]",
  productsContainer:
    "flex gap-8 flex-wrap shadow-inner shadow-black items-center justify-center xl:w-[85vw] w-full rounded-xl py-8 mt-16",
  noResult: "tex-text text-[1.5rem] font-[500]",
  cardContainer:
    "md:w-[15rem] ms:w-[22rem] w-[20rem] xl:h-[30rem] h-[40rem] relative flex flex-col rounded-xl",
  cardImageContainer:
    "w-full md:h-[15rem] ms:h-[22rem] h-[20rem] rounded-t-xl overflow-hidden border-[0.5px]",
  cardImage:
    "w-full h-full bg-contain bg-no-repeat bg-center hover:scale-[120%] transition duration-300 ease-in-out cursor-pointer",
  cardSpace: "w-full h-[0.4rem] bg-transparent",
  cardInfoContainer:
    "w-full min-h-[10rem] shadow-xl p-4 flex flex-col relative border-[0.5px]",
  cardStar: "flex text-[#f70] self-center mt-2",
  cardButton:
    "w-full xl:h-[3rem] h-[5rem] bottom-0 rounded-b-xl shadow-xl flex items-center gap-1 justify-center xl:text-[1rem] md:[text-2rem] text-[1.5rem]",
  cardButtonText: "font-[600] py-1",
  productName:
    "self-center text-center font-[600] my-2 xl:text-[1rem] text-[1.5rem]",
  productComment:
    "self-center text-center font-[400] xl:text-[1rem] text-[1.2rem]",
  productPrice: "absolute self-end bottom-2 text-[1.5rem] font-[700]",
};

export const signInFormStyle = {
  wrapper: "flex flex-col w-full h-full items-center justify-center",
  title:
    "xl:text-4xl lg:text-xl md:text-4xl text-xl text-center text-text font-[600] mb-6",
  form: "flex flex-col items-start",
  icon: "mr-2",
  input:
    "text-text xl:text-[1.2rem] lg:text-[1rem] md:text-[1.4rem] text-[1rem] font-[400] py-1 px-4 rounded-xl outline-none outline-dotted",
  label:
    "flex flex-col text-text xl:text-[1.2rem] lg:text-[1rem] md:text-[1.4rem] text-[1rem] font-[500] pb-1",
  labelMt:
    "mt-4 flex flex-col text-text xl:text-[1.2rem] lg:text-[1rem] md:text-[1.4rem] text-[1rem] font-[500] pb-1",
  button:
    "px-16 py-2 rounded-xl shadow-xl border-none font-[500] mx-auto block mt-8 xl:text-[1.2rem] lg:text-[1rem] md:text-[1.4rem] text-[1rem]",
  forgotButton:
    "mt-2 xl:text-[1.2rem] lg:text-[1rem] md:text-[1.4rem] text-[1rem]",
  googleButton:
    "flex items-center justify-center border-2 shadow-xl rounded-md px-2 py-1 mt-6 xl:text-[1.2rem] lg:text-[1rem] md:text-[1.4rem] text-[1rem]",
};

export const signUpFormStyle = {
  wrapper: "flex flex-col w-full h-full items-center justify-center",
  title:
    "xl:text-4xl lg:text-xl md:text-4xl text-xl text-center text-text font-[600] mb-6",
  form: "flex flex-col items-start",
  input:
    "text-text xl:text-[1.2rem] lg:text-[1rem] md:text-[1.4rem] text-[1rem] font-[400] py-1 px-4 rounded-xl outline-none outline-dotted",
  label:
    "flex flex-col text-text xl:text-[1.2rem] lg:text-[1rem] md:text-[1.4rem] text-[1rem] font-[500] pb-1 mt-4",
  button:
    "px-16 py-2 rounded-xl shadow-xl border-none font-[500] mx-auto block xs:mt-8 mt-4 xl:text-[1.2rem] lg:text-[1rem] md:text-[1.4rem] text-[1rem]",
};

export const subTitleStyle =
  "xl:text-[1.5rem] text-[1rem] text-center font-[400] -mt-8 mb-8";

export const teamCardStyle = {
  wrapper:
    "card relative mx-auto xl:w-[18rem] 3xl:w-[20rem] w-[20rem] h-[30rem] overflow-hidden rounded-xl shadow-xl",
  image: "h-full object-cover absolute",
  filter: "filter absolute w-full h-[30rem] bg-[#fcdfda88]",
  content:
    "info absolute w-full h-[10rem] bottom-0 flex flex-col items-center justify-between",
  span: "flex flex-col items-center pt-8",
  name: "text-white font-[800] text-[1.4rem]",
  job: "text-white font-[600] text-[1.2rem]",
  socialWrapper:
    "w-full flex gap-2 items-center justify-end justify-self-end py-4 pr-4",
  link: "social w-[2.5rem] h-[2.5rem] flex items-center justify-center",
  icon: "icon text-white text-[1.8rem]",
};

export const textImageStyle = {
  wrapper:
    "w-full flex 2xl:flex-row flex-col items-center justify-center 2xl:mt-36 3xl:mt-56 mt-6",
};

export const tParentStyle = {
  isHome:
    "3xl:mt-8 -mt-[1rem] w-full flex flex-col items-center overflow-hidden",
  notIsHome: "3xl:w-[80%] xl:w-[90%] w-full glass shadow-xl rounded-xl",
  isFlex: "flex flex-col items-center",
  notIsFlex: "grid grid-cols-6 gap-x-12",
  isRew: "pt-8 pb-12",
  notIsRew: "md:p-12 p-4",
};

export const userAccountImageStyle = {
  wrapper:
    "xl:col-span-1 col-span-6 flex flex-col items-center gap-y-2 xl:sticky top-36 h-fit",
  image:
    "profilecontainer w-[10rem] h-[10rem] rounded-full border-white border-2 bg-center bg-cover overflow-hidden",
  inputWrapper:
    "changeimage w-full h-full bg-[#ffffffbb] rounded-full flex items-center justify-center",
  icon: "text-[3rem] cursor-pointer",
  name: "text-text text-[1.4rem] font-[600]",
  input: "hidden",
};

export const userDeleteFormStyle = {
  form: "md:w-[50%] md:flex md:flex-col grid grid-cols-6",
  label:
    "md:col-span-2 col-span-6 flex flex-col text-text md:text-[1.2rem] text-[1rem] font-[500] xl:py-4 py-2",
};

export const userOtherStyle = {
  form: "grid grid-cols-6 gap-x-8",
  labelOne: "md:col-span-2 col-span-6",
  labelTwo: "md:col-span-1 col-span-6",
  labelThree: "md:col-span-3 col-span-6",
  span: "flex flex-row items-center gap-x-4 md:mb-2 mt-2 md:mt-0 md:col-span-4 col-span-6",
  checkbox: "w-[1rem] h-[1rem]",
};

export const userPageStyle = {
  form: "w-full grid md:grid-cols-7 xl:px-16 xl:py-6 py-2 gap-y-2",
  phone: "xl:h-[2.3rem] h-[2rem]",
  input:
    "text-text md:text-[1.2rem] text-[1rem] font-[400] py-1 px-4 mt-2 rounded-xl outline-2 outline-offset-2 outline-dotted",
  email:
    "disabled:bg-[#f0f0f0] cursor-not-allowed text-text md:text-[1.2rem] text-[1rem] font-[400] py-1 px-4 mt-2 rounded-xl outline-2 outline-offset-2 outline-dotted",
  label:
    "flex flex-col text-text md:text-[1.2rem] text-[1rem] font-[500] xl:py-4 py-2",
  oddLabel:
    "md:col-span-3 md:col-start-1 flex flex-col text-text md:text-[1.2rem] text-[1rem] font-[500] xl:py-4 py-2",
  evenLabel:
    "md:col-span-3 md:col-start-5 flex flex-col text-text md:text-[1.2rem] text-[1rem] font-[500] xl:py-4 py-2",
  button:
    "py-1 rounded-xl shadow-xl border-none text-[1.2rem] font-[500] xl:col-span-1 md:col-span-3 md:col-start-3 xl:col-start-7 xl:mx-0 xl:px-0 mx-auto px-6 py-2",
  passwordButton:
    "py-2 rounded-2xl shadow-xl border-none text-[1.2rem] font-[500] md:col-start-5 col-start-3 md:col-span-2 col-span-4 md:mt-0 mt-4",
  deleteButton:
    "py-2 rounded-2xl shadow-xl border-none text-[1.2rem] font-[500] md:self-end col-start-3 md:px-8 col-span-4 md:mt-0 mt-4",
  title: "col-span-6 xl:text-[3rem] text-[2rem] font-[600] mb-8 text-center",
  loading: "cursor-progress",
  notLoading: "cursor-pointer",
};

export const userPanelStyle = {
  container:
    "xl:col-span-5 col-span-6 rounded-2xl shadow-inner shadow-black xl:p-12 p-4",
};

export const userPasswordStyle = {
  form: "grid grid-cols-6 gap-x-8",
  label: "md:col-span-2 col-span-6",
};

export const userPhoneInputStyle = {
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

export const usersAllStyle = {
  container: "grid grid-cols-10 w-full items-center",
  headerContainer:
    "hidden md:min-h-[2rem] text-text text-[1.1rem] font-[600] pl-2 md:flex items-center gap-x-4",
  sortIcon: "text-[1.8rem] hover:text-logopink cursor-pointer",
  imageContainer: `${tableStyle} md:col-span-1 col-span-10`,
  image:
    "md:w-12 w-16 md:h-12 h-16 mx-auto object-cover rounded-full cursor-pointer",
  nameContainer: `${tableStyle} md:col-span-2 col-span-10 md:text-left text-center`,
  name: "text-text text-[1rem] hover:text-logopink cursor-pointer",
  emailContainer: `${tableStyle} md:col-span-3 col-span-10 md:text-left text-center hover:text-logopink cursor-pointer`,
  dateContainer: `${tableStyle} md:block hidden col-span-2`,
  iconContainer:
    "md:flex hidden gap-4 justify-center items-center py-2 col-span-2",
  deleteIcon:
    "delete outline-none text-text text-[2rem] hover:text-logopink cursor-pointer",
  editIcon:
    "edit outline-none text-text text-[2rem] hover:text-logopink cursor-pointer",
  hrLine: "h-[0.1rem] md:hidden col-span-10 bg-black mb-4 mt-2",
};

export const recolorStyle = {
  filter:
    "grayscale(100%) invert(62%) sepia(26%) saturate(7061%) hue-rotate(307deg) brightness(93%) contrast(93%)",
};

export const shadowStyle = {
  background:
    "linear-gradient(180deg, rgba(166, 163, 163, 0.3) 30%, rgba(255, 255, 255, 1) 100%)",
};

export const containerStyle = {
  transition: "0.5s ease-in-out",
};

export const authStyle = {
  background: "rgba(255, 255, 255, 0.2)",
  boxShadow: "rgba(0, 0, 0, 0.12)",
};

export const formStyle = {
  boxShadow: "0 5px 45px rgba(0,0,0,0.25",
  transition: "0.5s ease-in-out",
};

export const menuOffStyle = {
  transition: "0.5s ease-in-out",
  transform: "translateX(-100vw)",
  width: 0,
  height: "100vh",
};

export const menuOnStyle = {
  transition: "0.5s ease-in-out",
  transform: "translateX(0)",
  width: "100vw",
  height: "100vh",
};

export const personalMenuOffStyle = {
  transition: "0.5s ease-in-out",
  transform: "translateX(200vw)",
  width: 0,
  height: "100vh",
};

export const tooltipStyle = {
  backgroundColor: "#6554af",
  color: "#fff",
  fontWeight: 600,
};

export {
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
