import { Router, type IRouter } from "express";
import { db, skillsTable } from "@workspace/db";
import { ListSkillsResponse } from "@workspace/api-zod";
import { asc } from "drizzle-orm";

const router: IRouter = Router();

router.get("/skills", async (req, res): Promise<void> => {
  const skills = await db.select().from(skillsTable).orderBy(asc(skillsTable.category), asc(skillsTable.name));

  // Group by category
  const grouped = skills.reduce<Record<string, { name: string; level: number }[]>>((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push({ name: skill.name, level: skill.level });
    return acc;
  }, {});

  const result = Object.entries(grouped).map(([category, skillList]) => ({
    category,
    skills: skillList,
  }));

  res.json(ListSkillsResponse.parse(result));
});

export default router;
