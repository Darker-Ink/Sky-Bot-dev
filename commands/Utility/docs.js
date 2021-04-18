const axios = require('axios')

module.exports = {
    name: "docs",
    description: "Get something from the docs",
    usage: "docs <msg>",
    aliases: ["dcjs"],
    category: "Utility",
    run: async (client, message, args) => {
        const uri = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(
      args
    )}`

        axios
            .get(uri)
            .then((embed) => {
                const {
                    data
                } = embed

                if (data && !data.error) {
                    message.channel.send({
                        embed: data
                    })
                } else {
                    message.reply('Could not find that documentation')
                }
            })
            .catch((err) => {
                console.error(err)
            })
    }
}