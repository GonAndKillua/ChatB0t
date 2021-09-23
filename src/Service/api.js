import axios from "axios";

// const Ngrokurl = " http://f6fa-157-32-210-6.ngrok.io"; // if want to run on ngrok..
// const url = "http://localhost:8080/"; //if want to run on localhost port
// const AuthUrl = `${url}/auth`;
const AuthUrl = "http://localhost:8080/auth";

export const LoginUserApi = async (data) => {
  return await axios.post(`${AuthUrl}/login`, data);
};
export const SignUpUserApi = async (data) => {
  return await axios.post(`${AuthUrl}/signup`, data);
};
