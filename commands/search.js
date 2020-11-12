const search = require('yt-search');

exports.run = (client, message, args, ops) => {
    search(args.join(' '), function(err, res) {
        if(err) {
            return message.channel.send(`Sorry, an error was encountered.`);
        }

        let videos = res.videos.slice(0, 10);
        let total = '';

        for(let i in videos) {
            total += `**[${parseInt(i) + 1}]:** \`${videos[i].title}\`\n`;
        }

        total += `\nWhich video number?`;
        message.channel.send(total);

        const filter = m => !isNaN(m.content) && m.content < videos.length + 1 && m.content > 0;
        const collector = message.channel.createMessageCollector(filter);

        collector.videos = videos;
        collector.once('collect', function(m) {
            let commandFile = require(`./play.js`);
            commandFile.run(client, message, [this.videos[parseInt(m.content) - 1].url], ops);
        })
    })    
}