import 'dotenv/config';
import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';
import { google } from 'googleapis';

import { cli, getShortPath } from './cli.js';

const {
  PORT = 5000,
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URIS,
  TOKEN,
  REFRESH_TOKEN,
  SCOPE_TOKEN,
  TOKEN_TYPE,
  ID_TOKEN,
  EXPIRY_DATE,
} = process.env;
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URIS,
);

const SCOPE = [
  'https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/drive.file',
];

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/getAuthURL', (req, res) => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPE,
  });
  console.log(authUrl);
  return res.send(authUrl);
});

app.post('/getToken', (req, res) => {
  if (req.body.code === null) {
    return res.status(400).send('Invalid Request');
  }
  oAuth2Client.getToken(req.body.code, (err, token) => {
    if (err) {
      console.error('Error retrieving access token', err);
      return res.status(400).send('Error retrieving access token');
    }
    res.send(token);
  });
});

function fileUpload(type, imageName, imagePath) {
  const token = {
    access_token: TOKEN,
    refresh_token: REFRESH_TOKEN,
    scope: SCOPE_TOKEN,
    token_type: TOKEN_TYPE,
    id_token: ID_TOKEN,
    expiry_date: +EXPIRY_DATE,
  };

  oAuth2Client.setCredentials(token);
  const drive = google.drive({ version: 'v3', auth: oAuth2Client });

  const fileMetaData = {
    name: `${imageName}`,
    parents: ['1glhfoIByic9fdeNlmjbMEczbQ_NIDHfA'],
  };

  const media = {
    mimeType: `image/${type}`,
    body: fs.createReadStream(`${imagePath}`),
  };

  drive.files.create(
    {
      resource: fileMetaData,
      media,
      fields: 'id',
    },
    (err, file) => {
      oAuth2Client.setCredentials(null);
      if (err) {
        console.log('error: ', err);
        process.exit();
      } else {
        console.log('Image uploaded successfully!!!');
        const fileId = file.data.id;
        getShortPath(fileId);
      }
    },
  );
}

cli(fileUpload);

// app.listen(PORT, () => console.log(`\nServer started ${PORT}`));
app.listen(PORT);
