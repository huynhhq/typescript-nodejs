import { Request, Response } from "express";

import * as UserService from "../services/user.service";
import { logger } from "../utils/log/logger.mixed";
import {
    responseError,
    responseSuccess,
} from "../utils/response/response.json";

export async function login(req: Request, res: Response) {
    try {
        let data: any = await UserService.login(req.body);
        return responseSuccess(res, data, 200);
    } catch (error) {
        logger.error(error);
        return responseError(req, res, error);
    }
}

export async function register(req: Request, res: Response) {
    try {
        let data: any = await UserService.register(req.body);
        return responseSuccess(res, data, 201);
    } catch (error) {
        logger.error(error);
        return responseError(req, res, error);
    }
}
