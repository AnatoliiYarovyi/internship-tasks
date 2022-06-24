process.env.NTBA_FIX_319 = 1;
import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
dotenv.config();

const { TOKEN, CHAT_ID } = process.env;
const bot = new TelegramBot(TOKEN, { polling: true });

const sendMessage = async (message) => {
	try {
		await bot.sendMessage(CHAT_ID, message);
		process.exit();
	} catch (error) {
		throw error;
	}
};

const sendPhoto = async (path) => {
	try {
		await bot.sendPhoto(CHAT_ID, path);
		process.exit();
	} catch (error) {
		throw error;
	}
};

export { sendMessage, sendPhoto };
