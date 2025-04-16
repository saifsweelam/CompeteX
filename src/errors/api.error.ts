import { ZodError } from "zod";

const errors = {
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    500: 'Internal Server Error',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
    504: 'Gateway Timeout',
    429: 'Too Many Requests',
    408: 'Request Timeout',
    411: 'Length Required',
    412: 'Precondition Failed',
    413: 'Payload Too Large',
    414: 'URI Too Long',
    415: 'Unsupported Media Type',
    416: 'Range Not Satisfiable',
    417: 'Expectation Failed',
    418: 'I\'m a teapot',
    421: 'Misdirected Request',
    422: 'Unprocessable Entity',
    423: 'Locked',
} as const;

type StatusCode = keyof typeof errors;

type ErrorOptions = {
    message?: string;
    description?: string;
    field?: string;
    details?: object;
}

export default class ApiError extends Error {
    public readonly statusCode: StatusCode;
    public readonly description?: string;
    public readonly field?: string;
    public readonly details?: object;

    constructor(statusCode: StatusCode, options?: ErrorOptions) {
        super(options?.message || errors[statusCode]);
        this.statusCode = statusCode;
        this.name = 'ApiError';
        this.description = options?.description;
        this.field = options?.field;
        this.details = options?.details;
        Error.captureStackTrace(this, ApiError);
    }

    public static fromError(error: unknown): ApiError {
        if (error instanceof ApiError) {
            return error;
        }
        if (error instanceof ZodError) {
            return new ApiError(400, {
                message: 'Validation Error',
                description: error.message,
                details: error.errors,
            });
        }
        return new ApiError(500);
    }

    public serialize() {
        return {
            name: this.name,
            statusCode: this.statusCode,
            message: this.message,
            description: this.description,
            field: this.field,
            details: this.details,
        };
    }
}