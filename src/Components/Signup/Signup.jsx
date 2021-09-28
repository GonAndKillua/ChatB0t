import React, { Profiler, useState } from "react";
import { useHistory } from "react-router";
import { SignUpUserApi } from "../../Service/api";
import { GoogleLogin } from "react-google-login";
import "../Signup/signup.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IMG from "./../../images/avtar.png";
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
      <section class="h-100 bg-dark">
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
                    <div class="card-body p-md-5 text-black">
                      <h4 class="mb-5 text-uppercase">
                        Student registration form
                      </h4>

                      <div class="row">
                        <div class="col-md-6 mb-4">
                          <div class="form-outline">
                            <input
                              type="text"
                              id="form3Example1m"
                              class="form-control form-control-lg"
                              placeholder="First name"
                            />
                            {/* <label class="form-label" for="form3Example1m">
                              First name
                            </label> */}
                          </div>
                        </div>
                        <div class="col-md-6 mb-4">
                          <div class="form-outline">
                            <input
                              type="text"
                              id="form3Example1n"
                              class="form-control form-control-lg"
                              placeholder="Last name"
                            />
                            {/* <label class="form-label" for="form3Example1n">
                              Last name
                            </label> */}
                          </div>
                        </div>
                      </div>

                      <div class="form-outline mb-4">
                        <input
                          type="text"
                          id="form3Example8"
                          class="form-control form-control-lg"
                          placeholder="Email"
                        />
                        {/* <label class="form-label" for="form3Example8">
                          E-mail
                        </label> */}
                      </div>

                      <div class="row">
                        <div class="col-md-6 mb-4 pb-2">
                          <div class="form-outline">
                            <select
                              name="Gender"
                              {...register("gender", {
                                required: "Gender is required",
                              })}
                              class="form-select form-select-lg"
                              aria-label=".form-select-lg example"
                            >
                              <option value="">Gender</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Others">Others</option>
                            </select>
                            {/* <label class="form-label" for="gender"></label> */}
                            <p style={{ color: "red" }}>
                              {errors.gender?.message}
                            </p>
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
                              <option value="North Dakota">North Dakota</option>
                              <option value="Ohio">Ohio</option>
                              <option value="Oklahoma">Oklahoma</option>
                              <option value="Oregon">Oregon</option>
                              <option value="Pennsylvania">Pennsylvania</option>
                              <option value="Rhode Island">Rhode Island</option>
                              <option value="South Carolina">
                                South Carolina
                              </option>
                              <option value="South Dakota">South Dakota</option>
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
                            <p style={{ color: "red" }}>
                              {errors.state?.message}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div class="form-outline mb-4">
                        <input
                          type="text"
                          id="form3Example90"
                          class="form-control form-control-lg"
                          placeholder="School/College"
                        />
                        {/* <label class="form-label" for="form3Example90">
                          School/College
                        </label> */}
                      </div>

                      <div class="form-outline mb-4">
                        <input
                          type="password"
                          id="form3Example99"
                          class="form-control form-control-lg"
                          placeholder="Password"
                        />
                        {/* <label class="form-label" for="form3Example99">
                          Password
                        </label> */}
                      </div>

                      <div class="form-outline mb-4">
                        <input
                          type="password"
                          id="form3Example97"
                          class="form-control form-control-lg"
                          placeholder="Confirm Password"
                        />
                        {/* <label class="form-label" for="form3Example97">
                          Confirm Password
                        </label> */}
                      </div>

                      <div class="d-flex justify-content-end pt-3">
                        <button
                          type="button"
                          class="btn btn-warning btn-lg ms-2"
                        >
                          Sign Up
                        </button>
                      </div>
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
