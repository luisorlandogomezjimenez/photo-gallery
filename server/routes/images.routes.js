import { Router } from "express";
import AWS from "aws-sdk";
import config from "../config";
import Image from "../models/image";

const router = Router();

const spacesEndpoint = new AWS.Endpoint(config.Endpoint);

const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
});

router.post("/api/images/upload", async (req, res) => {
  const { file } = req.files;

  try {
    await s3
      .putObject({
        ACL: "public-read",
        Bucket: config.BucketName,
        Body: file.data,
        Key: file.name,
      })
      .promise();

    const urlImage = `https://${config.BucketName}.${config.Endpoint}/${file.name}`;

    const image = new Image({
      url: urlImage,
      key: file.name,
      title: req.body.title,
    });

    await image.save();

    return res.json(image);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.get("/api/images", async (req, res) => {
  const images = await Image.find();
  return res.json(images);
});

router.get("/api/images/:id", async (req, res) => {
  const image = await Image.findById(req.params.id);
  return res.json(image);
});

router.delete("/api/images/:id", async (req, res) => {
  const deletedImage = await Image.findByIdAndDelete(req.params.id);
  s3.deleteObject({
    Bucket: config.BucketName,
    Key: deletedImage.key,
  }).promise();

  res.json(deletedImage);
});

export default router;
