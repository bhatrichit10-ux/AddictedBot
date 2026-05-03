const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data:  new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Displays the avatar of a user')
        .addUserOption(option => option.setName('target').setDescription('The user to display the avatar of')),
    async execute(interaction) {
        const target = interaction.options.getUser('target') || interaction.user;
        const avatar = target.displayAvatarURL({ dynamic: true, size : 1024 });
        interaction.reply({
            embeds: [
                new EmbedBuilder()
                .setTitle(`${target.username}'s Avatar`)
                .setImage(avatar)
                .setColor('Green')
                .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
              }),
            ],
    });
        },
    };