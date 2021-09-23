import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
// import "./forget.css";
//pattern for password
// at least one number, one lowercase and one uppercase letter
// at least 8 characters
// var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
//pattern for email
//            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

export default function ForgetPassword() {
  //using UseForm for validation and form Control
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const history = useHistory(); // setting Up useHistory for redirection

  // Forget Password Submit Button Handler
  const onSubmit = async (data) => {
    try {
      // async request tryCatch block
      const result = await axios({
        method: "PATCH",
        url: "http://localhost:8080/auth/forgetPassword",
        data: {
          email: data.email,
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
  };

  //############## Forget Password Component ################
  return (
    <section class="vh-100" style={{ backgroundColor: " #b1bfd8" }}>
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
                      type="text"
                      name="email"
                      placeholder="Enter Your Email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value:
                            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                          message: "Please Enter a Valid Email Address",
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
                      {errors.email && (
                        <i class="bi bi-exclamation-circle-fill"></i>
                      )}
                      &nbsp;
                      {errors.email?.message}
                    </span>
                  </div>

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
