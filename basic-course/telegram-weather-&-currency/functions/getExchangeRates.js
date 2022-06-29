import axios from 'axios';

let dataMono = [];
const getDataMono = () => {
	setInterval(async () => {
		try {
			const data = await axios.get(
				'https://api.monobank.ua/bank/currency',
			);
			dataMono = data.data;
		} catch (error) {
			throw error;
		}
	}, 65000);
};

const getExchangeRates = async (currency) => {
	if (currency === 'USD') {
		const dataPrivat = await getDataPrivat();
		const codeUSD = 840;
		const message = currencyFilter(currency, codeUSD, dataPrivat);
		return message;
	} else if (currency === 'EUR') {
		const dataPrivat = await getDataPrivat();
		const codeEUR = 978;
		const message = currencyFilter(currency, codeEUR, dataPrivat);
		return message;
	}

	async function getDataPrivat() {
		try {
			const data = await axios.get(
				'https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11',
			);
			return data.data;
		} catch (error) {
			throw error;
		}
	}

	function currencyFilter(currency, code, dataPrivat) {
		const messagePrivat = dataPrivat.reduce((acc, el) => {
			if (el.ccy === currency) {
				acc += `\nPrivat:\n${Number(el.buy).toFixed(
					2,
				)} → ${currency} → ${Number(el.sale).toFixed(2)}`;
			}
			return acc;
		}, ``);
		const messageMono = dataMono.reduce((acc, el) => {
			if (el.currencyCodeA === code && el.currencyCodeB === 980) {
				acc += `\nMono:\n${Number(el.rateBuy).toFixed(
					2,
				)} → ${currency} → ${Number(el.rateSell).toFixed(2)}`;
			}
			return acc;
		}, ``);

		return `${messagePrivat}${messageMono}`;
	}
};

export { getDataMono, getExchangeRates };
