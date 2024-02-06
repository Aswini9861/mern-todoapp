import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const Authcontext = createContext();
const Authprovider = ({ children }) => {
  const [auth, setAuth] = useState({ user: null, token: "" });
  axios.defaults.headers.common["Authorization"] = auth?.token;

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        ...auth,
        user: parseData.user,
        token: parseData.token,
      });
    }
  }, []);

  return (
    <Authcontext.Provider value={[auth, setAuth]}>
      {children}
    </Authcontext.Provider>
  );
};
const useAuth = () => useContext(Authcontext);

export { useAuth, Authprovider };
