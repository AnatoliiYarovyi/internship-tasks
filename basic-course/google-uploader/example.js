import express from "express";
const app = express();
import bodyParser from "body-parser";
import cors from "cors";
import fs from "fs";
import { google } from "googleapis";
import formidable from "formidable";

import credentials from "./credentials.json" assert { type: "json" };

const { client_id, client_secret, redirect_uris } = credentials.web;
const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);

const SCOPE = [
  "https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/drive.file",
];

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("API Running"));

app.get("/getAuthURL", (req, res) => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPE,
  });
  console.log(authUrl);
  return res.send(authUrl);
});

app.post("/getToken", (req, res) => {
  if (req.body.code === null) {
    return res.status(400).send("Invalid Request");
  }
  oAuth2Client.getToken(req.body.code, (err, token) => {
    if (err) {
      console.error("Error retrieving access token", err);
      return res.status(400).send("Error retrieving access token");
    }
    res.send(token);
  });
});

app.post("/getUserInfo", (req, res) => {
  if (req.body.token === null) {
    return res.status(400).send("Token not found");
  }
  oAuth2Client.setCredentials(req.body.token);
  const oauth2 = google.oauth2({
    version: "v2",
    auth: oAuth2Client,
  });

  oauth2.userinfo.get((err, response) => {
    if (err) {
      res.status(400).send(err);
    }
    console.log(response.data);
    res.send(response.data);
  });
});

app.post("/readDrive", (req, res) => {
  if (req.body.token === null) {
    return res.status(400).send("Token not found");
  }
  oAuth2Client.setCredentials(req.body.token);
  const drive = google.drive({
    version: "v3",
    auth: oAuth2Client,
  });

  drive.files.list(
    {
      pageSize: 10,
    },
    (err, response) => {
      if (err) {
        console.log("The API returned an error: " + err);
        return res.status(400).send(err);
      }
      const files = response.data.files;
      if (files.length) {
        console.log("Files: ");
        files.map((file) => {
          console.log(`${file.name} (${file.id})`);
        });
      } else {
        console.log("Not files found.");
      }
      res.send(files);
    }
  );
});

app.post("/fileUpload", (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).send(err);
    }
    const token = JSON.parse(fields.token);

    if (token === null) {
      res.status(400).send("Token not found");
    }
    oAuth2Client.setCredentials(token);
    // console.log("files.file: ", files.file);

    const drive = google.drive({ version: "v3", auth: oAuth2Client });
    const fileMetadata = {
      // name: files.file.originalFilename,
      name: "wood.jpg",
      parents: ["1glhfoIByic9fdeNlmjbMEczbQ_NIDHfA"],
    };
    const media = {
      mimeTipe: files.file.mimetype,
      body: fs.createReadStream(files.file.filepath),
    };
    drive.files.create(
      {
        resource: fileMetadata,
        media,
        fields: "id",
      },
      (err, file) => {
        oAuth2Client.setCredentials(null);
        if (err) {
          console.log("error: ", err);
          res.status(400).send(err);
        } else {
          res.send("Successful");
        }
      }
    );
  });
});

const { PORT = 5000 } = process.env;
app.listen(PORT, () => console.log(`Server started ${PORT}`));
