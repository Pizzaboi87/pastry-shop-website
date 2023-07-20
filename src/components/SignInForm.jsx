import { Icon } from "@iconify/react";

const SignInForm = () => {
  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
      <h1 className="md:text-4xl text-xl text-center text-text font-[500] mb-8">
        Sign In
      </h1>
      <form className="flex flex-col items-start">
        <label className="flex flex-col text-text md:text-[1.2rem] text-[1rem] font-[500] pb-1">
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
          Sign In
        </button>
      </form>
      <button className="mt-2">Forgot your password?</button>
      <button className="flex items-center justify-center border-2 border-logopink shadow-xl rounded-md px-2 py-1 mt-6">
        <Icon icon="devicon:google" className="mr-2" />
        Sign In with Google
      </button>
    </div>
  );
};

export default SignInForm;
