const AuthButton = ({ text, btnText, setIsSignIn, isSignIn }) => {
  return (
    <div className="boxclass signup relative w-[50%] h-full flex flex-col items-center justify-center">
      <h2 className="text-white font-[500] text-[1.2rem] mb-2">{text}</h2>
      <button
        className="signupBtn bg-logopink rounded-xl shadow-sm border-none hover:bg-pinkdark text-white font-[400] text-center px-3 py-2"
        onClick={() => setIsSignIn(!isSignIn)}
      >
        {btnText}
      </button>
    </div>
  );
};

export default AuthButton;
