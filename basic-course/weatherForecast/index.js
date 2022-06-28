process.env.NTBA_FIX_319 = 1;
import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
dotenv.config();
import { getWeather } from "./functions/getWeather.js";
import getWindInformation from "./functions/getWindInformation.js";

const { TOKEN } = process.env;
const bot = new TelegramBot(TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Welcome", {
    reply_markup: {
      keyboard: [["/Weather"], ["/Coin"]],
    },
  });
});

bot.onText(/\/Weather/, (msg) => {
  bot.sendMessage(msg.chat.id, "Оберіть інтервал часу", {
    reply_markup: {
      keyboard: [
        ["Кожні 3 години", "Кожні 6 годин"],
        ["Вітер"],
        ["Попередне меню"],
      ],
    },
  });
});

bot.on("message", async (msg) => {
  console.log("msg: ", msg);
  if (!msg.entities) {
    const chatId = msg.chat.id;

    switch (msg.text) {
      case "Кожні 3 години":
        bot.sendMessage(chatId, await getWeather(3));
        break;

      case "Кожні 6 годин":
        bot.sendMessage(chatId, await getWeather(6));
        break;

      case "Вітер":
        bot.sendMessage(chatId, await getWindInformation());
        break;

      case "Попередне меню":
        bot.sendMessage(msg.chat.id, "Welcome", {
          reply_markup: {
            keyboard: [["/Weather", "/Coin"]],
          },
        });
        break;

      default:
        console.log("Invalid subscription type");
    }

    // const message = msg.text.toString().trim();

    // process.exit();
  }
});
