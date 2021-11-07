const { Client, Intents } = require("discord.js");
const { sendMessageInterval } = require("./commands/sendMessageInterval");
const { botClearMessages } = require("./commands/botClearMessages");
const { getBrazilDate } = require("./utils/common/getBrazilDate");
require("dotenv").config();

console.log("Join index");

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MEMBERS,
  ],
  partials: ["REACTION", "MESSAGE", "CHANNEL", "GUILD_MEMBER", "USER"],
});

client.on("ready", () => {
  console.log(`O Bot ${client.user.tag} foi iniciado com sucesso!`);

  //Get guild information
  const guild = client.guilds.cache.get(`${process.env.GUILD_ID}`);

  //Get channelGeneral byID
  const channel = guild.channels.cache.get(
    `${process.env.CHANNEL_NOTIFICACOES}`
  );

  //Get voiceChannel byID
  const voiceChannel = guild.channels.cache.get(
    `${process.env.CHANNEL_REUNIAO}`
  );

  //Get all members with CEO ROLE
  const membersCEO = guild.roles.cache.get(`${process.env.ROLE_CEO}`).members;

  let listOfCEOUsers = [];

  //Push all CEO's Members to listOfCEOUsers
  membersCEO.forEach((members) => listOfCEOUsers.push(members.user));

  //Messages to send
  const messages = [
    {
      hour: 9,
      minute: 25,
      text: `**:alarm_clock: Ei ${listOfCEOUsers.join()}, faltam 5 minutos para o início da Daily Scrum! \nEntre no canal ${voiceChannel}!**`,
    },
    {
      hour: 9,
      minute: 30,
      text: `**:alarm_clock: Bora bora ${listOfCEOUsers.join()}, a DailyScrum começa agora! \nEntre no canal ${voiceChannel}!**`,
    },
    {
      hour: 10,
      minute: 00,
      text: `**:negative_squared_cross_mark: Limpando mensagens em 1 minuto...**`,
    },
  ];

  sendMessageInterval(messages, channel);
});

//Delete all channel messages
client.on("messageCreate", (message) => {
  botClearMessages(message);

  if (message.content === "ping") message.channel.send("Pong!");
  if (message.content === "time") {
    const date = getBrazilDate();
    message.channel.send(`Horário: ${date.getHours()}:${date.getMinutes()}`);
  }
});

client.login(process.env.TOKEN);
