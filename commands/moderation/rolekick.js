module.exports = {
	name: 'rolekick',
	description: 'kick an entire role worth of peeps.',
	guildOnly: true,
	permissions: 'KICK_MEMBERS',
  execute(message, args) {
    console.log('fetching roles')
    message.guild.roles.fetch({cache: true})
    console.log('fetching members')
    message.guild.members.fetch({cache: true})
      .then()
        const roleID = message.content.slice(13, message.content.length-1)
        console.log(roleID)
        let membersWithRole = message.guild.roles.cache.get(roleID).members.map(member => member.id);
        for(i=0;i<membersWithRole.length; i++){
          console.log(membersWithRole[i])
          let member = message.guild.member(membersWithRole[i])
          member.kick('purge the infidels')

   };
   message.reply('Mass Role puge complete')
   }
}
