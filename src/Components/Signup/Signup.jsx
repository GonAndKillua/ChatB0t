import React, { Profiler, useState } from "react";
import { useHistory } from "react-router";
import { SignUpUserApi } from "../../Service/api";
// import { GoogleLogin } from "react-google-login";
import "../Signup/signup.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IMG from "./../../images/img1.jpg";
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

  const [googleSignUP, setGoogleSignUp] = useState(false); // state setup for google form details

  const history = useHistory(); // History for redirection

  // ########## FORM SUBMIT HANDLER ################
  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("gender", data.gender);
    formData.append("photo", data.photo[0]);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("uname", data.uname);
    formData.append("phone", data.phone);
    formData.append("state", data.state);
    formData.append("city", data.city);
    try {
      const result = await SignUpUserApi(formData);
      toast.success(result.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        history.push("/");
      }, 5000);
    } catch (error) {
      toast.error(error.response.data.message, {
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
    <>
      <section class="h-100 bg-dark left">
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
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col">
              <div class="card card-registration my-4">
                <div class="row g-0">
                  <div class="col-xl-6 d-none d-xl-block left-drawer">
                    <div className="left-side">
                      <img src={IMG} alt="Sample photo" class="img-fluid" />
                      <h4>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                      </h4>
                    </div>
                  </div>
                  <div class="col-xl-6">
                    {/* <h6>
                      We help students to make right carrer choice through our
                      guideance
                    </h6> */}
                    <div class="card-body p-md-5 text-black">
                      <h4 class="mb-5 text-uppercase">
                        Student registration form
                      </h4>
                      <form
                        action=""
                        onSubmit={handleSubmit(onSubmit)}
                        encType="multipart/form-data"
                      >
                        <div class="row">
                          <div class="col-md-6">
                            <div class="form-outline">
                              <input
                                type="text"
                                id="fName"
                                name="firstName"
                                class="form-control form-control-lg"
                                placeholder="First name"
                                {...register("firstName", {
                                  required: "first Name  is required",
                                  maxLength: {
                                    value: 20,
                                    message: "length should be less then 20",
                                  },
                                })}
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
                          <div class="col-md-6">
                            <div class="form-outline">
                              <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                class="form-control form-control-lg"
                                placeholder="Last name"
                                {...register("lastName", {
                                  required: "last Name is required",
                                  maxLength: {
                                    value: 20,
                                    message: "length should be less then 20",
                                  },
                                })}
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

                        <div class="row">
                          <div class="col-md-6 mb-4 pb-2">
                            <div class="form-outline">
                              <select
                                name="gender"
                                {...register("gender", {
                                  required: "Gender is required",
                                })}
                                class="form-select form-select-lg"
                                aria-label=".form-select-lg example"
                              >
                                <option disabled>Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Others">Others</option>
                              </select>
                              <label class="form-label" for="gender"></label>
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
                                <option disabled value="State">
                                  State
                                </option>
                                <option value="Alabama">Alabama</option>
                                <option value="Alaska">Alaska</option>
                                <option value="Arizona">Arizona</option>
                                <option value="Arkansas">Arkansas</option>
                                <option value="California">California</option>
                                <option value="Colorado">Colorado</option>
                                <option value="Connecticut">Connecticut</option>
                                <option value="Delaware">Delaware</option>
                                <option value="Florida">Florida</option>
                                <option value="Georgia">Georgia</option>
                                <option value="Hawaii">Hawaii</option>
                                <option value="Idaho">Idaho</option>
                                <option value="Illinois">Illinois</option>
                                <option value="Indiana">Indiana</option>
                                <option value="Iowa">Iowa</option>
                                <option value="Kansas">Kansas</option>
                                <option value="Kentucky">Kentucky</option>
                                <option value="Louisiana">Louisiana</option>
                                <option value="Maine">Maine</option>
                                <option value="Maryland">Maryland</option>
                                <option value="Massachusetts">
                                  Massachusetts
                                </option>
                                <option value="Michigan">Michigan</option>
                                <option value="Minnesota">Minnesota</option>
                                <option value="Mississippi">Mississippi</option>
                                <option value="Missouri">Missouri</option>
                                <option value="Montana">Montana</option>
                                <option value="Nebraska">Nebraska</option>
                                <option value="Nevada">Nevada</option>
                                <option value="New Hampshire">
                                  New Hampshire
                                </option>
                                <option value="New Jersey">New Jersey</option>
                                <option value="New Mexico">New Mexico</option>
                                <option value="New York">New York</option>
                                <option value="North Carolina">
                                  North Carolina
                                </option>
                                <option value="North Dakota">
                                  North Dakota
                                </option>
                                <option value="Ohio">Ohio</option>
                                <option value="Oklahoma">Oklahoma</option>
                                <option value="Oregon">Oregon</option>
                                <option value="Pennsylvania">
                                  Pennsylvania
                                </option>
                                <option value="Rhode Island">
                                  Rhode Island
                                </option>
                                <option value="South Carolina">
                                  South Carolina
                                </option>
                                <option value="South Dakota">
                                  South Dakota
                                </option>
                                <option value="Tennessee">Tennessee</option>
                                <option value="Texas">Texas</option>
                                <option value="Utah">Utah</option>
                                <option value="Vermont">Vermont</option>
                                <option value="Virginia">Virginia</option>
                                <option value="Washington">Washington</option>
                                <option value="West Virginia">
                                  West Virginia
                                </option>
                                <option value="Wisconsin">Wisconsin</option>
                                <option value="Wyoming">Wyoming</option>
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
                                {errors.state && (
                                  <i class="bi bi-exclamation-circle-fill"></i>
                                )}
                                &nbsp;
                                {errors.state?.message}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div class="form-outline">
                          <input
                            type="text"
                            id="school"
                            name="school"
                            class="form-control form-control-lg"
                            placeholder="School/College"
                            {...register("school", {
                              required: "School is required",
                              maxLength: {
                                value: 20,
                                message: "length should be less then 20",
                              },
                            })}
                          />
                          <label class="form-label" for="school"></label>
                          <span
                            style={{
                              color: "red",
                              paddingTop: ".5rem",
                              display: "inline-block",
                            }}
                          >
                            {" "}
                            {errors.school && (
                              <i class="bi bi-exclamation-circle-fill"></i>
                            )}
                            &nbsp;
                            {errors.school?.message}
                          </span>
                        </div>

                        <div class="form-outline">
                          <input
                            type="file"
                            accept=".png,.jpeg,.jpg"
                            id="photo"
                            name="photo"
                            class="form-control form-control-lg"
                            placeholder="Upload Image"
                            {...register("photo", {
                              required: "Photo is required",
                              maxLength: {
                                value: 20,
                                message: "length should be less then 20",
                              },
                            })}
                          />
                          <label class="form-label" for="photo"></label>
                          <span
                            style={{
                              color: "red",
                              paddingTop: ".5rem",
                              display: "inline-block",
                            }}
                          >
                            {" "}
                            {errors.photo && (
                              <i class="bi bi-exclamation-circle-fill"></i>
                            )}
                            &nbsp;
                            {errors.photo?.message}
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

                        <div class="form-outline">
                          <input
                            type="password"
                            id="confirmpassword"
                            class="form-control form-control-lg"
                            placeholder="Confirm Password"
                            {...register("confirmpassword", {
                              required: " C Password is required",
                              pattern: {
                                value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,

                                message: "Please enter a valid Password",
                              },
                            })}
                          />
                          <label
                            class="form-label"
                            for="confirmpassword"
                          ></label>
                          <span
                            style={{
                              color: "red",
                              paddingTop: ".5rem",
                              display: "inline-block",
                            }}
                          >
                            {" "}
                            {errors.confirmpassword && (
                              <i class="bi bi-exclamation-circle-fill"></i>
                            )}
                            &nbsp;
                            {errors.confirmpassword?.message}
                          </span>
                        </div>

                        <div class="d-flex justify-content-end pt-3">
                          <button
                            type="submit"
                            class="btn btn-primary btn-lg ms-2"
                            value="Submit"
                          >
                            Sign Up
                          </button>
                        </div>
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
