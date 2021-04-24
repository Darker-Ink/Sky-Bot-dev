const { ShardingManager } = require('discord.js');

const manager = new ShardingManager('./index.js', {
    totalShards: 'auto', 
    token: "NjgyMDkwMDA2MTUxNTYxMjMz.XlX70g.EkrpipP8k1cWugAPqXkI_wtyor8"
});

manager.spawn();

// The shardCreate event is emitted when a shard is created.
// You can use it for something like logging shard launches.
manager.on('shardCreate', (shard) => console.log(`Shard ${shard.id} launched`));