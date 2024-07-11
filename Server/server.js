const express = require("express");
const app = express();
const cors = require("cors");
const yaml = require("yamljs");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = yaml.load("api.yaml");
const PORT = 3000;
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));



//importing Routes
const wallaperRouter = require("./routes/wallpaper-routes");
const adminRouter = require('./routes/admin-routes');

// using routes
app.use("/api/", wallaperRouter);
app.use("/api/admin", adminRouter);


app.listen(PORT, (req, res) => {
  console.log(`Server is running on ${PORT}`);
});
