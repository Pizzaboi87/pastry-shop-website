const phoneInputStyle = {
  width: "100%",
  height: "3rem",
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
  height: "2.3rem",
  fontSize: "1rem",
  fontWeight: "400",
  borderRadius: "10px",
  outline: "none",
  border: "none",
  padding: "0.5rem 4rem",
  marginTop: "0.5rem",
  color: "#2f2f2f",
  backgroundColor: "#fff",
  outlineStyle: "dotted",
  outlineOffset: "2px",
  outlineWidth: "2px",
  outlineColor: "#e45a84",
};

const stampStyle = {
  background: "#e45a84 radial-gradient(#fff 0, #fff 7px, transparent 7px)",
  backgroundSize: "20px 20px",
  backgroundPosition: "-10px",
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

const glassStyle = `bg-[rgba(255, 255, 255, 0.2)] rounded-2xl boxShadow-[0 4px 30px rgba(0, 0, 0, 0.1)] backdrop-blur-sm border-1 border-solid border-[rgba(255, 255, 255, 0.3)]`;

const blogNewFormStyle = {
  label:
    "flex flex-col text-text xl:text-[1.2rem] lg:text-[1rem] md:text-[1.4rem] text-[1rem] font-[500] gap-y-2",
  input:
    "text-text xl:text-[1.2rem] lg:text-[1rem] md:text-[1.4rem] text-[1rem] font-[400] py-1 px-4 rounded-xl outline-none outline-dotted outline-purple",
  button:
    "col-start-4 py-2 bg-purple hover:bg-yellowdark hover:text-text rounded-xl shadow-xl border-none text-white font-[500] xl:text-[1.2rem] lg:text-[1rem] md:text-[1.4rem] text-[1rem]",
};

const tableStyle = "text-text text-[1rem] font-[500] pl-2 py-2";

const awningStyle = {
  wrapper: "piece w-[80px] h-full rounded-b-full shadow-xl",
  shadow: "w-full h-full rounded-b-full",
};

const blogCommentStyle = {
  input:
    "w-full text-text xl:text-[1.2rem] lg:text-[1rem] md:text-[1.4rem] text-[1rem] font-[400] py-1 px-3 rounded-xl outline-none outline-dotted outline-logopink",
  textarea:
    "bg-white rounded-2xl shadow-xl p-6 w-full text-text xl:text-[1.2rem] lg:text-[1rem] md:text-[1.4rem] text-[1rem] font-[400] outline-none outline-dotted outline-logopink mb-4",
  label:
    "w-[30%] flex flex-col text-text xl:text-[1.2rem] lg:text-[1rem] md:text-[1.4rem] text-[1rem] font-[500] pb-1",
  button:
    "bg-logopink px-16 py-2 rounded-xl shadow-xl border-none hover:bg-pinkdark text-white font-[500] block xl:text-[1.2rem] lg:text-[1rem] md:text-[1.4rem] text-[1rem]",
};

const courseFormStyle = {
  input:
    "text-text md:text-[1.2rem] text-[1rem] font-[400] py-2 px-4 rounded-xl outline-2 outline-offset-2 outline-dotted outline-text",
  label: "flex flex-col text-text md:text-[1.2rem] text-[1rem] font-[500] p-4",
  button:
    "bg-logopink px-16 py-2 rounded-xl shadow-xl border-none hover:bg-pinkdark text-white text-[1rem] font-[500] mx-auto block",
};

const postcardStyle = {
  stampImage:
    "absolute lg:border-[0.3125rem] md:border-[0.2rem] border-[0.15rem] border-logopink lg:top-2 md:top-[0.75rem] top-[0.5rem] lg:left-2 left-[0.5rem] lg:w-[11.5rem] md:w-[6.5rem] w-[5.25rem] lg:h-[9rem] h-[4rem] bg-stamp bg-cover",
  message:
    "font-letter text-text xl:text-[2.2rem] sm:text-[1.3rem] text-[1rem]",
  addressWrapper: "sm:w-[70%] ms:w-[45%] w-[60%] border-b-4 border-logopink",
  address:
    "font-letter text-text xl:text-[2.7rem] sm:text-[1.8rem] text-[1.4rem] ml-8",
};

const signInFormStyle = {
  input:
    "text-text xl:text-[1.2rem] lg:text-[1rem] md:text-[1.4rem] text-[1rem] font-[400] py-1 px-4 rounded-xl outline-none outline-dotted outline-logopink",
  label:
    "flex flex-col text-text xl:text-[1.2rem] lg:text-[1rem] md:text-[1.4rem] text-[1rem] font-[500] pb-1",
  button:
    "bg-logopink px-16 py-2 rounded-xl shadow-xl border-none hover:bg-pinkdark text-white font-[500] mx-auto block mt-8 xl:text-[1.2rem] lg:text-[1rem] md:text-[1.4rem] text-[1rem]",
  forgotButton:
    "flex items-center justify-center border-2 border-logopink shadow-xl rounded-md px-2 py-1 mt-6 xl:text-[1.2rem] lg:text-[1rem] md:text-[1.4rem] text-[1rem]",
};

const signUpFormStyle = {
  input:
    "text-text xl:text-[1.2rem] lg:text-[1rem] md:text-[1.4rem] text-[1rem] font-[400] py-1 px-4 rounded-xl outline-none outline-dotted outline-logopink",
  label:
    "flex flex-col text-text xl:text-[1.2rem] lg:text-[1rem] md:text-[1.4rem] text-[1rem] font-[500] pb-1 mt-4",
  button:
    "bg-logopink px-16 py-2 rounded-xl shadow-xl border-none hover:bg-pinkdark text-white font-[500] mx-auto block xs:mt-8 mt-4 xl:text-[1.2rem] lg:text-[1rem] md:text-[1.4rem] text-[1rem]",
};

const adminPageStyle = {
  wrapper: "w-full h-full flex flex-col items-center p-8",
  title: "text-text text-[1.5rem] font-[600] mb-8",
};

const adminLoginStyle = {
  label:
    "flex flex-col text-text xl:text-[1.2rem] lg:text-[1rem] md:text-[1.4rem] text-[1rem] font-[500] gap-y-2",
  input:
    "text-text xl:text-[1.2rem] lg:text-[1rem] md:text-[1.4rem] text-[1rem] font-[400] py-1 px-4 rounded-xl outline-none outline-dotted outline-purple",
  button:
    "col-start-4 py-2 bg-purple hover:bg-yellowdark hover:text-text rounded-xl shadow-xl border-none text-white font-[500] xl:text-[1.2rem] lg:text-[1rem] md:text-[1.4rem] text-[1rem]",
};

const userPageStyle = {
  input:
    "text-text md:text-[1.2rem] text-[1rem] font-[400] py-1 px-4 mt-2 rounded-xl outline-2 outline-offset-2 outline-dotted outline-logopink",
  label: "flex flex-col text-text md:text-[1.2rem] text-[1rem] font-[500] py-4",
  button:
    "bg-logopink py-1 rounded-xl shadow-xl border-none hover:bg-pinkdark text-white text-[1.2rem] font-[500] col-span-1 col-start-7",
  passwordButton:
    "bg-logopink py-2 rounded-2xl shadow-xl border-none hover:bg-pinkdark text-white text-[1.2rem] font-[500] col-start-6",

  title:
    "col-span-6 text-brown xl:text-[3rem] text-[2rem] font-[600] mb-8 text-center",
};

const tooltipStyle = {
  backgroundColor: "#6554af",
  color: "#fff",
  fontWeight: 600,
};

export {
  phoneInputStyle,
  stampStyle,
  recolorStyle,
  shadowStyle,
  authStyle,
  formStyle,
  containerStyle,
  menuOffStyle,
  menuOnStyle,
  glassStyle,
  blogNewFormStyle,
  tableStyle,
  awningStyle,
  blogCommentStyle,
  courseFormStyle,
  postcardStyle,
  signInFormStyle,
  signUpFormStyle,
  adminPageStyle,
  tooltipStyle,
  adminLoginStyle,
  userPageStyle,
  userPhoneInputStyle,
};
