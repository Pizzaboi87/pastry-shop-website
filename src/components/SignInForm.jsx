import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

const SignInForm = () => {
  return (
    <motion.div
      initial={{ opacity: 0, maxHeight: 0 }}
      animate={{ opacity: 1, maxHeight: "75vh" }}
      exit={{ opacity: 0, maxHeight: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="flex flex-col w-full h-full items-center justify-center"
    >
      <h1 className="xl:text-4xl lg:text-xl md:text-4xl text-xl text-center text-text font-[600] mb-6">
        Sign In
      </h1>
      <form className="flex flex-col items-start">
        <label className="flex flex-col text-text xl:text-[1.2rem] lg:text-[1rem] md:text-[1.4rem] text-[1rem] font-[500] pb-1">
          Email address
        </label>
        <input
          type="email"
          name="email"
          className="text-text xl:text-[1.2rem] lg:text-[1rem] md:text-[1.4rem] text-[1rem] font-[400] py-1 px-4 rounded-xl outline-none  outline-dotted outline-logopink"
        />
        <label className="flex flex-col text-text xl:text-[1.2rem] lg:text-[1rem] md:text-[1.4rem] text-[1rem] font-[500] pb-1 mt-4">
          Password
        </label>
        <input
          type="password"
          name="password"
          className="text-text xl:text-[1.2rem] lg:text-[1rem] md:text-[1.4rem] text-[1rem] font-[400] py-1 px-4 rounded-xl outline-none  outline-dotted outline-logopink"
        />
        <button
          type="submit"
          className="bg-logopink px-16 py-2 rounded-xl shadow-xl border-none hover:bg-pinkdark text-white font-[500] mx-auto block mt-8 xl:text-[1.2rem] lg:text-[1rem] md:text-[1.4rem] text-[1rem]"
        >
          Sign In
        </button>
      </form>
      <button className="mt-2 xl:text-[1.2rem] lg:text-[1rem] md:text-[1.4rem] text-[1rem]">
        Forgot your password?
      </button>
      <button className="flex items-center justify-center border-2 border-logopink shadow-xl rounded-md px-2 py-1 mt-6 xl:text-[1.2rem] lg:text-[1rem] md:text-[1.4rem] text-[1rem]">
        <Icon icon="devicon:google" className="mr-2" />
        Sign In with Google
      </button>
    </motion.div>
  );
};

export default SignInForm;
