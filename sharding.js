const { ShardingManager } = require('discord.js');

// Create your ShardingManger instance
const manager = new ShardingManager('./index.js', {
    totalShards: 'auto',
    token: 'NjgyMDkwMDA2MTUxNTYxMjMz.XlX70g.EkrpipP8k1cWugAPqXkI_wtyor8'
});

// Emitted when a shard is created
manager.on('shardCreate', (shard) => console.log(`Shard ${shard.id} launched`));

// Spawn your shards
manager.spawn();