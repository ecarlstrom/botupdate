exports.run = (client, message, args, ops) => {
    let fetched = ops.active.get(message.guild.id);
    if(!fetched) {
        return message.channel.send(`No music currently playing.`);
    }

    if(message.member.voice.channel !== message.guild.me.voice.channel) {
        return message.channel.send(`User must be in the same channel as the bot!`)
    }

    if(fetched.dispatcher.paused) {
        return message.channel.send(`Playback already paused!`)
    }

    fetched.dispatcher.pause();
    message.channel.send(`${fetched.queue[0].songTitle} successfully paused!`);
}