const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const economyschema = require('../../schema/economySchema')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('weekly')
        .setDescription('weekly amount of money'),
    category: 'Economy',
    cooldown: 604800000,
    async execute(interaction) {
            const give = Math.floor(Math.random() * 2000) + 500
            const data = await economyschema.findOne({ User: interaction.user.id })
            if (!data) return
            if (data.Money + give) {
                data.Money += give
                await data.save()
            } else {
                data.Money += give
                data.save()
            }

            const embed = new EmbedBuilder()
                .setColor('Green')
                .setDescription(`You got $${give} from the weekly`)

            interaction.reply({ embeds: [embed] })
    }
}