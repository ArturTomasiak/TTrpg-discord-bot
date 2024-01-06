const { Client, IntentsBitField } = require('discord.js');

const client = new Client({ 
    intents: [ 
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});

client.on('ready', () => {
    client.user.setActivity({ name: "Type *help for a list of commands" })
});

const fantasynames = ["Appolyon", "Arakh", "Lathai", "Revalor", "Thommuk", "Orremi", "Nevarth", "Alrioch", "Esbern", "Harrald", "Koroko", "Alphinaud", "Alisaie", "Y'shtola",
"Vernon", "Tahal", "Cilih", "Akira", "Jashed", "Nerusel", "Zoltan", "Aarazet", "Elric", "Triss", "Milva", "Calanthe", "Emhyr", "Tissaia de Vries", "Istredd", "Thancred",
"Lyse", "Urianger", "Jerra", "Myru", "Ifrit", "Ose", "Inugami", "Izanagi", "Lilith", "Kurama Tengu"]

function rolldice(rolls, size){
    let result = ""
    for (let i = 1; i <= rolls; i++){
        result +=  (Math.floor(Math.random() * size) + 1) + " ";
    }
    return result;
}

client.on('messageCreate', (message) => {
    if (message.author.bot) { return; }

    if (message.content.toLowerCase() === '*help'){
        message.channel.send('```List of commands: \n*fantasy name - picks a random name for your character \n*roll [rolls]d[size] - for example *roll 4d6 or *roll 1d20 (20 is the max for both rolls and size)```')
    }

    if (message.content.toLowerCase().startsWith('*roll')) {
        let args = message.content.split(' ');
        if (args.length === 2) {
            let [rolls, size] = args[1].split('d').map(Number);

            if (!isNaN(rolls) && !isNaN(size) && rolls > 0 && size > 0 && rolls < 21 && size < 21) {
                let result = rolldice(rolls, size)
                message.reply(result);
            } else {
                message.reply('Invalid dice format');
            }
        } else {
            message.reply('Invalid dice format');
        }
    }

    if (message.content.toLowerCase() === '*fantasy name'){
        let randname = fantasynames[Math.floor(Math.random() * fantasynames.length)]
        message.reply(randname)
    }
})

client.login(process.env.TOKEN);
