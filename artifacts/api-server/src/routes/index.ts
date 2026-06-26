import { Router, type IRouter } from "express";
import healthRouter from "./health";
import projectsRouter from "./projects";
import blogRouter from "./blog";
import testimonialsRouter from "./testimonials";
import skillsRouter from "./skills";
import experienceRouter from "./experience";
import contactRouter from "./contact";

const router: IRouter = Router();

router.use(healthRouter);
router.use(projectsRouter);
router.use(blogRouter);
router.use(testimonialsRouter);
router.use(skillsRouter);
router.use(experienceRouter);
router.use(contactRouter);

export default router;
