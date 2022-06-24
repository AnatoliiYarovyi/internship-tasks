import { createInterface } from 'readline';
import {
	getSortWords,
	getSortNumberSmall,
	getSortNumberBig,
	getSortWordsSmall,
	getUniqueArr,
	trimSpaces,
} from './functions.js';

const rl = createInterface({
	input: process.stdin,
	output: process.stdout,
});

const cli = () => {
	rl.question(
		`Hi, welcome to "CLI: Interactive sort"\nIf you want to exit, type "exit" and press ENTER\nPlease enter min. 5 words and split they space and press ENTER: `,
		(answer) => {
			const arrStrings = trimSpaces(answer.split(' '));
			if (arrStrings.length < 2 && arrStrings[0] === 'exit') {
				rl.close();
			} else if (arrStrings.length < 5) {
				console.log(
					'******************\nPlease enter min. 5 words and split they space\nTry again!😊\n******************',
				);
				cli();
			} else {
				selectFilter(arrStrings);
			}
		},
	);
};

const selectFilter = (arr) => {
	rl.question(
		`*** How would you like to sort values?: ***\n1. Words by name (from A to Z).\n2. Show digits from the smallests.\n3. Show digits from the bigest.\n4. Words by quantity of leters.\n5. Only unique values.
          \nSelect (1 - 5) or "exit" and press ENTER: `,
		(answer) => {
			const value = trimSpaces(answer.split(' '));
			switch (value[0]) {
				case '1':
					console.log(getSortWords(arr));
					cli();
					break;

				case '2':
					console.log(getSortNumberSmall(arr));
					cli();
					break;

				case '3':
					console.log(getSortNumberBig(arr));
					cli();
					break;

				case '4':
					console.log(getSortWordsSmall(arr));
					cli();
					break;

				case '5':
					console.log(getUniqueArr(arr));
					cli();
					break;

				case 'exit':
					rl.close();
					break;

				default:
					console.log(
						`******************\nSorry, but there is no such command "${value[0]}"\nTry again!😉\n******************`,
					);
					selectFilter(arr);
			}
		},
	);
};

cli();
