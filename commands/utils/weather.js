const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const weatherCodeLabels = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    56: 'Light freezing drizzle',
    57: 'Dense freezing drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    66: 'Light freezing rain',
    67: 'Heavy freezing rain',
    71: 'Slight snow fall',
    73: 'Moderate snow fall',
    75: 'Heavy snow fall',
    77: 'Snow grains',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    85: 'Slight snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with slight hail',
    99: 'Thunderstorm with heavy hail',
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('weather')
        .setDescription('Get the current weather for a specified location')
        .addStringOption(option =>
            option
                .setName('location')
                .setDescription('The location to get the weather for')
                .setRequired(true),
        ),
    async execute(interaction) {
        const location = interaction.options.getString('location');

        await interaction.deferReply();

        try {
            const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1&language=en&format=json`;
            const geoResponse = await fetch(geoUrl);

            if (!geoResponse.ok) {
                throw new Error('Geocoding request failed.');
            }

            const geoData = await geoResponse.json();
            const place = geoData.results?.[0];

            if (!place) {
                return interaction.editReply(`No results found for "${location}".`);
            }

            const forecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=auto`;
            const forecastResponse = await fetch(forecastUrl);

            if (!forecastResponse.ok) {
                throw new Error('Forecast request failed.');
            }

            const forecastData = await forecastResponse.json();
            const current = forecastData.current;
            const units = forecastData.current_units || {};
            const weatherLabel = weatherCodeLabels[current?.weather_code] || 'Unknown conditions';

            const embed = new EmbedBuilder()
                .setTitle(`Weather for ${place.name}, ${place.country}`)
                .setDescription(weatherLabel)
                .addFields(
                    {
                        name: 'Temperature',
                        value: `${current.temperature_2m}${units.temperature_2m || '°C'}`,
                        inline: true,
                    },
                    {
                        name: 'Feels Like',
                        value: `${current.apparent_temperature}${units.apparent_temperature || '°C'}`,
                        inline: true,
                    },
                    {
                        name: 'Wind',
                        value: `${current.wind_speed_10m}${units.wind_speed_10m || ' km/h'}`,
                        inline: true,
                    },
                )
                .setFooter({
                    text: `Lat ${place.latitude.toFixed(2)}, Lon ${place.longitude.toFixed(2)}`,
                })
                .setColor('Blue');

            return interaction.editReply({ embeds: [embed] });
        } catch (error) {

            console.error('Error fetching weather:', error);
            return interaction.editReply('Sorry, I could not fetch the weather right now.');
        }
    },
};