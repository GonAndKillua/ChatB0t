import React, { useState } from "react";

// Create a Context
export const LoginContext = React.createContext();

export default function LoginContextProvider(props) {
  //create a state
  const [Loginvalid, setloginvalid] = useState({
    isLogin: true,
    token: null,
  });

  return (
    <LoginContext.Provider value={[Loginvalid, setloginvalid]}>
      {props.children}
    </LoginContext.Provider>
  );
}
