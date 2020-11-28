const Discord = require('discord.js');

exports.run = (client, message) => {
    // return a list of the server's custom emojis

    if(message.content === (process.env.prefix + 'list')) {
        const emojiList = message.guild.emojis.cache.map(e => e.toString()).join('   ');
        for(let i = 0; i < emojiList.length; i += 2000) {
        const splitList = emojiList.substring(i, Math.min(emojiList.length, i + 2000));
        const embed = new Discord.MessageEmbed()
            .setTitle(`Emojis for '${message.guild.name}': `)
            .setColor(0x003366)
            .setDescription(splitList);
        message.channel.send({embed});
        }
    }
};