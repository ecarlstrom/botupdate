/*
--------------------GENERAL DEPENDENCIES--------------------
                                                          */
const Discord = require('discord.js');
const config = require('dotenv').config();
const client = new Discord.Client();
const token = process.env.DISCORD_BOT_SECRET;
const server = require('./server.js');
// const moment = require('moment'); <-- see if this was used before

/*
--------------------MUSIC PLAYBACK CONFIG--------------------
                                                           */
// update this section when relevant

/*
--------------------WEATHER CONFIG--------------------
                                                    */
// const weather = require('weather-js');
const weather = require('openweather-apis');
const axios = require('axios');
weather.setLang('en');
weather.setAPPID(process.env.weatherAPIKey);
// see if there's a better weather package

/*
--------------------BOT INITIALIZATION--------------------
                                                        */
client.login(token);

client.on('ready', () => {
    console.log('Bot online!');
    console.log(`${client.user.username} ready for use.`);
});

const prefix = process.env.prefix;
const weatherPrefix = process.env.weatherPrefix;
const forecastPrefix = process.env.musicPrefix;
// const musicPrefix = process.env.musicPrefix; <--- add when relevant

/*
--------------------GENERAL MESSAGE RULES--------------------
                                                           */
// reminder: error handling

client.on('message', message => {
    // reusable rule, see if this can be extended to larger scope
    let input = message.content.split(' ').slice(1);
    let args = input.join(' ');

    if(!message.content.startsWith(prefix) || message.author.bot) {
        return;
    }
});

// message rules are stored in related blocks for clarity, rather than one large block encompassing all rules

// kippy/tama rule below
client.on('message', message => {
    if(message.content.includes('kippy') || message.author.id === process.env.kippyID) {
        message.react('🐳');
        message.react('🐋');
    }

    if(message.content.includes('tama') || message.author.id === process.env.tamaID) {
        message.react('👮');
    }
});

// 'seeusmile' rules
client.on('message', message => {
    if(message.content === (prefix + 'seeusmile')) {
        const embed = new Discord.MessageEmbed()
            .setTitle('When I see U Smile And know that is not for me, that is when i\'ll miss U the most..')
            .setColor('0xDCDCDC')
            .setImage('https://i.imgur.com/hUTCznj.png')
            .setThumbnail('https://cdn.discordapp.com/emojis/519203018302947335.png')
            .setFooter(`User with a broken heart: ${message.member.displayName}`)
            .setTimestamp()
        message.channel.send({embed});
    }

    if(message.content === (prefix + 'seeusmall')) {
        const embed = new Discord.MessageEmbed()
            .setTitle('When I see U Smile And know that is not for me, that is when i\'ll miss U the most..')
            .setColor('0xDCDCDC')
            .setThumbnail('https://i.imgur.com/hUTCznj.png')
            .setFooter(`User with a broken heart: ${message.member.displayName}`)
            .setTimestamp()
        message.channel.send({embed});
    }

    if(message.content === (prefix + 'seeuweeb')) {
        const embed = new Discord.MessageEmbed()
            .setTitle('私がUスマイルを見て、それが私には向かないことを知っているとき、それは私がUを最も恋しく思うときです。。')
            .setColor('0xDCDCDC')
            .setImage('https://i.imgur.com/hUTCznj.png')
            .setThumbnail('https://cdn.discordapp.com/emojis/519203018302947335.png')
            .setFooter(`失恋した人：${message.member.displayName}`)
            .setTimestamp()
        message.channel.send({embed});
    }
});

// bot status rules
client.on('message', message => {
    let input = message.content.split(' ').slice(1);
    let args = input.join(' ');

    if(message.content.startsWith(prefix + 'setgame')) {
        client.user.setActivity(args);
    }

    if(message.content.startsWith(prefix + 'setstatus')) {
        client.user.setStatus(args);
    }
});

// basic error handler, more detail and specific handlers later
process.on('unhandledRejection', (reason, promise) => {
    console.error('Uncaught Promise Error: ', reason.stack || reason);
});

/*
--------------------WEATHER FUNCTIONS--------------------
                                                       */
client.on('message', message => {
    if(message.content.startsWith(process.env.weatherPrefix)) {
        const args = message.content.slice(process.env.weatherPrefix.length).split(' ');
        const command = args.shift().toLowerCase();
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${args}&appid=${process.env.weatherAPIKey}`)
        .then(response => {
            let weatherData = response;
            let currentTemp = weatherData.data.main.temp;
            let maxTemp = weatherData.data.main.temp_max;
            let minTemp = weatherData.data.main.temp_min;
            let humidity = weatherData.data.main.humidity;
            let windSpeed = weatherData.data.wind.speed;
            let author = message.author.username;
            let icon = weatherData.data.weather[0].icon;
            let cityName = args;
            let country = weatherData.data.sys.country;
            let pressure = weatherData.data.main.pressure;
            let clouds = weatherData.data.weather[0].description;
            message.channel.send(weatherData);
        }).catch(err => {
            message.reply(`Please enter a valid city name!`);
        })
    }
})
