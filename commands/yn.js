const Discord = require('discord.js');

exports.run = async (client, message, args, tools) => {
    // yn = yes/no poll

    // add possible role/admin verification, for now it is open to all

    if(!args[0]) {
        return message.channel.send(`Please use !yn <poll question> format.`);
    }

    const embed = new Discord.MessageEmbed()
        .setColor(0xFFFFFF)
        .setDescription(`**Poll question: ${args.join(' ')}**`)
        .setTitle(`Asked by ${message.member.displayName}`);
    
    let sent = await message.channel.send(embed);
    await sent.react('✅');
    await sent.react('⛔');

    message.delete({ timeout: 1000 });
}