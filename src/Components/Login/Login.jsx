import React, { useState, useContext } from "react";
import { LoginUserApi } from "../../Service/api";
import { LoginContext } from "../../Store/LoginContextProvider";
import { useHistory } from "react-router";
import "../Login/login.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import { GoogleLogin } from "react-google-login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import signupimg from "../img/signup.svg";

export default function Login() {
  // STATE setup for checking is login vcalid for route protection
  const [Loginvalid, setloginvalid] = useContext(LoginContext);

  // REACT-HOOK-FORM SETUP
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // useHistory for redirecting
  const history = useHistory();

  // ################## FORM SUBMIT HANDLER START ############################
  const onSubmit = async (data) => {
    LoginUserApi({
      email: data.email,
      password: data.password,
    })
      .then((response) => {
        setloginvalid({
          ...Loginvalid,
          isLogin: true,
          token: response.data.token,
        });
        console.log(response.data.message);

        // Setting token in local Storage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("isLogin", true);
        // window.location.reload();
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        history.push("/chat");
      })
      .catch((error) => {
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  // ################## FORM SUBMIT HANDLER END ############################

  // ################## GOOGLE AUTH LOGIN BUTTON HANDLER START ############################
  const googleAuth = (response) => {
    axios({
      method: "post",
      url: "http://localhost:8080/auth/google/login",
      data: {
        tokenId: response.tokenId,
        // googleId,
      },
    })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };
  // ################## GOOGLE AUTH LOGIN BUTTON HANDLER END ############################

  //############## Login Component ################
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <section
        class="vh-100"
        style={{
          backgroundImage:
            "linear-gradient(to right top, #c89eb6, #c59ebf, #be9ec9, #b3a0d3, #a3a3dd, #8ea8e2, #77ade3, #5fb2e1, #50b7d4, #54bac4, #65bbb2, #7bbaa1",
        }}
      >
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                class="card shadow-2-strong"
                style={{ borderRadius: "1rem" }}
              >
                <div class="card-body p-5 text-center">
                  <h2 class="mb-5">Log In</h2>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div class="form-outline mb-4">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value:
                              /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                            message: "Please Enter a Valid Email Address",
                          },
                        })}
                        id="email"
                        class="form-control form-control-lg"
                      />
                      <label class="form-label" for="email"></label>
                      <span
                        style={{
                          color: "red",
                          paddingTop: ".5rem",
                          display: "inline-block",
                        }}
                      >
                        {" "}
                        {errors.email && (
                          <i class="bi bi-exclamation-circle-fill"></i>
                        )}
                        &nbsp;
                        {errors.email?.message}
                      </span>
                    </div>

                    <div class="form-outline mb-4">
                      <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        {...register("password", {
                          required: "Password is required",
                          pattern: {
                            value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,

                            message: "Please enter a valid Password",
                          },
                        })}
                        id="typePasswordX"
                        class="form-control form-control-lg"
                      />
                      <label class="form-label" for="typePasswordX"></label>
                      <span
                        style={{
                          color: "red",
                          paddingTop: ".5rem",
                          display: "inline-block",
                        }}
                      >
                        {" "}
                        {errors.password && (
                          <i class="bi bi-exclamation-circle-fill"></i>
                        )}
                        &nbsp;
                        {errors.password?.message}
                      </span>
                    </div>

                    <button class="btn but btn-lg btn-block" type="submit">
                      Login
                    </button>
                    <GoogleLogin
                      clientId="456640558973-a9bgdeglb743b2vt31elg15vj85do09a.apps.googleusercontent.com"
                      onSuccess={googleAuth}
                      onFailure={(err) => console.log(err)}
                      cookiePolicy={"single_host_origin"}
                    >
                      <span>Sign In with Google</span>
                    </GoogleLogin>
                  </form>
                  <p class="small fw-bold mt-2 pt-1 mb-0">
                    Don't have an account?{" "}
                    <a href="./signup" class="link-danger">
                      Register
                    </a>
                  </p>

                  <a href="./forgetpassword" class="link-primary">
                    Forget Password?
                  </a>
                  <hr class="my-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
