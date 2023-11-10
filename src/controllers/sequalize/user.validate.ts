import { NextFunction, Request, Response } from "express";
import { AnyZodObject, z } from "zod";
import { zUuidV4String } from "../../utils/uuid";

export const zValidate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
        headers: req.headers,
      });
      return next();
    } catch (error) {
      return res.status(400).json(error);
    }
  };

export const zCreateInput = z.object({
  body: z.object({
    balance: z.number().nonnegative(), // больше нуля
  }),
});

export const zCredit = z.object({
  body: z.object({
    amount: z.number().nonnegative(),
  }),
  params: z.object({
    userId: zUuidV4String,
  }),
});

export const zFindById = z.object({
  params: z.object({
    userId: zUuidV4String,
  }),
});
