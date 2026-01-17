import express from "express";
import passport from "passport";
import * as userController from "../controllers/users.js";

const router = express.Router();

/* ================= SIGNUP ================= */

router
  .route("/signup")
  // GET signup form
  .get(userController.renderSignupForm)
  // POST signup
  .post(userController.signup);


/* ================= LOGIN ================= */

router
  .route("/login")
  // GET login form
  .get(userController.renderLoginForm)
  // POST login
  .post(
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
      keepSessionInfo: true, // ⭐ REQUIRED for returnTo
    }),
    userController.login
  );


/* ================= LOGOUT ================= */

router
  .route("/logout")
  .get(userController.logout);

export default router;
