const ascii = require('ascii-art');

exports.run = (client, message, args, ops) => {
    if(!args.join(' ')) {
        return message.reply(`🤠 Please enter some text to format! 🤠`)
    }

    if(args[0].length  === undefined) {
        return message.reply(`🤠 Please use a valid format! 🤠`)
    }

    console.log(args[0]);
    ascii.font(args.join(' '), 'Doom', function(err, rendered) {
        rendered = rendered.trimRight();

        
        if(rendered.length > 2000) {
            return message.channel.send('Sorry, limit is 2000 characters of output!');
        }

        message.channel.send(rendered, {
            code: 'md'
        });
    });
}