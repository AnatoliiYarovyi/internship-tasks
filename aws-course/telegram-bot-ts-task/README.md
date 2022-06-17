# telegram-bot-task

Create a telegram bot that helps manage cryptocurrency. The bot works with an
endpoint(s) that was created in several parts

The following functions should be implemented:

- /start - returns a welcome message;
- /help - returns brief information about the bot and its list of commands;
- /listRecent - Get a small (20-50 items) list of "hype" crypto. one item should
  look something like this: `/BTC $250`, i.e. 250 - the last average price for a
  crypt, /BTC - an active command, by clicking on which the user will receive
  more detailed information about this cryptocurrency; In more detail, indicate
  the history of the average price for the last 24 hours. (output: 30 min, 1
  hour, 3 hours, 6 hours, 12 hours, 24 hours).
- /{currency_symbol} get detailed information about cryptocurrency. An inline
  button also arrives with a message about the information. - "Add/Remove
  to/from following" depending on whether there is a crypt in the following
  list;
- /addToFavourite {currency_symbol} - Adds a crypt to the "Favorites" section;
- /listFavourite - returns a list of selected crypts in the format /listRecent;
- /deleteFavourite {currency_symbol} - removes crypto from favorites.

# Technology

---

- Node.js;
- Express.js;
- DataBase (Mongo DB);
- Telegram;
- Heroku;
- Ngrok.
