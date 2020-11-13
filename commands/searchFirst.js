const search = require('yt-search');

exports.run = (client, message, args, ops) => {
    search(args.join(' '), function(err, res) {
        if(err) {
            console.log(err.stack);
            return message.channel.send(`Sorry, an error was encountered.`);
        }

        let video = res.videos[0];

        let commandFile = require(`./play.js`);
        commandFile.run(client, message, [video.url], ops);        
    })    
}