const { ShardingManager } = require('discord.js');

const manager = new ShardingManager('./index.js', {
    totalShards: 'auto', 
    token: ""
});

manager.spawn();

manager.on('shardCreate', (shard) => console.log(`Shard ${shard.id} launched`));
