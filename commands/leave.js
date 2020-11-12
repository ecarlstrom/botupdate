exports.run = (client, message, args, ops) => {
    if(!message.member.voice.channel) {
        return message.channel.send(`Please join a voice channel to use this command.`);
    }

    if(!message.guild.me.voice.channel) {
        return message.channel.send(`Bot not connected to voice!`);
    }

    if(message.guild.me.voice.channelID !== message.member.voice.channelID) {
        return message.channel.send(`User must be in the same voice channel as the bot.`);
    }

    message.guild.me.voice.channel.leave();
    message.channel.send(`Bye! 👋`);
}