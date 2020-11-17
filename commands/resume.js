const Discord = require('discord.js');

exports.run = (client, message, args, ops) => {
    let fetched = ops.active.get(message.guild.id);
    if(!fetched) {
        return message.channel.send(`No music currently playing.`);
    }

    if(message.member.voice.channel !== message.guild.me.voice.channel) {
        return message.channel.send(`User must be in the same channel as the bot!`)
    }

    if(!fetched.dispatcher.paused) {
        return message.channel.send(`Playback has not been paused!`)
    }

    fetched.dispatcher.resume();
    const embed = new Discord.MessageEmbed()
        .setTitle(`Resuming **${fetched.queue[0].songTitle}**!`)
        .setColor(0xfdfe03)
    return message.channel.send({embed});
}