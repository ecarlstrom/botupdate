exports.run = (client, message, args) => {
    message.channel.send('Ping?')
    .then(message => {
        message.edit(`Pong! (time elapsed: ${message.createdTimestamp - message.createdTimestamp}ms)`);
    });
};