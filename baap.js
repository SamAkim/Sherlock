const Discord = require("discord.js"); //discord.js module stored within a variable.
// creating a new client
const{config}  = require("./config.json") //protecting the token.
const Client = new Discord.Client({
    intents: ["GUILDS","GUILD_MESSAGES","DIRECT_MESSAGES","GUILD_MEMBERS"],
    partials: ["CHANNEL" , "GUILD_MEMBER" , "MESSAGE" , "REACTION" ,"USER"] // partials are used to obtain correct data
});
//ready event captures the state when the bot is online
Client.on("ready", (client) =>{
    console.log(client.user.tag + " is now online !");
});
//only reply if user is not a bot and user input is Hello,Good.
//messageCreate event captures the data of event that is created/posted
Client.on("messageCreate", (message)=>{
    let input = message.content.toLowerCase();
    if(message.author.bot == false && (input == "hello" || input == "hi")){
        
        message.reply("Hi boss");
    }
    else if (message.author.bot== false && input == "shit")
    {
        message.reply("you mean your face");
    }
    else if (message.author.bot == false && input == "how are you" || input == "how are you doin")
    {
        message.reply("Im well and Good and i hope you do the same");
    }  
});
// guildMember Add caputures when the new use joined
Client.on("guildMemberAdd",(guildMember) =>{
    if(guildMember.user.bot == false)
    {
        guildMember.send("welcome to da club Homie");
    
    }

    guildMember.guild.channels.fetch("978524276397334528").then(channel => channel.send("Welcome to the server<@"+guildMember.id+">")).catch(console.error);
    guildMember.guild.channels.fetch("976087622113972238").then(channel => channel.send("Hello")).catch(console.error);
    guildMember.guild.channels.fetch("976087622113972238").then(channel => channel.send("<@"+guildMember.user.id +">" + " joined the server \n Date & time " + new Date(guildMember.joinedTimestamp))).catch(console.error);
    
    // general text channel id : '976087622113972238'
    // Welcome text channel id : '978524276397334528'
    //guildMember.guild.channels.fetch().then(channels => console.log(channels)).catch(console.error);
});


Client.login(config);