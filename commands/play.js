const ytdl = require('ytdl-core');

exports.run = async (client, message, args, ops) => {
    if(!message.member.voice.channel) {
        return message.channel.send(`Please join a voice channel!`);
    }

    if(message.guild.me.voiceChannel) {
        return message.channel.send(`Bot already connected to voice!`);
    }

    if(!args[0]) {
        return message.channel.send(`Please use a proper search term or URL!`);
    }

    let validate = await ytdl.validateURL(args[0]);
    if(!validate) {
        return message.channel.send(`Sorry, please try a different URL!`);
    }

    let info = ytdl.getInfo(args[0]);
    // console.log(args[0]);
    let connection = await message.member.voice.channel.join();
    let dispatcher = await connection.play(ytdl(args[0], { 
        filter: 'audioonly',
        quality: 'highestaudio',
        highWaterMark: 1<<25
     }),{
         passes: 5,
         volume: 0.70
     }, {highWaterMark: 1});
     
    message.channel.send(`Now playing: ${info.title}`);
}