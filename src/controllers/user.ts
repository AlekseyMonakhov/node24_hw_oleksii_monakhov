import prisma from "../prismaClient";
import { Request, Response } from "express";
import { Prisma } from "@prisma/client";

export async function createUser(req: Request, res: Response) {
    try {
        const user = await prisma.user.create({
            data: {
                name: req.body.name,
                email: req.body.email,
            },
        });

        res.status(201).json(user);
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === "P2002") {
                return res
                    .status(400)
                    .json({ message: "This email is already taken." });
            }
        }

        res.status(400).json({ message: "Error creating user" });
    }
}

export async function getUsers(req: Request, res: Response) {
    const users = await prisma.user.findMany();

    res.json(users);
}

export async function getUser(req: Request, res: Response) {
    const user = await prisma.user.findUnique({
        where: {
            id: req.params.id,
        },
    });

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
}

export async function deleteUser(req: Request, res: Response) {
    try {
        const user = await prisma.user.delete({
            where: {
                id: req.params.id,
            },
        });

        res.json(user);
    } catch (e) {
        res.status(404).json({ message: "User not found" });
    }
}
