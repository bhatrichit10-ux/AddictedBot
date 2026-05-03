const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Displays information about the server'),
    async execute(interaction) {
        if (!interaction.inGuild()) {
         return interaction.reply('This command can only be used in a server!');
        }
        const guild = interaction.guild;
        interaction.reply({
            embeds: [
                new EmbedBuilder()
                .setTitle(`${guild.name} Information`)
                .addFields(
                    { name: 'Server Name', value: guild.name, inline: true },
                    { name: 'Server ID', value: guild.id, inline: true },
                    { name: 'Owner', value: `<@${guild.ownerId}>`, inline: true },
                    { name: 'Member Count', value: `${guild.memberCount}`, inline: true },
                    { name: 'Created At', value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:R>`, inline: true },
                    { name: 'Boost Level', value: `Level ${guild.premiumTier}`, inline: true },
                ),
            ],
        });
    },
};