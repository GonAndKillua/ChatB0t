import React, { Profiler, useState } from "react";
import { useHistory } from "react-router";
import { SignUpUserApi } from "../../Service/api";
import { GoogleLogin } from "react-google-login";
import "../Signup/signup.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Signup() {
  // ####### REACT-HOOK-FORM SETUP #########
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  // ######### END ###############
  const [fileState, setFileState] = useState();

  const [googleSignUP, setGoogleSignUp] = useState(true); // state setup for google form details

  const history = useHistory(); // History for redirection

  // ########## FORM SUBMIT HANDLER ################
  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("gender", data.gender);
    formData.append("photo", fileState);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("uname", data.uname);
    formData.append("phone", data.phone);
    formData.append("state", data.state);
    formData.append("city", data.city);

    SignUpUserApi(formData)
      .then((result) => {
        toast.success(result.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        history.push("/");
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
  // ########## FORM SUBMIT HANDLER END ################

  //############### GETTING DATA FROM GOOGLE  START ##################
  const googleAuth = (res) => {
    console.log(res);
    const { familyName, givenName, googleId } = res.profileObj;
    const GoogleEmail = res.profileObj.email;
    // console.log(email, familyName, givenName);

    setValue("firstName", givenName, { shouldValidate: true });
    setValue("lastName", familyName, { shouldValidate: true });
    setValue("email", GoogleEmail, { shouldValidate: true });
    setValue("password", googleId, { shouldValidate: false });

    setGoogleSignUp(!googleSignUP);
  };
  //############### GETTING DATA FROM GOOGLE END ##################
  return (
    <section class="gradient-custom">
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
      <div class="container py-5 h-100">
        <div class="row justify-content-center align-items-center h-100">
          <div class="col-12 col-lg-9 col-xl-7">
            <div
              class="card shadow-2-strong card-registration"
              style={{ borderRadius: "15px" }}
            >
              <div class="card-body p-4 p-md-5">
                <h3 class="mb-4 pb-2 pb-md-0 mb-md-5">Registration Form</h3>

                <form
                  action=""
                  onSubmit={handleSubmit(onSubmit)}
                  encType="multipart/form-data"
                >
                  <div class="row">
                    <div class="col-md-6 mb-4">
                      <div class="form-outline">
                        <input
                          placeholder="First Name"
                          type="text"
                          id="fName"
                          name="firstName"
                          {...register("firstName", {
                            required: "first Name  is required",
                            maxLength: {
                              value: 20,
                              message: "length should be less then 20",
                            },
                          })}
                          class="form-control form-control-lg"
                        />
                        <label class="form-label" for="fName"></label>
                        <span
                          style={{
                            color: "red",
                            paddingTop: ".5rem",
                            display: "inline-block",
                          }}
                        >
                          {" "}
                          {errors.firstName && (
                            <i class="bi bi-exclamation-circle-fill"></i>
                          )}
                          &nbsp;
                          {errors.firstName?.message}
                        </span>
                      </div>
                    </div>
                    <div class="col-md-6 mb-4">
                      <div class="form-outline">
                        <input
                          type="text"
                          placeholder="Last Name"
                          id="lastName"
                          name="lastName"
                          {...register("lastName", {
                            required: "last Name is required",
                            maxLength: {
                              value: 20,
                              message: "length should be less then 20",
                            },
                          })}
                          class="form-control form-control-lg"
                        />
                        <label class="form-label" for="lastName"></label>
                        <span
                          style={{
                            color: "red",
                            paddingTop: ".5rem",
                            display: "inline-block",
                          }}
                        >
                          {" "}
                          {errors.lastName && (
                            <i class="bi bi-exclamation-circle-fill"></i>
                          )}
                          &nbsp;
                          {errors.lastName?.message}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6 mb-4 d-flex align-items-center">
                      <div class=" imput-group form-outline datepicker w-100 has-validation">
                        <input
                          type="text"
                          id="validationCustomEmail"
                          aria-describedby="inputGroupPrepend2"
                          placeholder="E-mail"
                          name="email"
                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value:
                                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                              message: "Please Enter a Valid Email Address",
                            },
                          })}
                          class="form-control form-control-lg"
                          id="validationDefaultUsername"
                        />

                        <label
                          for="validationDefaultUsername"
                          class="form-label"
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
                    </div>

                    <div class="col-md-6 mb-4">
                      <div class="form-outline">
                        <select
                          name="gender"
                          placeholder="Select Gender"
                          {...register("gender", {
                            required: "Gender is required",
                          })}
                          class="form-select form-select-lg"
                          aria-label=".form-select-lg example"
                        >
                          <option value="Others">Others</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                        <label class="form-label" for="city"></label>
                        <span
                          style={{
                            color: "red",
                            paddingTop: ".5rem",
                            display: "inline-block",
                          }}
                        >
                          {" "}
                          {errors.gender && (
                            <i class="bi bi-exclamation-circle-fill"></i>
                          )}
                          &nbsp;
                          {errors.gender?.message}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6 mb-4 pb-2">
                      <div class="form-outline">
                        <select
                          name="city"
                          {...register("city", {
                            required: "City is required",
                          })}
                          class="form-select form-select-lg"
                          aria-label=".form-select-lg example"
                        >
                          <option value="Las Vegas">Las Vegas</option>
                          <option value="Los Angles">Los Angles</option>
                          <option value="New York">New York</option>
                          <option value="Wahingto D.C.">Wahingto D.C.</option>
                          <option value="New Jersy">New Jersy</option>
                          <option value="Houston">Houston</option>
                          <option value="Chicago">Chicago</option>
                          <option value="Detroit"> Detroit</option>
                          <option value="Boston">Boston</option>
                        </select>
                        <label class="form-label" for="city"></label>
                        <p style={{ color: "red" }}>{errors.city?.message}</p>
                      </div>
                    </div>

                    <div class="col-md-6 mb-4 pb-2">
                      <div class="form-outline">
                        <select
                          name="state"
                          {...register("state", {
                            required: "State is required",
                          })}
                          class="form-select form-select-lg"
                          aria-label=".form-select-lg example"
                        >
                          <option value="Nevada">Nevada</option>
                          <option value="Tennessee">Tennessee</option>
                          <option value="Maryland">Maryland</option>
                          <option value="Florida">Florida</option>
                          <option value="Arizona">Arizona</option>
                          <option value="Texas">Texas</option>
                          <option value="Illinois">Illinois</option>
                          <option value="Georgia"> Georgia</option>
                          <option value="California">California</option>
                        </select>
                        <label class="form-label" for="state"></label>
                        <span
                          style={{
                            color: "red",
                            paddingTop: ".5rem",
                            display: "inline-block",
                          }}
                        >
                          {" "}
                          {errors.city && (
                            <i class="bi bi-exclamation-circle-fill"></i>
                          )}
                          &nbsp;
                          {errors.city?.message}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    {googleSignUP && (
                      <div class="col-md-6 mb-4 pb-2">
                        <div class="form-outline">
                          <input
                            type="password"
                            placeholder="Password"
                            id="password"
                            name="password"
                            {...register("password", {
                              required: "Password is required",
                              pattern: {
                                value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,

                                message: "Please enter a valid Password",
                              },
                            })}
                            class="form-control form-control-lg"
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
                      </div>
                    )}
                    <div class="col-md-6 mb-4 pb-2">
                      <div class="form-outline">
                        <input
                          type="phone"
                          id="phone"
                          placeholder="Phone"
                          name="phone"
                          // /^\d{10}$/
                          {...register("phone", {
                            required: "Phone is required",
                            pattern: {
                              value: /^\d{10}$/,

                              message: "Please enter a valid Phone number",
                            },
                          })}
                          class="form-control form-control-lg"
                        />
                        <label class="form-label" for="phone"></label>
                        <span
                          style={{
                            color: "red",
                            paddingTop: ".5rem",
                            display: "inline-block",
                          }}
                        >
                          {" "}
                          {errors.phone && (
                            <i class="bi bi-exclamation-circle-fill"></i>
                          )}
                          &nbsp;
                          {errors.phone?.message}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6 mb-4 pb-2">
                      <div class="form-outline">
                        <input
                          type="uname"
                          id="uname"
                          placeholder="University Name"
                          name="uname"
                          {...register("uname", {
                            required: "University Name is required",
                          })}
                          class="form-control form-control-lg"
                        />
                        <label class="form-label" for="city"></label>
                        <span
                          style={{
                            color: "red",
                            paddingTop: ".5rem",
                            display: "inline-block",
                          }}
                        >
                          {" "}
                          {errors.uname && (
                            <i class="bi bi-exclamation-circle-fill"></i>
                          )}
                          &nbsp;
                          {errors.uname?.message}
                        </span>
                      </div>
                    </div>

                    <div class="col-md-6 mb-4 pb-2">
                      <div class="form-outline">
                        <input
                          type="file"
                          accept=".png .jpeg .jpg"
                          id="photo"
                          placeholder="Image"
                          name="photo"
                          onChange={(e) => {
                            setFileState(e.target.files[0]);
                          }}
                          {...register("photo", {
                            required: "Image  is required",
                          })}
                          class="form-control form-control-lg"
                        />
                        <label class="form-label" for="city"></label>
                        <span
                          style={{
                            color: "red",
                            paddingTop: ".5rem",
                            display: "inline-block",
                          }}
                        >
                          {" "}
                          {errors.uname && (
                            <i class="bi bi-exclamation-circle-fill"></i>
                          )}
                          &nbsp;
                          {errors.uname?.message}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div class="mt-4 pt-2">
                    <input
                      class="btn btn-primary btn-lg"
                      type="submit"
                      // onClick={addSignUpDetails}
                      value="Submit"
                    />
                  </div>
                  {/* googleAuthentication  Part */}
                  <GoogleLogin
                    clientId="456640558973-a9bgdeglb743b2vt31elg15vj85do09a.apps.googleusercontent.com"
                    onSuccess={googleAuth}
                    onFailure={(err) => console.log(err)}
                    cookiePolicy={"single_host_origin"}
                  >
                    <span>Sign Up with Google</span>
                  </GoogleLogin>
                  <p class="text-center text-muted mt-5 mb-0">
                    Have already an account?{" "}
                    <a href="/" class="fw-bold text-body">
                      <u>Login here</u>
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
