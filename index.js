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