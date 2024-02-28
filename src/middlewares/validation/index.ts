import { z, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

const ParamsSchema = z.object({
    id: z.string().uuid("id must be a valid UUID"),
});

const BodySchema = z.object({
    name: z.string().min(5, "Name must be at least 5 characters long"),
    email: z.string().email("Please provide a valid email address"),
});

export function userHasValidID(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        ParamsSchema.parse(req.params);
        next();
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({ errors: error.errors });
        }

        return res.status(400).json({ message: "Invalid request" });
    }
}

export function userHasValidBody(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        BodySchema.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({ errors: error.errors });
        }

        return res.status(400).json({ message: "Invalid request" });
    }
}
