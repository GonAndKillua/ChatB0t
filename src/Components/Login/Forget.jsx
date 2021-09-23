import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./forget.css";
//pattern for password
// at least one number, one lowercase and one uppercase letter
// at least 8 characters
// var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
//pattern for email
//            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

export default function Forget() {
  //using UseForm for validation and form Control
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const history = useHistory(); // setting Up useHistory for redirection
  const { token } = useParams();
  console.log(token);
  // Forget Password Submit Button Handler
  const onSubmit = async (data) => {
    if (data.newPassword === data.confirmPassword) {
      // checking if new Password  equals to confirm Password
      try {
        // async request tryCatch block
        const result = await axios({
          method: "POST",
          url: `http://localhost:8080/auth/reset`,
          data: {
            password: data.newPassword,
            sentToken: token,
          },
        });

        if (!result.data.extraMessage) {
          alert("Message: " + result.data.message); // Success Message
          history.push("/"); // after success redirecting to login page
        } else {
          alert("Error: " + result.data.extraMessage);
        }
      } catch (error) {
        // ctach block for requesting backend server error
        alert("ERROR: " + error);
      }
    } else {
      // error while matching passwords

      alert("ERROR: NewPassword and Confirm password Do not Match ");
    }
  };

  //############## Forget Password Component ################
  return (
    <section class="vh-105" style={{ backgroundColor: " #b1bfd8" }}>
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12 col-md-8 col-lg-6 col-xl-5">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div
                class="card shadow-2-strong"
                style={{ borderRadius: "1rem" }}
              >
                <div class="card-body p-5 text-center">
                  <i class="fa fa-lock fa-4x"></i>
                  <h2 class="mb-5">Set a new password</h2>

                  <div class="form-outline mb-4">
                    <input
                      type="password"
                      name="newPassword"
                      placeholder="New Password"
                      {...register("newPassword", {
                        required: "Password is required",
                        pattern: {
                          value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,

                          message: "Please enter a valid Password",
                        },
                      })}
                      class="form-control form-control-lg"
                    />
                    <label class="form-label" for="typeEmailX"></label>
                    <span
                      style={{
                        color: "red",
                        paddingTop: ".5rem",
                        display: "inline-block",
                      }}
                    >
                      {" "}
                      {errors.newPassword && (
                        <i class="bi bi-exclamation-circle-fill"></i>
                      )}
                      &nbsp;
                      {errors.newPassword?.message}
                    </span>
                  </div>

                  <div class="form-outline mb-4">
                    <input
                      type="password"
                      name="confirmPassword"
                      {...register("confirmPassword", {
                        required: "Confirm Password is required",
                        pattern: {
                          value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
                          message: "Please enter a valid Password",
                        },
                      })}
                      placeholder="Confirm Password"
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
                      {errors.confirmPassword && (
                        <i class="bi bi-exclamation-circle-fill"></i>
                      )}
                      &nbsp;
                      {errors.confirmPassword?.message}
                    </span>
                  </div>
                  <h6>
                    Note: Password Letter should Contain Digits, Upper and lower
                    case letters and special characters e.g. @ ! $ #
                  </h6>
                  <hr class="my-4" />
                  <button type="submit" class="btn btn-primary mb-4">
                    Change password
                  </button>
                  <div class="d-flex justify-content-between align-items-center mb-2">
                    <a href="/">Back to Log In</a>

                    <a href="./signup">Register</a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
