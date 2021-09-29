import React, { useState, useContext } from "react";
import { LoginUserApi } from "../../Service/api";
import { LoginContext } from "../../Store/LoginContextProvider";
import { useHistory } from "react-router";
import classStyle from "../Login/login.module.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import { GoogleLogin } from "react-google-login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IMG from "./../../images/img1.jpg";
// import signupimg from "../img/signup.svg";

export default function Login() {
  // STATE setup for checking is login vcalid for route protection
  const [Loginvalid, setloginvalid] = useContext(LoginContext);
  const [showToast, setShowToast] = useState(false);

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
    try {
      const response = await LoginUserApi({
        email: data.email,
        password: data.password,
      });
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
      // <Delayed>

      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        history.push("/chat");
      }, 5000);
    } catch (err) {
      toast.error(err.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
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
      <section class="h-100 left">
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col">
              <div class="card card-registration my-4">
                <div class="row g-0">
                  <div
                    class={`col-xl-5 d-none d-xl-block ${classStyle["left-drawer"]}`}
                  >
                    <div className={classStyle["left-side"]}>
                      <img
                        src={IMG}
                        alt="Sample photo"
                        className={classStyle["img-fluid"]}
                      />

                      <h5>
                        Sub Heading
                        <br />
                        <br />
                        <p>
                          {" "}
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Minima aut consectetur quod! Dolores quidem sed
                          facilis voluptatum eveniet voluptate sapiente nihil,
                          quam provident consequuntur repellendus molestiae
                          perspiciatis sequi, suscipit culpa!
                        </p>
                      </h5>
                    </div>
                  </div>
                  <div class="col-xl-7">
                    <div class="card-body p-md-5 text-black">
                      <h4 class="mb-5 text-uppercase">Log In</h4>
                      <form
                        action=""
                        onSubmit={handleSubmit(onSubmit)}
                        encType="multipart/form-data"
                      >
                        <div class="form-outline">
                          <input
                            type="text"
                            id="validationCustomEmail"
                            aria-describedby="inputGroupPrepend2"
                            class="form-control form-control-lg"
                            placeholder="Email"
                            name="email"
                            {...register("email", {
                              required: "Email is required",
                              pattern: {
                                value:
                                  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                message: "Please Enter a Valid Email Address",
                              },
                            })}
                            id="validationDefaultUsername"
                          />
                          <label
                            class="form-label"
                            for="validationDefaultUsername"
                          ></label>
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

                        <div class="form-outline">
                          <input
                            type="password"
                            id="password"
                            class="form-control form-control-lg"
                            placeholder="Password"
                            {...register("password", {
                              required: "Password is required",
                              pattern: {
                                value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,

                                message: "Please enter a valid Password",
                              },
                            })}
                          />
                          <label class="form-label" for="password"></label>
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

                        <button
                          type="submit"
                          class="btn btn-primary btn-lg ms-2"
                          value="Submit"
                        >
                          Login
                        </button>
                        <p class="small fw-bold mt-2 pt-1 mb-0">
                          Don't have an account?{" "}
                          <a href="./signup" class="link-danger">
                            Register
                          </a>
                        </p>
                        <a href="./forgetpassword">Forget Password ?</a>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
