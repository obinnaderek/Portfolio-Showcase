import { Router, type IRouter } from "express";
import { SubmitContactBody, SubmitContactResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/contact", async (req, res): Promise<void> => {
  const parsed = SubmitContactBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  req.log.info({ name: parsed.data.name, email: parsed.data.email }, "Contact form submission received");

  res.json(SubmitContactResponse.parse({
    success: true,
    message: "Thanks for reaching out! Obinna will get back to you soon.",
  }));
});

export default router;
