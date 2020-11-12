const { getInfo } = require('ytdl-core');
const ytdl = require('ytdl-core');
const ownerID = process.env.ownerID;
const active = new Map();

exports.run = async (client, message, args, ops) => {
    if(!message.member.voice.channel) {
        return message.channel.send(`Please join a voice channel!`);
    }

    if(!args[0]) {
        return message.channel.send(`Please use a proper search term or URL!`);
    }

    let validate = await ytdl.validateURL(args[0]);
    if(!validate) {
        return message.channel.send(`Sorry, please try a different URL!`);
    }

    let info = await ytdl.getInfo(args[0]);

    let data = ops.active.get(message.guild.id) || {};
    if(!data.connection) {
        data.connection = await message.member.voice.channel.join();
    }

    if(!data.queue) {
        data.queue = [];
    }
    data.guildID = message.guild.id;

    data.queue.push({
        songTitle: info.title,
        requester: message.member.displayName,
        url: args[0],
        announceChannel: message.channel.id
    });

    if(!data.dispatcher) {
        play(client, ops, data);
    } else {
        message.channel.send(`Added to queue: ${info.title} | Requested by ${data.queue[0].requester}`);
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