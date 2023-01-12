import express from "express";
import bodyParser from 'body-parser';
import initWebRoutes from "./route/web" 
import connectionDB from "./config/connectDB"

require('dotenv').config();

let app = express();
let port = process.env.PORT || 8282;
//port === undefined => prot = 8282


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

initWebRoutes(app);

connectionDB()


app.listen(port, () => {
    console.log('Backend Nodejs is running on the port : ' + port);
});