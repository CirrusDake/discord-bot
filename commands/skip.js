const {GuildMember} = require('discord.js');

module.exports = {
  name: 'saltar',
  description: 'Saltar una (o mas de una) cancion',
  options: [
    {
      name: 'num',
      type: 4, // 'STRING' Type
      description: 'Numero de canciones a saltar',
      required: false,
    },
  ],
  async execute(interaction, player) {
    if (!(interaction.member instanceof GuildMember) || !interaction.member.voice.channel) {
      return void interaction.reply({
        content: 'You are not in a voice channel!',
        ephemeral: true,
      });
    }

    if (
      interaction.guild.me.voice.channelId &&
      interaction.member.voice.channelId !== interaction.guild.me.voice.channelId
    ) {
      return void interaction.reply({
        content: 'You are not in my voice channel!',
        ephemeral: true,
      });
    }

    await interaction.deferReply();
    const queue = player.getQueue(interaction.guildId);
    if (!queue || !queue.playing) return void interaction.followUp({content: 'No music is being played!'});

    const deleteCount = interaction.options.get('num') != null ? interaction.options.get('num').value : 0;
    if (deleteCount > 1) {
        for(var i=0; i < deleteCount; i++) {
          await queue.skip();
        }
      return void interaction.followUp({
        content: 'Skipped songs',
      });
    } else {
      const currentTrack = queue.current;
      const success = queue.skip();
      return void interaction.followUp({
        content: success ? `Skipped **${currentTrack}**!` : 'Something went wrong!',
      });
    }
  },
};
