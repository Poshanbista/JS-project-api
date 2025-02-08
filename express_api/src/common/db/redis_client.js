import { createClient } from 'redis';
const redisClient = createClient();

// Connect to the Redis server
redisClient.connect().catch((error) => {
    console.error('Redis connection error:', error);
});

export default redisClient;