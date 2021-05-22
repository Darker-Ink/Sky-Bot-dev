const suggestedEmbed = await suggestionChannel.messages.fetch(messageID)

const data = suggestedEmbed.embeds[0];

const embed = new Discord.MessageEmbed()
embed.setAuthor(`${data.interaction.user.tag}`, `https://cdn.discordapp.com/avatars/${data.interaction.user.id}/${data.interaction.user.avatar}`)
embed.addField(`Suggestion #${data.num}`, `${data.interaction.options[0].value}`)
embed.setFooter(`ID: ${data.interaction.user.id}`)
embed.addField(`${interaction.options[1].value} By ${interaction.user.tag}`, `${interaction.options[2].value}`)
embed.setColor('#7289da')