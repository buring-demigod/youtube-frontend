import { createContext, useContext } from "react";
const mainContext = createContext();

export const useMainContext = () => {
  const context = useContext(mainContext);
  return context;
}

export default mainContext;