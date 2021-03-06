import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core";
import { Request, Response } from "express";

export interface MyContext {
    em: EntityManager<IDatabaseDriver<Connection>>;
    req: Request;
    res: Response;
}