import { Router, Request, Response, NextFunction } from "express";
import { User } from "../../databases/sequalize/entity/user.entity";
import { AnyZodObject, ZodAny, z } from "zod";
import { sequelize } from "../../databases/sequalize/sequelize";
import { QueryTypes } from "sequelize";
import { validateUuid } from "../../utils/uuid";
import { decrementIfUserFoundUnsafe } from "../../databases/sequalize/sql/decrementBalance";
import { Op } from "sequelize";

const sequalizeUserController = Router();

const validate =
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

const zCreateInput = z.object({
  body: z.object({
    balance: z.number(),
  }),
});

const zCredit = z.object({
  body: z.object({
    amount: z.number(),
  }),
  params: z.object({
    id: z.string(),
  }),
});

const zFindById = z.object({
  params: z.object({
    id: z.string(),
  }),
});

// Приходится писать валидаторы Zod дважды потому что Express не дает инджектнуть типы при мидлвейр
// Хоть у req тип Request<Params, ResBody, ReqBody, ReqQuery>, я напрямую задаю тип для полной валидации
sequalizeUserController
  .post(
    "/create",
    validate(zCreateInput),
    async (req: z.infer<typeof zCreateInput>, res: Response) => {
      const {
        body: { balance },
      } = req;

      const userNew = await User.create({ balance });
      const resData = { id: userNew.id, message: "SUCCESS" };
      res.status(201).send(resData);
    }
  )

  .post(
    "/:id/credit",
    validate(zCredit),
    async (req: z.infer<typeof zCredit>, res: Response) => {
      const {
        body: { amount },
        params: { id },
      } = req;

      // SQL injection
      if (!validateUuid(id)) {
        return res
          .status(400)
          .send({ message: 'Parameter "id" does not look right!' });
      }

      try {
        // Я делаю асинхронную транзакцию так как так запросы на базу данных будут быстрее
        // Логические операции делаются только на сервере
        const [userSelect, userUpdate] = await sequelize.transaction(
          async (t) => {
            return await Promise.all([
              // чтобы узнать, есть ли такой пользователь
              // не берем balance потому что могут быть race condtions
              User.findByPk(id, { transaction: t, attributes: ["id"] }),
              User.decrement("balance", {
                by: amount,
                where: { id, balance: { [Op.gte]: amount } },
                transaction: t,
              }),
            ]);
          }
        );

        if (userSelect === null) {
          return res.status(404).send({ message: "User not found" });
        }

        console.log(userUpdate);
        console.log(userUpdate[0]);

        // На данный момент у sequelize проблемы с тайпскриптом
        // поэтому придется на рантайме переделывать его типы
        const affectedRows = userUpdate[0][1]; // Должен быть number | undefined
        // console.log(affectedRows); // откомментируйте для подтверждения
        if (!affectedRows === undefined || typeof affectedRows !== "number") {
          return res.status(500).send({ message: "Server error" });
        }

        if (affectedRows === undefined || affectedRows === 0) {
          return res
            .status(409)
            .send({ message: "Balance cannot be less than 0" });
        }

        // @ts-ignore
        const user: User = userUpdate[0][0][0]; // Должен быть user
        console.log(user);
        return res
          .status(200)
          .send({ message: "success", balance: user.balance });
      } catch (err) {
        console.warn(err);
        return res.status(500).send({ message: "Server error" });
      }
    }
  )

  .get(
    "/:id",
    validate(zFindById),
    async (req: z.infer<typeof zFindById>, res: Response) => {
      const {
        params: { id },
      } = req;

      if (!id) {
        return res
          .status(400)
          .send({ message: 'Required parameter "id" is missing' });
      }

      const foundUser = await User.findByPk(id);
      if (!foundUser) {
        return res.status(404).send({ message: `User ${id} was not found.` });
      }

      const resData = { id: foundUser.id, balance: foundUser.balance };
      res.send(resData);
    }
  );

export default sequalizeUserController; // default не люблю, но тут оптимально
