const AuthButton = ({ text, btnText, setIsReg, isReg }) => {
  return (
    <div className="boxclass signup relative lg:w-[50%] w-full lg:h-full h-[14vh] flex flex-col items-center justify-center">
      <h2 className="text-white font-[500] text-[1.2rem] mb-2">{text}</h2>
      <button
        className="signupBtn bg-logopink rounded-xl shadow-sm border-none hover:bg-pinkdark text-white font-[400] text-center px-3 py-2"
        onClick={() => setIsReg(!isReg)}
      >
        {btnText}
      </button>
    </div>
  );
};

export default AuthButton;
