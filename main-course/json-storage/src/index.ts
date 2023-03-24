import fs from 'fs/promises';
import path from 'path';
import express from 'express';

const index = express();
const { PORT = 3000 } = process.env;

index.use(express.json());

// --- save custom path and data ---
index.post('/:customPath', async function (req, res) {
	try {
		const customPath: string = req.params.customPath;
		const body = req.body;
		const data = {
			path: customPath,
			message: body,
		};

		if (await getData(customPath)) {
			return res.send({
				message: 'Sorry but this path is used',
			});
		} else {
			await writeData(data);
			return res.send({
				message: 'success',
				path: `localhost:${PORT}/${customPath}`,
			});
		}
	} catch (error) {
		throw error;
	}
});

// --- search custom path and send response data ---
index.get('/:customPath', async function (req, res) {
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
const filePath = path.join(__dirname, 'db', 'userPaths.json');

const getAllData = async () => {
	try {
		const data: string = await fs.readFile(filePath).then((data) => {
			return data.toString();
		});
		return JSON.parse(data);
	} catch (error) {
		throw error;
	}
};

const writeData = async (data: { path: string; message: any }) => {
	try {
		const allData: { path: string; message: any }[] = await getAllData();
		allData.push(data);
		const updateData = JSON.stringify(allData);
		await fs.writeFile(filePath, updateData);
		return '';
	} catch (error) {
		throw error;
	}
};

const getData = async (customPath: string) => {
	const allData: { path: string; message: any }[] = await getAllData();
	return allData.find((el: { path: string }) => el.path === customPath);
};

index.listen(PORT, () => {
	console.log(`Server srart on localhost:${PORT} ...`);
});
