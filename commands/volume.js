exports.run = (client, message, args, ops) => {
    let fetched = ops.active.get(message.guild.id);
    if(!fetched) {
        return message.channel.send(`No music currently playing.`);
    }

    if(message.member.voice.channel !== message.guild.me.voice.channel) {
        return message.channel.send(`You must be in the same channel as the bot to do this!`);
    }

    if(isNaN(args[0]) || args[0] < 0 || args[0] > 100) {
        return message.channel.send(`Please enter a number between 0 and 100!`);
    }

    fetched.dispatcher.setVolume(args[0]/100);
    message.channel.send(`Volume set to ${args[0]}%!`);
}