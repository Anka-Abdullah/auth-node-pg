import express from "express";
import c from "../controller/index.js";
import passport from "../../config/auth.js";
const router = express.Router();

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

router.get('/', (req, res) => {
  res.send('<a href="http://localhost:5000/api/v1/users/auth/google/"">Authenticate with Google</a>');
})

router.get('/auth/google',
  passport.authenticate('google', { scope: [ 'email', 'profile' ] }
));

router.get( '/auth/google/callback', () => {
  try {
    passport.authenticate( 'google', {
      successRedirect: 'http://localhost:5000/api/v1/users/protected',
      failureRedirect: 'http://localhost:5000/api/v1/users/auth/google/failure'
    })
  } catch (error) {
    console.log("error : ", error);
  }
}
  
);

router.get('/protected', isLoggedIn, (req, res) => {
  // res.send(`Hello ${req.user.displayName}`);
  console.log('hello');
  res.send('HELLO');
});

router.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('Goodbye!');
});

router.get('/auth/google/failure', (req, res) => {
  res.send('Failed to authenticate..');
});

router.post("/signup", c.createUser);


export default router;
