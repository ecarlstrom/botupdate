exports.run = async (client, message, args, ops) => {
    const voiceChannel = message.member.voice.channel ? message.member.voice.channel : (message.guild.voice.connection ? message.guild.voice.connection.channel : null);
    if(!voiceChannel || (!message.member.voice.channel)) {
        return message.reply(`Please join a voice channel!`);
    } 

    let fetched = ops.active.get(message.guild.id);
    let queue = fetched.queue;
    let voiceUsers = Math.floor(message.member.voice.channel.members.filter(m => 
        m.user.id !== client.user.id).size * 2 / 3);

    if(voiceUsers < 999) {
        return message.channel.send(`Skipping song!`).then(() => {
            fetched.dispatcher.end('skip');
        });
    }
};