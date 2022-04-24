import express from "express";
import c from "../controller/index.js";
import passport from "../../config/auth.js";
const router = express.Router();

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

router.get("/", (req, res) => {
  res.send(
    `<a href="${process.env.URI_APP}/api/v1/users/auth/google/">Authenticate with Google</a>`
  );
});

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get("/auth/google/callback", () => {
  try {
    passport.authenticate("google", {
      successRedirect: `${process.env.URI_APP}/api/v1/users/protected`,
      failureRedirect: `${process.env.URI_APP}/api/v1/users/auth/google/failure`,
    });
  } catch (error) {
    res.send(error);
  }
});

router.get("/protected", isLoggedIn, (req, res) => {
  res.send(`Hello ${req.user.displayName}`);
});

router.get("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.send("Goodbye!");
});

router.get("/auth/google/failure", (req, res) => {
  res.send("Failed to authenticate..");
});

router.post("/signup", c.createUser);

export default router;
