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
};
