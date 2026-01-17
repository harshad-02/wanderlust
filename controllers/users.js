import User from "../models/user.js";

/* ================= USER CONTROLLERS ================= */

// GET signup form
export const renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
};

// SIGNUP LOGIC
export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const newUser = new User({ username, email });
    const registeredUser = await User.register(newUser, password);

    // auto-login after signup
    req.login(registeredUser, err => {
      if (err) return next(err);
      req.flash("success", "Welcome to WanderLust!");
      res.redirect("/listings");
    });

  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/signup");
  }
};

// GET login form
export const renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

// LOGIN SUCCESS HANDLER
export const login = (req, res) => {
  const redirectUrl = req.session.returnTo || "/listings";
  console.log("Redirecting to:", redirectUrl);

  delete req.session.returnTo;

  req.flash("success", "Welcome back!");
  res.redirect(redirectUrl);
};

// LOGOUT
export const logout = (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    req.flash("success", "Logged out successfully!");
    res.redirect("/listings");
  });
};
