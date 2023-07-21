import { createContext, useState } from "react";

export const IsRegContext = createContext();

export const IsRegContextProvider = ({ children }) => {
  const [isReg, setIsReg] = useState(false);

  return (
    <IsRegContext.Provider value={[isReg, setIsReg]}>
      {children}
    </IsRegContext.Provider>
  );
};
