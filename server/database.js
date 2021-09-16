import mongoose from "mongoose";

(async () => {
  const db = await mongoose.connect("mongodb://localhost/galleryapp");
  console.log(db.connection.name);
})();
