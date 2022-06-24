process.env.NTBA_FIX_319 = 1;
import TelegramBot from "node-telegram-bot-api";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const { TOKEN } = process.env;
const bot = new TelegramBot(TOKEN, { polling: true });

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const message = msg.text.toString().trim();
  const user = msg.from.username || "user";

  console.log(`${user} wrote: ${message}`);
  if (message === "photo") {
    const data = await axios.get("https://picsum.photos/200/300");
    const image = data.request.res.responseUrl;

    await bot.sendPhoto(chatId, image);
  } else {
    await bot.sendMessage(chatId, `You wrote: "${message}"`);
  }
});
