import { Request, Response } from "express";
import {
    IResponseError,
    IResponseSuccess,
} from "../../interfaces/response.interface";

/**
 *
 * @param {Response} res
 * @param {Object} data
 * @param {Number} statusCode
 * @param {Number} statusCodeResponse
 */
export async function responseSuccess(
    res?: Response,
    data?: Object | any,
    statusCode?: Number,
    statusCodeResponse?: Number
) {
    const DataResponse: IResponseSuccess = {
        success: true,
        statusCode: res?.statusCode
            ? res?.statusCode
            : statusCode
            ? statusCode
            : 200,
        statusMessage: res?.statusMessage ? res?.statusMessage : `success`,
        statusCodeResponse: statusCodeResponse || 10000,
        data: data,
    } as any;

    return res?.status(DataResponse.statusCode).json(DataResponse);
}

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Object} error
 * @param {Number} statusCode
 * @param {Number}statusCodeResponse
 */
export async function responseError(
    req?: Request,
    res?: Response,
    error?: Object | any,
    statusCode?: Number,
    statusCodeResponse?: Number
) {
    const DataResponse: IResponseError = {
        success: false,
        statusCode: error?.statusCode
            ? error?.statusCode
            : statusCode
            ? statusCode
            : 500,
        statusMessage: error?.statusMessage ? error?.statusMessage : `failure`,
        statusCodeResponse: statusCodeResponse || 50000,
        data: {
            errorMessage: error?.message || `bruh...`,
            request: req?.url,
            method: req?.method,
        },
    } as any;
    return res?.status(DataResponse.statusCode).json(DataResponse);
}
