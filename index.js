import DiscordJS, { IntentsBitField  } from 'discord.js'
import dotenv from "dotenv"
import mongoose from 'mongoose'

import testSchema from './Tschema.js'
import { CronJob } from 'cron'
dotenv.config()

var size
 

const client = new DiscordJS.Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.DirectMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.DirectMessageTyping
    ]
})


client.on('ready', () => {
    console.log('Bot online and connected to server!')
    mongoose.connect(
        process.env.MONGO_URI, {
            keepAlive: true,
            useUnifiedTopology: true,
            useNewUrlParser: true,
        }).then(() => console.log("Connected to Mongodb"),
        setTotalNumberofUsers(),
        CheckifUsersAdded.start()
        ) 
    
})




var CheckifUsersAdded = new CronJob('*/1 * * * *', function() { 
    testSchema.count({}, function( err, CurrenNumofUsers){
        if(TotalNumberofUsers<CurrenNumofUsers){
            while(CurrenNumofUsers>TotalNumberofUsers){
                client.channels.cache.get(process.env.BOT_CHANNEL).send('A New Project has been Created');
                console.log("Bot sent message for a new Project")
                TotalNumberofUsers++; 
            }
        }
    })
}, null, true, 'America/Los_Angeles');

function setTotalNumberofUsers(){
    testSchema.count({}, function( err, CurrenNumofUsers){
    TotalNumberofUsers = CurrenNumofUsers;});
}




client.login(process.env.TOKEN)



  