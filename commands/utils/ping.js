const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!'),
    async execute(interaction, client) {
        const sent = Date.now();

await interaction.reply({ content: 'Pinging...' });

const latency = Date.now() - sent;

const embed = new EmbedBuilder()
    .setTitle('🏓 Pong!')
    .addFields(
        { name: 'API Latency', value: `${latency}ms`, inline: true },
        { name: 'WebSocket', value: `${client.ws.ping}ms`, inline: true },
    )
    .setColor(0x00ff00)
    .setTimestamp();

await interaction.editReply({ content: '', embeds: [embed] });},

};