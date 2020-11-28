const Discord = require('discord.js');

exports.run = (client, message) => {
    if(message.content === (process.env.prefix + 'listnames')) {
        // this version includes the numerical ID of each custom emoji:
        // const emojiList = message.guild.emojis.map((e, x) => (x + ' = ' + e) + ' | ' + e.name).join('\n');
        const emojiList = message.guild.emojis.cache.map((e) => (e) + '   |   ' + e.name).join('\n\n');
        for(let i = 0; i < emojiList.length; i += 2000) {
          const splitList = emojiList.substring(i, Math.min(emojiList.length, i + 2000));
          const embed = new Discord.MessageEmbed()
            .setTitle(`Emojis for '${message.guild.name}': `)
            .setColor(0x003366)
            .setDescription(splitList);
          message.channel.send({embed});
      }
    }
}