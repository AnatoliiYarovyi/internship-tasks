const fs = require("fs/promises");
const path = require("path");
const express = require("express");

const index = express();
const { PORT = 3000 } = process.env;

index.use(express.json());

// --- save custom path ---
index.post("/:customPath", async function (req, res) {
  try {
    const customPath = req.params.customPath;
    const body = req.body;
    const data = {
      path: customPath,
      message: body,
    };

    if (await getData(customPath)) {
      return res.send({
        message: "Sorry but this path is used",
      });
    } else {
      await writeData(data);
      return res.send({
        message: "success",
        path: `localhost:${PORT}/${customPath}`,
      });
    }
  } catch (error) {
    throw error;
  }
});

// --- define custom path ---
index.get("/:customPath", async function (req, res) {
  try {
    const customPath = req.params.customPath;
    const data = await getData(customPath);

    if (data) {
      return res.send({ data: data.message });
    } else {
      return res.send({ data: `Sorry, but this path does not exist` });
    }
  } catch (error) {
    throw error;
  }
});
// --------work with files ------------
const filePath = path.join(__dirname, "db", "userPaths.json");

// -------------------------------------------------
const getAllData = async () => {
  try {
    const data = await fs
      .readFile(filePath)
      .then((data) => {
        return data.toString();
      })
      .catch((error) => error);
    return JSON.parse(data);
  } catch (error) {
    throw error;
  }
};

const writeData = async (data) => {
  try {
    const oldData = await getAllData();
    const newData = JSON.stringify(oldData.concat(data));
    await fs
      .writeFile(filePath, newData)
      .then((data) => data)
      .catch((error) => error);

    return "";
  } catch (error) {
    throw error;
  }
};

const getData = async (customPath) => {
  const allData = await getAllData();
  return allData.find((el) => el.path === customPath);
};

index.listen(PORT, () => {
  console.log(`Server srart on localhost:${PORT} ...`);
});
