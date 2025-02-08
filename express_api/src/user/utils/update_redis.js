/*import redisClient from "../../common/db/redis_client.js";
import logger from "../../common/utils/logger.js";
import token1 from "../model/token.js";
import { StatusCodes } from "http-status-codes";

export const uploadLoggedInDataInRedis = async (username) => {
    try {
        const isExistUserInRedis = await redisClient.exists(`user:${username}`);

        if (!isExistUserInRedis) {
            const userData = await token1.findOne({ username });

            if (!userData) {
                return false;
            }

            const { email, accessToken, refreshToken } = userData;

            const redisKey = `user:${username}`;

            await redisClient.hSet(redisKey, {
                username,
                email,
                accessToken,
                refreshToken
            });

            await redisClient.save();

            // Set expiration for Redis data (60 sec)
            await redisClient.expire(redisKey, 60);

            return true;
        }
        return true;

    } catch (error) {
        logger.error("Error in updating Redis data", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error updating Redis data" });
    }
};
*/