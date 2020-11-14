/*
--------------------GENERAL DEPENDENCIES--------------------
                                                          */
const Discord = require('discord.js');
const config = require('dotenv').config();
const client = new Discord.Client();
const token = process.env.DISCORD_BOT_SECRET;
const ownerID = process.env.ownerID;
const active = new Map();
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
// keeping other dependencies for now since they might work better than weather-js for forecasts

// const weather = require('openweather-apis');
// const axios = require('axios');
// weather.setLang('en');
// weather.setAPPID(process.env.weatherAPIKey);

/*
--------------------BOT INITIALIZATION--------------------
                                                        */
client.login(token);

client.on('ready', () => {
    console.log('Bot online!');
    console.log(`${client.user.username} ready for use.`);
    client.user.setActivity(`⚠️EXTREMELY WIP VERSION⚠️`);
});

const prefix = process.env.prefix;
const weatherPrefix = process.env.weatherPrefix;
const forecastPrefix = process.env.forecastPrefix;
// const musicPrefix = process.env.musicPrefix; <--- add when relevant

/*
--------------------BASIC COMMAND HANDLER--------------------
                                                           */
client.on('message', message => {
    let args = message.content.slice(prefix.length).trim().split(' ');
    let cmd = args.shift().toLowerCase();

    if(!message.content.startsWith(prefix)) {
        return;
    }

    try {
        // options for certain commands
        let ops = {
            ownerID: ownerID,
            active: active
        }

        let commandFile = require(`./commands/${cmd}.js`);
        commandFile.run(client, message, args, ops);
    } catch(err) {
        console.log(err.stack);
    }
});

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
    let weatherMessageCaps = message.content.toUpperCase();
    let sender = message.author;
    let contents = message.content.slice(process.env.weatherPrefix.length).split(' ');
    let args = contents.slice(1);
  
    if(message.content.startsWith(weatherPrefix)) {
  
      weather.find({search: args.join(' '), degreeType: 'F'}, function(err, result) {
        if(err) {
          return message.reply(`🤠 Please input a location! 🤠`);
        }
  
        // weather-js should return an array of objects
        // current{} contains current weather data, location{} is location information
        // console.log(JSON.parse(JSON.stringify(result[0].current, null, 2)));
        if(result === undefined || result.length === 0) {
          message.channel.send(`🤠 Sorry, there are no results for your search term! 🤠`)
          return;
        } 
       
        let weatherOutput = result[0].current;
        let location = result[0].location;
        
        if(weatherOutput) {
          let temp = weatherOutput.temperature;
          // console.log(temp);
          const embed = new Discord.MessageEmbed()
            .setTitle(`Current weather conditions for ${location.name}: *__${weatherOutput.skytext}__* `)
            .setDescription(`Temperature of ${weatherOutput.temperature} degrees ${location.degreetype}, feels like ${weatherOutput.feelslike}. Humidity ${weatherOutput.humidity}%. `)
            .addField('\u200b', '\u200b')
            .addField(`Sky conditions: ${weatherOutput.skytext}`,
              `Wind at ${weatherOutput.winddisplay}.`)
              .addField('\u200b', '\u200b')
            .setFooter('🤠 !forecast currently disabled while I work on getting access to weekend data. 🤠')
            .setThumbnail(`${weatherOutput.imageUrl}`)
            .setTimestamp()
            
            // changes color scheme of sidebar based on temperature
  
            if(temp >= 80) {
              embed.setColor(0xFF6700)
            } else if(temp >= 60 && temp <= 79) {
              embed.setColor(0xADFF2F)
            } else {
              embed.setColor(0x00FFFF)
            }
  
            // displays severe weather alerts if any, otherwise gives an all-clear
            // see if this is working correctly, API may not be returning alert data
            // console.log(location);
            // console.log(location.alert);
            if(!location.alert) {
              embed.addField(`No weather alerts!`, `👍`)
              .addField('\u200b', '\u200b')
            } else {
              embed.addField(`🚨 Local weather alert:`, `${location.alert} 🚨`)
              .addField('\u200b', '\u200b')
            }
          message.channel.send({embed} || err.message);
        }
      });
    }

    if(message.content.startsWith(forecastPrefix)) {
        message.channel.send(`The !forecast command will be back soon once a better API is found.`)
    }
})
