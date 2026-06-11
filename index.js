const { Client, Events, GatewayIntentBits, Collection, MessageFlags } = require('discord.js');
require('dotenv').config();
const chalk = require('chalk');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const fs = require('fs');
const path = require('path');
const logger = require('./src/logger.js');
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);


// Command handler - Reference: https://discordjs.guide/legacy/app-creation/handling-commands
// Ref START
client.commands = new Collection();
for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Error Handling
		if ('data' in command && 'execute' in command) {client.commands.set(command.data.name, command);}
            else {
			console.warn(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}
// Ref END
client.on(Events.InteractionCreate, async (interaction) => {
	if (!interaction.isChatInputCommand()) return;
	const command = client.commands.get(interaction.commandName);
	if (!command) {
		await interaction.reply({ content: 'Unknown command.', flags: MessageFlags.Ephemeral });
		return;
	}
	try { await command.execute(interaction, client); }
    catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) { await interaction.followUp({ content: 'Error:', flags: MessageFlags.Ephemeral }); }
         else {
			await interaction.reply({ content: 'Error:', flags: MessageFlags.Ephemeral });
		}
	}
});
// New version of legacy "Ready" event
client.once(Events.ClientReady, (c) => {
    console.log(chalk.green(`Ready! Logged in as ${c.user.tag}`));
    logger.info(`Ready! Logged in as ${c.user.tag}`);
});
client.on(Events.Debug, (info) => logger.debug(info));
client.on(Events.Warn, (info) => logger.warn(info));
client.on(Events.Error, (error) => logger.error(error));

client.login(process.env.TOKEN);
module.exports = client;