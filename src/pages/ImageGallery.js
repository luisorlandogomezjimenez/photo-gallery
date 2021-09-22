import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const res = await axios.get("/api/images");
      setImages(res.data);
    })();
  }, []);

  if (images.length === 0) {
    return <h1 className="h4 text-center">There are no Images yet</h1>;
  }

  return (
    <div className="row">
      {images.map((image) => (
        <div
          className="col-md-4 p-1 card-image"
          key={image._id}
          onClick={() => history.push(`/images/${image._id}`)}
        >
          <img
            src={image.url}
            className="img-fluid h-100 w-100 "
            alt={image.title}
          />
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
