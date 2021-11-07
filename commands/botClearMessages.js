function botClearMessages(message) {
  if (
    message.content.includes(
      ":negative_squared_cross_mark: Limpando mensagens em 1 minuto..."
    ) &&
    message.member.user.bot
  ) {
    setTimeout(() => {
      message.channel.messages.fetch({ limit: 100 }).then((messages) => {
        message.channel.bulkDelete(messages);
      });
      const date = new Date();
      console.log(`Chat limpo às ${date.getHours()}:${date.getMinutes()}`);
    }, 60000);
  }
}

module.exports = {
  botClearMessages,
};
