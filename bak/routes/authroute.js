const express = require("express");
const route = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../model/database");
const { OAuth2Client } = require("google-auth-library");
const cloudinary = require("../middleware/cloudinary");
// const nodemailer = require("nodemailer");
// const sendgridTransport = require("nodemailer-sendgrid-transport");
const crypto = require("crypto");
const sgmail = require("@sendgrid/mail");
const multer = require("multer");
let path = require("path");
// **********************************
//         Image Storage Config
// **********************************
const storage = multer.diskStorage({
  filename: function (req, file, callBack) {
    callBack(
      null,
      new Date().toISOString().replace(/:/g, "-") +
        path.extname(file.originalname)
    );
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let upload = multer({ storage, fileFilter });

// **********************************
//          MAIL API KEY and SetUp
// **********************************
const API_KEY = process.env.MAIL_API_KEY;
sgmail.setApiKey(API_KEY);

// **********************************
//        OAuth client Setup
// **********************************
const client = new OAuth2Client(process.env.OAUTH_CLIENT_KEY);

// **********************************
//          Login Handler
// **********************************
route.post("/login", async (req, res) => {
  console.log("body:", req.body);
  let results;
  try {
    results = await pool.query(`SELECT * FROM regi WHERE email=$1`, [
      req.body.email,
    ]);
    // if (results.rows[0] == 1) {
    bcrypt.compare(
      req.body.password,
      results.rows[0].pass,
      async (err, result) => {
        if (!result) {
          return res.status(401).json({
            message: "Password didn't match",
          });
        }
        if (result) {
          // console.log("result=", result);

          const token = jwt.sign(
            {
              email: results.rows[0].email,
              firstname: results.rows[0].firstname,
              lastname: results.rows[0].lastname,
              uname: results.rows[0].university,
              photo: results.rows[0].photo,
            },
            "this is key", // Token secret key
            {
              expiresIn: "24h",
            }
          );

          return res.status(200).json({
            token: token,
            message: "Login Successfully",
          });
        }
      }
    );
  } catch (error) {
    res.status(401).json({ message: "Email is not Found" });
    console.log(error.message);
  }
});

// **********************************
//          SignUp Handler
// **********************************
route.post("/signup", upload.single("photo"), async (req, res, next) => {
  try {
    const result = await pool.query(`SELECT * FROM regi WHERE email=$1`, [
      req.body.email,
    ]);
    console.log(result.rows[0]);
    if (result.rows[0]) {
      bcrypt.hash(req.body.password, 10, async (err, hash) => {
        if (err) {
          // bcrypt block's error
          return res.status(500).json({
            error: err.message,
          });
        } else {
          cloudinary.uploader
            .upload(req.file.path)
            .then(async (response) => {
              const result = await pool.query(
                `INSERT INTO regi (firstname, lastname, email, gender, stat , pass, university,photo,photo_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
                [
                  req.body.firstName,
                  req.body.lastName,
                  req.body.email,
                  req.body.gender,
                  req.body.state,
                  hash,
                  req.body.uname,
                  response.secure_url,
                  response.public_id,
                ]
              );

              return res.status(200).json({
                message: "Sucessful",
              });
            })
            .catch((error) => {
              console.log(error.message);
              return res.status(401).json({
                error: error.message,
                message: "failed to upload image",
              });
            });
        }
      });
    } else {
      res.status(401).json({
        message: "Sorry Email already exists",
      });
    }
  } catch (error) {
    // try block's catch
    console.log(error);
  }
});

// **********************************
//    login with Google Handler
// **********************************

route.post("/google/login", async (req, res) => {
  // console.log(req.body);
  const { tokenId, googleId } = req.body;
  let results;
  client
    .verifyIdToken({
      idToken: tokenId,
      audience: process.env.OAUTH_CLIENT_KEY,
    })
    .then(async (response) => {
      const { email_verified, name, email } = response.payload;
      // console.log(response.payload);
      if (email_verified) {
        try {
          results = await pool.query(`SELECT * FROM regi WHERE email=$1`, [
            email,
          ]);
          console.log(results);
          bcrypt.compare(
            googleId,
            results.rows[0].pass,
            async (err, result) => {
              if (!result) {
                return res.status(401).json({
                  message: "Password didn't match",
                });
              }
              if (result) {
                // console.log("result=", result);

                const token = jwt.sign(
                  {
                    email: results.rows[0].email,
                    firstname: results.rows[0].firstname,
                    lastname: results.rows[0].lastname,
                    gender: results.rows[0].gender,
                    state: results.rows[0].stat,
                    city: results.rows[0].city,
                    uname: results.rows[0].university,
                    phone: results.rows[0].phone,
                  },
                  "this is key", // Token secret key
                  {
                    expiresIn: "24h",
                  }
                );

                return res.status(200).json({
                  token: token,
                });
              }
            }
          );
        } catch (error) {
          console.log(error.message);
        }
      }
    });
});

// **********************************
//    Forget Password Mail Handler
// **********************************
//################### Forget Password Section  Start #####################
route.patch("/forgetPassword", async (req, res) => {
  // find the email
  try {
    const email_verified = await pool.query(
      "SELECT * from regi WHERE email = $1",
      [req.body.email]
    );
    if (email_verified.rows[0].email) {
      crypto.randomBytes(32, async (err, buffer) => {
        if (err) {
          console.log(err);
        }
        const token = buffer.toString("hex");
        try {
          const result = await pool.query(
            `INSERT INTO otp(email,token,expiretime) VALUES($1,$2,$3)`,
            [email_verified.rows[0].email, token, Date.now() + 300 * 1000]
          );
          // console.log(email_verified.rows[0].email);
          // console.log(token);
          sgmail
            .send({
              from: process.env.EMAIL,
              to: email_verified.rows[0].email,
              subject: "Password Reset ",
              html: `
            <h1>Password Reset Link it expire in 5 min</h1>
            <p>This is system genetrated message do not reply</p>
            <p>Click the <a href="http://localhost:3000/reset/${token}">link</a> to get redirected to the reset page</p>
          `,
            })
            .then(() => {
              res.json({ message: "Check Your Mail.." });
            })
            .catch((error) => {
              console.log(error);
            });
        } catch (error) {
          console.log(error);
        }
      });
    }
  } catch (error) {
    // query error
    res.json({
      error: error.message,
      extraMessage: "Sorry E-mail Not Found",
    });
  }
});

// **********************************
//      Reset Password Handler
// **********************************
route.post("/reset", async (req, res) => {
  const newPassword = req.body.password;
  const sentToken = req.body.sentToken;
  try {
    const result = await pool.query(
      `SELECT * FROM OTP WHERE token = $1 AND expiretime > $2`,
      [sentToken, Date.now()]
    );
    try {
      if (result.rows[0].email) {
        bcrypt.hash(newPassword, 10, async (err, hash) => {
          if (err) {
            console.log(err);
            res.json({
              error: err,
            });
          }
          const updateResult = await pool.query(
            `UPDATE regi SET pass=$1 WHERE email = $2`,
            [hash, result.rows[0].email]
          );
          console.log(updateResult);

          res.json({
            message: "Updated Successfully",
          });
        });
      }
    } catch (error) {
      console.log("Error while checking token =>", error);
      console.log("Token has Expire");
    }
  } catch (error) {
    console.log(error);
  }
});

// **********************************
//     Edit Profile Part
// **********************************

route.patch("/editprofile", async (req, res) => {
  console.log("FirstName:", req.body.firstName);
  console.log("lastName:", req.body.lastName);
  console.log("email:", req.body.email);
  try {
    const results = await pool.query(
      "UPDATE regi SET firstname = $1, lastname = $2 WHERE email = $3",
      [req.body.firstName, req.body.lastName, req.body.email]
    );
    const token = jwt.sign(
      {
        email: results.rows[0].email,
        firstname: results.rows[0].firstname,
        lastname: results.rows[0].lastname,
        uname: results.rows[0].university,
        photo: results.rows[0].photo,
      },
      "this is key", // Token secret key
      {
        expiresIn: "24h",
      }
    );
    return res.status(200).json({
      token: token,
      message: "Update Successfully",
    });
  } catch (error) {
    res.status(401).json({
      message: "Error:" + error.message,
    });
  }
});

// **********************************
//       Exporting Routes
// **********************************
module.exports = route; // exporting route for authentication
