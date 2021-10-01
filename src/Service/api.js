import axios from "axios";

//const Ngrokurl = " http://5915-157-32-219-166.ngrok.io"; // if want to run on ngrok..
// const url = "http://localhost:8080/"; //if want to run on localhost port
// const AuthUrl = `${Ngrokurl}/auth`;
const AuthUrl = "http://localhost:8080/auth";

export const LoginUserApi = async (data) => {
  return await axios.post(`${AuthUrl}/login`, data);
};
export const SignUpUserApi = async (data) => {
  return await axios.post(`${AuthUrl}/signup`, data);
};
