import { Router, type IRouter } from "express";
import { db, experienceTable } from "@workspace/db";
import { ListExperienceResponse } from "@workspace/api-zod";
import { asc } from "drizzle-orm";

const router: IRouter = Router();

router.get("/experience", async (req, res): Promise<void> => {
  const experience = await db.select().from(experienceTable).orderBy(asc(experienceTable.id));
  res.json(ListExperienceResponse.parse(experience));
});

export default router;
