const Discord = require("discord.js");

exports.run = async (client, message, args, ops) => {
    let fetched = ops.active.get(message.guild.id);
    if(!fetched) {
        return message.channel.send(`No currently queued songs!`);
    }

    let queue = fetched.queue;
    let current = queue[0];
    let result = `__**Now playing**__\n${current.songTitle} Requested by ${current.requester}\n\n`;
    let single = queue.length === 1;

    const embed = new Discord.MessageEmbed()
        .setTitle(`Now playing: **${current.songTitle}**`)
        .setColor(0xDD2825)
        .setFooter(`Requested by ${current.requester}`, current.requesterIcon)
        .setDescription(`There ${single ? 'is' : 'are'} currently ${queue.length} song${single ? '' : 's'} in the queue.\n`)
        //.setThumbnail
        .setTimestamp()

    for(let i = 1; i < queue.length; i++) {
        embed.addField(`🤠 ${queue[i].songTitle} 🤠`, `Requested by **${queue[i].requester}**`);
    }

    message.channel.send({embed});
}