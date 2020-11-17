exports.run = (client, message, args) => {
    if(isNaN(args[0])) {
        return message.channel.send(`Please specify the number of messages to delete.`);
    }

    if(args[0] > 100) {
        return message.channel.send(`Sorry, message deletion limit is 100!`);
    }

    let parsed = (1 + parseInt(args[0], 10));

    // probably best to add a timeout feature to this
    message.channel.bulkDelete(parsed).then(messages => 
        message.channel.send(`🤠 Successfully removed \`${messages.size - 1}/${args[0]}\` messages! 🤠`).catch(error =>
            message.channel.send(``)));
}