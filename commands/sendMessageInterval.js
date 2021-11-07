const { getBrazilDate } = require("../utils/common/getBrazilDate");

function sendMessageInterval(messages, channel) {
  //Messages should be:
  // [ { hour: number, minute: number}, ... ]

  let isSend = false;
  let date;

  setInterval(() => {
    date = getBrazilDate();

    messages.forEach((message) => {
      if (
        date.getHours() === message.hour &&
        date.getMinutes() === message.minute &&
        isSend === false
      ) {
        channel.send(message.text);
        console.log(
          `Mensagem enviada às ${date.getHours()}:${date.getMinutes()}`
        );
        isSend = true;
        setTimeout(() => (isSend = false), 60000);
      }
    });
  }, 5000);
}

module.exports = {
  sendMessageInterval,
};
