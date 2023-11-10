import { z } from "zod";

export const uuidV4Regex = new RegExp(
  /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
);

export const zUuidV4String = z.string().regex(uuidV4Regex);

export const validateUuid = (str: string) =>
  zUuidV4String.safeParse(str).success;
