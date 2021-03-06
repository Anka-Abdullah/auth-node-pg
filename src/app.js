import express from "express";
import cors from "cors";
import helmet from "helmet";
import router from "./routes/routes.js";
import session from "express-session";
import passport from "passport";

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use("/api/v1/users", router);

app.get("/", (req, res) => {
    res.send('hello')
})

export default app;
