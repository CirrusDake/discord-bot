const fs = require('fs');

module.exports = {
  name: 'roll',
  description: 'Rodar un dado',
  options: [
    {
      name: 'num',
      type: 4, // 'INTEGER' Type
      description: 'maximo',
      required: false,
    },
  ],
  execute(interaction) {
    const max = interaction.options.get('num') != null ? interaction.options.get('num').value : 100;
    var result = (Math.floor(Math.random() * max) + 1);
    var message = `🎲 ${interaction.user} tiro dados de 1 a ${max} y saco: **${result}**`;
    if (result == max) {
       message = `🎲 OMFG! ${interaction.user} tiro dados de 1 a ${max} y saco: **${result}**!!!`;
    }
    return void interaction.reply({
      content: message
    });
  },
};
