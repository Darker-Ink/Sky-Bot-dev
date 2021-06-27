
module.exports = {
    name: 'opensource',
    description: 'To check the progress on when BlueSky or redSky will be opensourced',
    category: 'Info',
    run: async (client, message, args) => {
        const embed = new Discord.MessageEmbed()
        .setTitle('Progress')
        .setDescription('```‍█████##‍#‍#‍#‍#‍#‍#‍#‍#‍#‍#‍#‍#‍#‍#‍#‍#‍#‍#‍#‍#```\n10% Finished')
        .setFooter('Don\'t worry it won\'t take that long')
        .setColor('BLURPLE')
        message.channel.send({ embeds: [embed]})
    }
}