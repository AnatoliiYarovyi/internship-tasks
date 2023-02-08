import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const { TOKEN_BOT, CHAT_ID } = process.env;

const botSendOTP = async (phone: string, otp: number) => {
  const TELEGRAM_URL = `https://api.telegram.org/bot${TOKEN_BOT}`;
  const chat_id = CHAT_ID;
  const text = `${phone}\nYour access code: ${otp}`;

  await axios.post(`${TELEGRAM_URL}/sendMessage`, {
    chat_id,
    text,
  });
};

export default botSendOTP;
