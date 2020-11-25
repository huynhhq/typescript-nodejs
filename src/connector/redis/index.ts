import Redis from 'ioredis';

import { REDIS } from '../../config/service.config';
import { logger } from '../../utils/log/logger.mixed';

let client: any;

const timeEX: number = 120;

function init() {
    if (!client) {
        //default connect redis localhost:3306
        client = new Redis(REDIS.REDIS_URL);
        client.on("error", (err: any) => {
            logger.error(`Connect to Redis fail, you need install redis or start service redis`);
            logger.error(err);
        });
        client.on("connect", () => {
            logger.log(`Connect to Redis success: ${client.options.host}:${client.options.port}`);
        });
        client.on("ready", () => {
            logger.warn(`========== STATUS REDIS SERVER ==========`);
            logger.log("Redis version: " + client.serverInfo.redis_version);
            logger.log("OS running: " + client.serverInfo.os);
            logger.log("Uptime: " + client.serverInfo.uptime_in_seconds + "s");
            logger.warn(`================== END ==================`);
        });
        return client;
    } else {
        logger.warn(`Connect to Redis success`);
        return client;
    }
}

client = init();



export async function setJson(key: String, value: any, time: number) {
    if (!time) {
        time = timeEX;
    }
    value = JSON.stringify(value);
    return client.set(key, value, "EX", time);
}

export async function getJson(key: String) {
    let data: any = await client.get(key);
    if (data) data = JSON.parse(data);
    return data;
}

export async function deleteKey(key: String) {
    return await client.del(key)
}