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
client.on('ready', () => {
    console.log('Bot online');
    console.log(`${client.user.username} ready for use.`);
});

const prefix = process.env.prefix;
const weatherPrefix = process.env.weatherPrefix;
const forecastPrefix = process.env.musicPrefix;
// const musicPrefix = process.env.musicPrefix; <--- add when relevant

/*
--------------------GENERAL MESSAGE RULES--------------------
                                                           */
