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
const weather = require('weather-js');
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

//'seeusmile' rules
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