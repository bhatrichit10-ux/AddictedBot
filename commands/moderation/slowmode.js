const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('slowmode')
        .setDescription('Set the slowmode for a channel')
        .addIntegerOption(option => option.setName('duration').setDescription('Duration in seconds').setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
        .addChannelOption(option => option.setName('channel').setDescription('The channel to set slowmode for').addChannelTypes(ChannelType.GuildText).setRequired(false)),
    async execute(interaction) {
        const duration = interaction.options.getInteger('duration');
        const channel = interaction.options.getChannel('channel') || interaction.channel;
        try {
            await channel.setRateLimitPerUser(duration);
            await interaction.reply({ content: `Slowmode for ${channel} has been set to ${duration} seconds.`, ephemeral: true });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'An error occurred while setting slowmode.', ephemeral: true });
            return;
        }
    },
};