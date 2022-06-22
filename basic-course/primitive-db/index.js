import fs from 'fs/promises';
import path from 'path';
const __dirname = path.resolve();
import inquirer from 'inquirer';

console.log('Hi, welcome to "CLI: Primitive DB"');

const questions = [
	{
		type: 'input',
		name: 'user',
		message: 'Enter the user name. To cancel press ENTER:',
		default: '',
	},
	{
		type: 'list',
		name: 'gender',
		message: 'Choose your Gender:',
		choices: ['male', 'female'],
		when(answers) {
			return answers.user !== '';
		},
	},
	{
		type: 'input',
		name: 'age',
		message: 'Enter your age:',
		validate(value) {
			const valid = !isNaN(parseFloat(value));
			return valid || 'Please enter a number';
		},
		filter: Number,
		when(answers) {
			return answers.user !== '';
		},
	},
	{
		type: 'confirm',
		name: 'toBeDelivered',
		message: 'Would you to search values in DB?',
		default: false,
		when(answers) {
			return answers.user === '';
		},
	},
	{
		type: 'input',
		name: 'findName',
		message: 'Enter your name you wanna find in DB:',
		when(answers) {
			return answers.toBeDelivered === true;
		},
	},
];

const cli = () => {
	inquirer.prompt(questions).then((answers) => {
		if (answers.user) {
			writeData(answers);
			cli();
		} else if (answers.findName) {
			getData(answers.findName).then((data) => console.log(data));
		} else {
			return console.log('Good by!');
		}
	});
};

const filePath = path.join(__dirname, 'db', 'users.json');

const getAllData = async () => {
	try {
		const data = await fs.readFile(filePath).then((data) => {
			return data.toString();
		});
		return JSON.parse(data);
	} catch (error) {
		throw error;
	}
};

const writeData = async (data) => {
	try {
		const allData = await getAllData();
		allData.push(data);
		const updateData = JSON.stringify(allData);
		await fs.writeFile(filePath, updateData);
		return '';
	} catch (error) {
		throw error;
	}
};

const getData = async (name) => {
	const allData = await getAllData();
	return allData.find((el) => el.user === name);
};

cli();
