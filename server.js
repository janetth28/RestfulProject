// Creating the server for the API calls

const express = require("express");
const bodyParser = require('body-parser')
const app = express();
const port = 3000;

//Setting the app to have request of type json and urlencoded
app.use(express.json());
app.use(bodyParser.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

//Routes to keep track of the app
require("./todoapi/routes/todoapiRoutes.js")(app);

// Make sure the application is running and on what port
app.listen(port, () => {
    console.log(`Janetth's todo List at http://localhost:${port}`);
});