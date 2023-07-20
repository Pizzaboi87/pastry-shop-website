const SignUpForm = () => {
  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
      <h1 className="md:text-4xl text-xl text-center text-text font-[500] mb-8">
        Sign Up
      </h1>
      <form className="flex flex-col items-start">
        <label className="flex flex-col text-text md:text-[1.2rem] text-[1rem] font-[500] pb-1">
          First Name
        </label>
        <input
          type="text"
          name="firstName"
          className="text-text md:text-[1.2rem] text-[1rem] font-[400] py-1 px-4 rounded-xl outline-none  outline-dotted outline-logopink"
        />
        <label className="flex flex-col text-text md:text-[1.2rem] text-[1rem] font-[500] pb-1 mt-4">
          Last Name
        </label>
        <input
          type="text"
          name="lastName"
          className="text-text md:text-[1.2rem] text-[1rem] font-[400] py-1 px-4 rounded-xl outline-none  outline-dotted outline-logopink"
        />
        <label className="flex flex-col text-text md:text-[1.2rem] text-[1rem] font-[500] pb-1 mt-4">
          Email address
        </label>
        <input
          type="email"
          name="email"
          className="text-text md:text-[1.2rem] text-[1rem] font-[400] py-1 px-4 rounded-xl outline-none  outline-dotted outline-logopink"
        />
        <label className="flex flex-col text-text md:text-[1.2rem] text-[1rem] font-[500] pb-1 mt-4">
          Password
        </label>
        <input
          type="password"
          name="password"
          className="text-text md:text-[1.2rem] text-[1rem] font-[400] py-1 px-4 rounded-xl outline-none  outline-dotted outline-logopink"
        />
        <button
          type="submit"
          className="bg-logopink px-16 py-2 rounded-xl shadow-xl border-none hover:bg-pinkdark text-white text-[1rem] font-[500] mx-auto block mt-8"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
