const Discord = require('discord.js');
const { getInfo } = require('ytdl-core');
const ytdl = require('ytdl-core');

exports.run = async (client, message, args, ops) => {
    if(!message.member.voice.channel) {
        return message.channel.send(`Please join a voice channel!`);
    }

    if(!args[0]) {
        return message.channel.send(`Please use a proper search term or URL!`);
    }

    let validate = ytdl.validateURL(args[0]);
    if(!validate) {
        let commandFile = require(`./search.js`);
        return commandFile.run(client, message, args, ops);
    }

    // set up some variables to handle data passed in
    let thumbnail;
    let info;
    let title;
    let channel;
    let seconds;
    // actual object data here
    try {
        info = await ytdl.getInfo(args[0]);
        console.log(info.videoDetails);
        title = info.videoDetails.title;
        channel = info.videoDetails.author;
        seconds = info.videoDetails.lengthSeconds;
        thumbnail = info.videoDetails.videoId;
    } catch(err) {
        console.log(err.stack || err);
    }

    let data = ops.active.get(message.guild.id) || {};
    if(!data.connection) {
        data.connection = await message.member.voice.channel.join();
    }

    if(!data.queue) {
        data.queue = [];
    }
    data.guildID = message.guild.id;

    data.queue.push({
        // id: id,
        songTitle: title,
        requester: message.member.displayName,
        requesterIcon: message.member.avatarURL,
        url: args[0],
        thumbnail: thumbnail,
        announceChannel: message.channel.id
    });
    // console.log("Info: ", info)
    if(!data.dispatcher) {
        play(client, ops, data);
    } else {
        // message.channel.send(`Added to queue: ${data.queue[0].songTitle} | Requested by ${data.queue[0].requester}`);
        const embed = new Discord.MessageEmbed()
            .setTitle(`**${title}** added to queue!`)
            .setColor(0xc10404)
            .setFooter(`Requested by ${data.queue[0].requester}`, data.queue[0].requesterIcon)
            .setImage(`https://i.ytimg.com/vi/${data.queue[0].thumbnail}/mqdefault.jpg`)
            .setTimestamp()
        message.channel.send({embed});
    }

    ops.active.set(message.guild.id, data);
//     let info = ytdl.getInfo(args[0]);
//     // console.log(args[0]);
//     let connection = await message.member.voice.channel.join();
//     let dispatcher = await connection.play(ytdl(args[0], { 
//         filter: 'audioonly',
//         quality: 'highestaudio',
//         highWaterMark: 1<<25
//      }),{
//          passes: 5,
//          volume: 0.70
//      }, {highWaterMark: 1});
     
//     message.channel.send(`Now playing: ${info.title}`);
}

async function play(client, ops, data) {
    client.channels.cache.get(data.queue[0].announceChannel).send(`Now playing: ${data.queue[0].songTitle}`);
    data.dispatcher = await data.connection.play(ytdl(data.queue[0].url, { 
        filter: 'audioonly',
        quality: 'highestaudio',
        highWaterMark: 1<<25
     }),{
         passes: 5,
         volume: 0.70
     }, {highWaterMark: 1});
    data.dispatcher.guildID = data.guildID;

    data.dispatcher.once('finish', function() {
        finish(client, ops, this);
    });
}

function finish(client, ops, dispatcher) {
    let fetched = ops.active.get(dispatcher.guildID);
    fetched.queue.shift();

    if(fetched.queue.length > 0) {
        ops.active.set(dispatcher.guildID, fetched);
        play(client, ops, fetched);
    } else{
        ops.active.delete(dispatcher.guildID);
        let vc = client.guilds.cache.get(dispatcher.guildID).me.voice.channel;
        if(vc) {
            vc.leave();
        }
    }
}