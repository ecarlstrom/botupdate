exports.run = async (client, message, args, ops) => {
    let fetched = ops.active.get(message.guild.id);
    if(!fetched) {
        return message.channel.send(`No currently queued songs!`);
    }

    let queue = fetched.queue;
    let current = queue[0];
    let result = `__**Now playing**__\n${current.songTitle} Requested by ${current.requester}\n\n`;

    for(let i = 1; i < queue.length; i++) {
        result += `${i}. **${queue[i].songTitle}**\n`
    }

    message.channel.send(result);
}