import express from "express";
import fileUpload from "express-fileupload";
import indexRoutes from "./routes/index.routes";
import imagesRoutes from "./routes/images.routes";
import "./database";

const app = express();

app.set("port", process.env.PORT || 4000);
app.use(
  fileUpload({
    tempFileDir: "/temp",
  })
);

app.use(indexRoutes);
app.use(imagesRoutes);

app.listen(app.get("port"));
console.log("Server on port: ", app.get("port"));
