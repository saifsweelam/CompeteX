import { RequestHandler } from "express";
import { z, ZodEffects, ZodSchema } from "zod";

export default function validate<
    B extends ZodSchema|ZodEffects<ZodSchema>,
    Q extends ZodSchema|ZodEffects<ZodSchema>,
    P extends ZodSchema|ZodEffects<ZodSchema>,
    R extends ZodSchema|ZodEffects<ZodSchema>,
>(
    bodySchema?: B,
    querySchema?: Q,
    paramsSchema?: P,
    _responseSchema?: R,
): RequestHandler<
    z.output<P>,
    z.output<R>,
    z.output<B>,
    z.output<Q>
> {
    return (req, res, next) => {
        Object.defineProperty(req, "query", {
            value: req.query,
            writable: true,
            configurable: true,
        });
        Object.defineProperty(req, "params", {
            value: req.params,
            writable: true,
            configurable: true,
        });
        Object.defineProperty(req, "body", {
            value: req.body,
            writable: true,
            configurable: true,
        });
        if (bodySchema) {
            req.body = bodySchema.parse(req.body);
        }

        if (querySchema) {
            req.query = querySchema.parse(req.query);
        }

        if (paramsSchema) {
            req.params = paramsSchema.parse(req.params);
        }

        next();
    }
}