const Discord = require("discord.js"); //discord.js module stored within a variable.
// creating a new client
const{config}  = require("./config.json") //protecting the token.
const Client = new Discord.Client({
    intents: ["GUILDS","GUILD_MESSAGES","DIRECT_MESSAGES","GUILD_MEMBERS"],
    partials: ["CHANNEL" , "GUILD_MEMBER" , "MESSAGE" , "REACTION" ,"USER"] // partials are used to obtain correct data
});

const fs = require("fs");
const levelsArray=[25,50,75,100,125,150];
//return data of file any filename at all
function returnData(url,encoding){return JSON.parse(fs.readFileSync(url,encoding ));}
//write data to anyfile
function writeData(url,data){
    fs.writeFileSync(url,JSON.stringify(data))
}
//ready event captures the state when the bot is online
Client.on("ready", (client) =>{
    console.log(client.user.tag + " is now online !");
});
//only reply if user is not a bot and user input is Hello,Good.
//messageCreate event captures the data of event that is created/posted
Client.on("messageCreate", (message)=>{
    let input = message.content.toLowerCase();
   
    if(message.author.bot==false && input != "!level")
    {
        let data = returnData("./level.json","utf-8");
        //console.log(data);
        if(data.length == undefined) //if data is undefined fail safe method
        {
            console.log("Data is undefined")
            return;
        }
       // for loop for array if we found new user and add experience 1 point for each text 
        if(data.length>0)
        {
            let found = false;
            for(let i =0;i<data.length;i++)
            {
                if(message.author.id==data[i].userID)
                {
                    found = true;
                    data[i].exp++;
                    writeData("./level.json",data);
                    i=data.length;
                }
            }
            if(found == false)
            {
                const newUser = {
                    "userID" : message.author.id,
                    "exp": 1
                }
                data.push(newUser);
                writeData("./level.json",data);
            }
        }
        else if(data.length<=0)
        {
            const newUser = {
                "userID" : message.author.id,
                "exp": 1
    
            }
            data = [newUser];
    
            writeData("./level.json",data);
        }
    }
   else if(message.author.bot==false && input == "!level")
   {
       //cmd to show the level of the user
       const data = returnData("./level.json","utf-8")
       for (i = 0; i < data.length; i++){
        // if we find the user in the array of object (from the file)
        if (message.author.id == data[i].userID){
            // loop through the levelArray, array of numbers
            for (let j = 0; j < levelsArray.length; j++){
                // if user doesn't have enough experience for the next level
                if (data[i].exp < levelsArray[j]){
                    message.reply("Your level is " + ++j); // reply with user level
                    return; // return early, exit the execution of the code
                }
            }
        }
    }
   }

});
// guildMember Add caputures when the new use joined
Client.on("guildMemberAdd",(guildMember) =>{
    if(guildMember.user.bot == false)
    {
        guildMember.send("welcome to the club Homie");
    
    }

    guildMember.guild.channels.fetch("978524276397334528").then(channel => channel.send("Welcome to the server<@"+guildMember.id+">")).catch(console.error);
    //guildMember.guild.channels.fetch("976087622113972238").then(channel => channel.send("Hello")).catch(console.error);
    guildMember.guild.channels.fetch("976087622113972238").then(channel => channel.send("<@"+guildMember.user.id +">" + " joined the server \n Date & time " + new Date(guildMember.joinedTimestamp))).catch(console.error);
    
    // general text channel id : '976087622113972238'
    // Welcome text channel id : '978524276397334528'
    //guildMember.guild.channels.fetch().then(channels => console.log(channels)).catch(console.error);
});


Client.login(config);