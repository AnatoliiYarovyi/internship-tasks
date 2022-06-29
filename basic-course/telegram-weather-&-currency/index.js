process.env.NTBA_FIX_319 = 1;
import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
dotenv.config();

import { getWeather } from './functions/getWeather.js';
import getWindInformation from './functions/getWindInformation.js';
import { getDataMono, getExchangeRates } from './functions/getExchangeRates.js';
getDataMono();

const { TOKEN } = process.env;
const bot = new TelegramBot(TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
	bot.sendMessage(msg.chat.id, 'Вітаю!', {
		reply_markup: {
			keyboard: [['/Погода'], ['/Курс валют']],
		},
	});
});

bot.onText(/\/Погода/, (msg) => {
	bot.sendMessage(
		msg.chat.id,
		'Оберіть інтервал часу або дізнайтесь швидкість вітру',
		{
			reply_markup: {
				keyboard: [
					['Кожні 3 години', 'Кожні 6 годин'],
					['Вітер'],
					['Попередне меню'],
				],
			},
		},
	);
});

bot.onText(/\/Курс валют/, (msg) => {
	bot.sendMessage(msg.chat.id, 'Оберіть валюту яка Вас цікавить', {
		reply_markup: {
			keyboard: [['USD', 'EUR'], ['Попередне меню']],
		},
	});
});

bot.on('message', async (msg) => {
	if (!msg.entities) {
		const chatId = msg.chat.id;

		switch (msg.text) {
			case 'Кожні 3 години':
				bot.sendMessage(chatId, await getWeather(3));
				break;

			case 'Кожні 6 годин':
				bot.sendMessage(chatId, await getWeather(6));
				break;

			case 'Вітер':
				bot.sendMessage(chatId, await getWindInformation());
				break;

			case 'USD':
				bot.sendMessage(chatId, await getExchangeRates('USD'));
				break;

			case 'EUR':
				bot.sendMessage(chatId, await getExchangeRates('EUR'));
				break;

			case 'Попередне меню':
				bot.sendMessage(msg.chat.id, 'Вітаю!', {
					reply_markup: {
						keyboard: [['/Погода'], ['/Курс валют']],
					},
				});
				break;

			default:
				console.log('Invalid subscription type');
		}
	}
});
