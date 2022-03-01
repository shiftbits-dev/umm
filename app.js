const path = require("path");
const i18n = require("i18n");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const express = require("express");
const bodyparser = require("body-parser");
const config = require("./src/config/config");
const cookieparser = require("cookie-parser")
const routes = require("./src/routes/index");
const default_path = require("./src/routes/default");
const sequelize = require("./src/config/db");
const Utility = require("./src/utility/util");
const httpStatus = require("./src/exception/httpstatus.json");
const app = express();

const port = AppConfig.PORT;

app.use(morgan("dev"));

// setup some locales - other locales default to the first locale
i18n.configure({
    locales: "en",
    directory: __dirname + "/src/locales",
    updateFiles: false,
    objectNotation: true
});

app.use(function (req, res, next) {
    i18n.init(req, res);
    next();
});

app.use("/static", express.static(path.join(__dirname, "/public")));

//Secure App by Setting Various HTTPs Header
app.use(helmet());

//Parse Body Params and Attach them to req.body
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cookieparser());

//Cross Origin Resource Sharing
app.use(cors());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

//including all routes
app.use("/api", routes);
app.use("/", default_path);

app.use((req, res, next) => {
    const err = {
        message: "404 Not found",
        status: httpStatus.NOT_FOUND
    }
    next(err);
});

//initialize next
app.use((err, req, res, next) => {
    return Utility.response(
        res, {},
        err.resMsg,
        err.Status || httpStatus.INTERNAL_SERVER_ERROR,
        err.resCode,
    )
})

sequelize.autheticateDB();

require("./src/utility/cron");

app.listen(port, () => {
    console.log(`Successfully Connected at PORT Number : ${port}`);
})

module.exports = app;