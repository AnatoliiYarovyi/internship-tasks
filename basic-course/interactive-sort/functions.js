const getSortWords = (arr) => {
	const arrWords = getArrWords(arr);
	return arrWords.sort();
};

const getSortNumberSmall = (arr) => {
	const arrNumbers = getArrNumbers(arr);
	return arrNumbers.sort((a, b) => a - b);
};

const getSortNumberBig = (arr) => {
	const arrNumbers = getArrNumbers(arr);
	return arrNumbers.sort((a, b) => b - a);
};

const getSortWordsSmall = (arr) => {
	const arrWords = getArrWords(arr);
	return arrWords.sort((a, b) => b.length - a.length);
};

const getUniqueArr = (arr) => {
	return [...new Set(arr)].sort();
};

const getArrWords = (arr) => {
	return arr.reduce((acc, el) => {
		if (!+el) {
			acc.push(el);
		}
		return acc;
	}, []);
};

const getArrNumbers = (arr) => {
	return arr.reduce((acc, el) => {
		const value = +el;
		if (value) {
			acc.push(value);
		}
		return acc;
	}, []);
};

const trimSpaces = (arr) => {
	return arr.reduce((acc, el) => {
		if (el !== '') {
			acc.push(el);
		}
		return acc;
	}, []);
};

export {
	trimSpaces,
	getSortWords,
	getSortNumberSmall,
	getSortNumberBig,
	getSortWordsSmall,
	getUniqueArr,
};
