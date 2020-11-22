const ascii = require('ascii-art');

exports.run = (client, message, args, ops) => {
    ascii.font(args.join(' '), 'Doom', function(err, rendered) {
        rendered = rendered.trimRight();

        if(err) {
            return message.channel.send(`Sorry, this cannot be formatted!`)
        }
        
        if(rendered.length > 2000) {
            return message.channel.send('Sorry, limit is 2000 characters of output!');
        }

        message.channel.send(rendered, {
            code: 'md'
        });
    });
}