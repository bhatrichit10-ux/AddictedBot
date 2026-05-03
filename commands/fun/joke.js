const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('joke')
        .setDescription('Tells a random joke')
        .addStringOption(option => option.setName('type').setDescription('The type of joke').addChoices(
            { name: 'Any', value: 'any' },
        )),
    async execute(interaction) {
        const url = 'https://official-joke-api.appspot.com/random_joke';
        const type = interaction.options.getString('type') || 'any';

        let apiUrl = url;
        if (type !== 'any') {
            apiUrl = `https://official-joke-api.appspot.com/jokes/${type}/random`;
        } else {
            apiUrl = 'https://official-joke-api.appspot.com/random_joke';
        }
        const response = await fetch(apiUrl);
        const jokeData = await response.json();
        interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle('Here\'s a joke for you!')
                    .setDescription(`${jokeData.setup}\n\n${jokeData.punchline}`)
                    .setFooter({
                        text: `Requested by ${interaction.user.tag}`,
                        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
                    })
                    .setColor('Green'),
            ],
        });
    },
};