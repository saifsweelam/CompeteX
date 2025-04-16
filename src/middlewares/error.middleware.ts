import { NextFunction, Request, Response } from "express";
import ApiError from "../errors/api.error";

export default function errorHandler(
    err: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction,
) {
    console.error(err);
    const apiError = ApiError.fromError(err);
    res.status(apiError.statusCode).json(apiError.serialize());
}