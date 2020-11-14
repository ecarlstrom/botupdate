const Discord = require('discord.js');

exports.run = async (client, message, args, ops) => {
    const voiceChannel = message.member.voice.channel ? message.member.voice.channel : (message.guild.voice.connection ? message.guild.voice.connection.channel : null);

    let fetched = ops.active.get(message.guild.id);
    let queue = fetched.queue;
    if(!voiceChannel) {
            return message.reply(`Please join a voice channel!`);
     }

     if(!queue) {
         return message.channel.send(`No queue located.`);
     }
    
     if(queue) {
         fetched.queue = [];
         fetched.dispatcher.end();
         const embed = new Discord.MessageEmbed()
            .setTitle(`Queue canceled!`)
            .setColor(0xfdfe03)
        message.channel.send({embed});
     }
    
}
