import "./App.css";
import Chat from "./Components/Chat";
import { Switch, Route } from "react-router-dom";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import ForgetPassword from "./Components/Login/ForgetPassword";
import Forget from "./Components/Login/Forget";
function App() {
  // useEffect(() => {
  //   co isLogin = localStorage.getItem("isLogin");
  //   isLogin = isLogin === "true";
  // }, []);

  return (
    <>
      <Switch>
        <Route exact path="/chat" component={Chat} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/forgetpassword" component={ForgetPassword} />
        <Route exact path="/reset/:token" component={Forget} />
        <Route exact path="/" component={Login} />{" "}
      </Switch>
    </>
  );
}

export default App;
