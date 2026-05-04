const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kick a member from the server')
        .addUserOption(option => option.setName('target').setDescription('The member to kick').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('Reason for kicking the member').setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
    async execute(interaction) {
        const target = interaction.options.getUser('target');
        const reason = interaction.options.getString('reason') || 'No reason provided';
        const member = interaction.guild.members.cache.get(target.id);

        if (!member) {
            return interaction.reply({ content: 'Member not found.', ephemeral: true });
        };
        if (!member.kickable) {
            return interaction.reply({ content: 'I cannot kick this member. They may have a higher role than me or I may not have the necessary permissions.', ephemeral: true });
        }
        try {
            await member.kick(reason);
            return interaction.reply({ content: `Successfully kicked ${member.user.tag}.`, ephemeral: true });
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: 'An error occurred while trying to kick the member.', ephemeral: true });
        }
    },
};