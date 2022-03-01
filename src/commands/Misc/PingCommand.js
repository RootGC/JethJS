const { Command, colors } = require('../../utils')
const Discord = require('discord.js')

module.exports = class Ping extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'ping'
    this.aliases = ['latencia', 'ms', 'ping']
    this.category = 'Fun'
    this.subcommandsOnly = false
  }

  async run(message, client, args) {
    const documento = await this.client.database.guild.getOrCreate(message.guild.id)
    const prefix = documento.prefix
    const embed = new Discord.MessageEmbed() // Aqui vai ser a primeira embed que o bot irá mostrar
      .setTitle(message.author.username)
      .setColor(colors.default)
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 1024 }))
      .setDescription(`Calculando...`)
      .addField(`<:9605discordslashcommand:832746852667490334> ⇝ Ajuda`, [
        `Use \`${prefix}ajuda\` para saber mais comandos!`
      ])

    const embed2 = new Discord.MessageEmbed() // Aqui vai ser a segunda embed que o bot irá mostrar
      .setTitle(message.author.username)
      .setColor(colors.default)
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 1024 }))
      .setDescription('Espero que não esteja alto 😬!')
      .addField(`<:9605discordslashcommand:832746852667490334> ⇝ Ajuda`, [
        `Use \`${prefix}ajuda\` para saber mais comandos!`
      ])

    const embed_ping = new Discord.MessageEmbed() // Aqui vai ser a terceira embed que o bot irá mostrar
      .setTitle(message.author.username)
      .setColor(colors.default)
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 1024 }))
      .addField(`<:a_blurplesettings:856174395801075773> ⇝ Ping`, [
        `\`${parseInt(this.client.ws.ping)}\` ms\n`
      ])
      .addField(`<:9605discordslashcommand:832746852667490334> ⇝ Ajuda`, [
        `Use \`${prefix}ajuda\` para saber mais comandos!`
      ])

    const msg = await message.channel.send({ embeds: [embed] }) // Aqui o bot irá mostrar a primeira embed
    setTimeout(() => { // Aqui criamos um timeout para mostrar a primeira embed com a duração de 3 segundos, para depois editar ela e mostrar a segunda embed
      msg.edit(embed2)
    }, 3000) // 1000 ms = 1s
    setTimeout(() => { // Aqui criamos um timeout para mostrar a embed final com a duração de 5 segundos
      msg.edit(embed_ping)
    }, 5000)

  }
}