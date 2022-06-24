import { program } from 'commander';

import { sendMessage, sendPhoto } from './functions.js';

program
	.command('message <message>')
	.alias('m')
	.description('Send message to telegram-bot')
	.action((message) => sendMessage(message));

program
	.command('photo <path>')
	.alias('p')
	.description('Send photo to telegram-bot')
	.action((path) => sendPhoto(path));

program.parse(process.argv);
