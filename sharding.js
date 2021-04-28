const { ShardingManager } = require('discord.js');

const manager = new ShardingManager('./index.js', {
    totalShards: 'auto', 
    token: ""
});

manager.spawn();

// The shardCreate event is emitted when a shard is created.
// You can use it for something like logging shard launches.
manager.on('shardCreate', (shard) => console.log(`Shard ${shard.id} launched`));