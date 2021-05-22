module.exports = {
     createBar: function(maxtime, formattedCurrentTime, size = 25, line = "▬", slider = "🔶") {
    try{
      let bar = formattedCurrentTime > maxtime ? [line.repeat(size / 2 * 2), (formattedCurrentTime / maxtime) * 100] : [line.repeat(Math.round(size / 2 * (formattedCurrentTime / maxtime))).replace(/.$/, slider) + line.repeat(size - Math.round(size * (formattedCurrentTime / maxtime)) + 1), formattedCurrentTime / maxtime];
      if (!String(bar).includes("🔶")) return `**[🔶${line.repeat(size - 1)}]**\n**00:00:00 / 00:00:00**`;
      return `**[${bar[0]}]**\n**${new Date(formattedCurrentTime).toISOString().substr(11, 8)+" / "+(maxtime==0?" ◉ LIVE":new Date(maxtime).toISOString().substr(11, 8))}**`;
    }catch (e) {
      console.log(String(e.stack).bgRed)
    }
  },
}