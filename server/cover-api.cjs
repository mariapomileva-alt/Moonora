/**
 * Moonora cover AI — runs beside Next.js (static export cannot host API routes).
 *
 * Env (project root `.env.local`):
 *   OPENAI_API_KEY=sk-...
 *   COVER_API_PORT=3847   (optional)
 *   OPENAI_IMAGE_MODEL=gpt-image-1   (optional)
 */

const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env.local") });
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const express = require("express");
const cors = require("cors");
const multer = require("multer");
const OpenAI = require("openai");
const { toFile } = require("openai/uploads");

const PORT = Number(process.env.COVER_API_PORT || 3847);
const MODEL = process.env.OPENAI_IMAGE_MODEL || "gpt-image-1";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const uploadPhoto = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 12 * 1024 * 1024, files: 1 },
});

const uploadNone = multer({ limits: { fieldSize: 30 * 1024 * 1024 } });

function portraitPrompt(childName, age) {
  const who = childName?.trim() ? `Child’s name (for mood only, do not render text): ${childName.trim()}. ` : "";
  const ageLine = age?.trim() ? `Approximate age reference: ${age.trim()}. ` : "";
  return `${who}${ageLine}Transform this real child photograph into a premium cinematic illustrated character portrait for the luxury bedtime storybook brand Moonora. Use the upload ONLY as facial structure, skin tone, hair, and age reference — redraw completely in a painterly CG animation style (high-end feature film / collector’s edition children’s publishing). Soft moonlit rim light, warm golden fill, emotionally expressive eyes, detailed hair, believable anatomy, subtle skin texture, volumetric atmosphere. Vertical portrait framing, waist-up or three-quarter. Deep indigo-to-teal background with gentle fog — no text, no logos, no watermark, no visible photo crop edges, no collage, not flat vector.`;
}

function coverPrompt(style, childName) {
  const name = childName?.trim() || "the child hero";
  const base = `Book front cover illustration (vertical), hero is ${name}. Painterly cinematic children’s publishing — Moonora moon forest world. No readable text, no logos, no title lettering on the artwork. Leave the lower fifth slightly darker and uncluttered for typography overlay later. `;

  if (style === "frame") {
    return (
      base +
      `Compose the illustrated child inside an ornate carved gold portrait arch integrated into the painted scene — starry night, soft clouds, moonlight wash, subtle gold dust. Luxury oil-digital illustration, emotionally warm.`
    );
  }
  if (style === "silhouette") {
    return (
      base +
      `Show the same child as a soft cinematic silhouette (from behind or in profile), small in frame, gazing toward a massive luminous moon and misty hills — the magical environment dominates. Atmospheric depth haze, stars, painterly — NOT a harsh black photo cutout.`
    );
  }
  return (
    base +
    `The child is naturally embedded in a glowing enchanted Moon Forest at night: layered ancient trees, volumetric moonbeams, hanging moss, golden fireflies, soft ground fog, cinematic contrast and depth.`
  );
}

function b64ToDataUrl(b64) {
  return `data:image/png;base64,${b64}`;
}

async function editImage(imageUploadable, prompt, opts = {}) {
  const res = await openai.images.edit({
    model: MODEL,
    image: imageUploadable,
    prompt,
    size: opts.size || "1024x1536",
    quality: opts.quality || "high",
    input_fidelity: opts.input_fidelity ?? undefined,
    stream: false,
  });

  const item = res.data?.[0];
  if (!item?.b64_json) {
    throw new Error("OpenAI returned no image data");
  }
  return item.b64_json;
}

const app = express();
const extraOrigins = (process.env.COVER_CORS_ORIGIN || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: [/localhost:\d+$/, /127\.0\.0\.1:\d+$/, ...extraOrigins],
    methods: ["POST", "OPTIONS", "GET"],
    maxAge: 86400,
  })
);

app.get("/health", (_req, res) => {
  res.json({ ok: true, model: MODEL });
});

app.post("/api/cover-portrait", uploadPhoto.single("photo"), async (req, res) => {
  req.setTimeout(180000);
  res.setTimeout(180000);
  try {
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: "Server missing OPENAI_API_KEY" });
    }
    if (!req.file?.buffer) {
      return res.status(400).json({ error: "Missing photo file" });
    }
    const mime = req.file.mimetype || "image/jpeg";
    const ext = mime.includes("png") ? "png" : "jpg";
    const childName = typeof req.body?.childName === "string" ? req.body.childName : "";
    const age = typeof req.body?.age === "string" ? req.body.age : "";

    const uploadFile = await toFile(req.file.buffer, `child.${ext}`, { type: mime });
    const portraitB64 = await editImage(uploadFile, portraitPrompt(childName, age), {
      input_fidelity: "high",
    });

    return res.json({ portrait: b64ToDataUrl(portraitB64) });
  } catch (err) {
    console.error("[cover-api portrait]", err);
    const message = err?.message || "Portrait generation failed";
    const status = /moderation|safety|policy/i.test(message) ? 400 : 500;
    return res.status(status).json({ error: message });
  }
});

app.post("/api/cover-final", uploadNone.none(), async (req, res) => {
  req.setTimeout(180000);
  res.setTimeout(180000);
  try {
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: "Server missing OPENAI_API_KEY" });
    }
    const portraitB64 = req.body?.portraitBase64;
    const coverStyle = ["full", "frame", "silhouette"].includes(req.body?.coverStyle)
      ? req.body.coverStyle
      : "full";
    const childName = typeof req.body?.childName === "string" ? req.body.childName : "";

    if (!portraitB64 || typeof portraitB64 !== "string") {
      return res.status(400).json({ error: "Missing portraitBase64" });
    }

    const portraitFile = await toFile(Buffer.from(portraitB64, "base64"), "portrait.png", {
      type: "image/png",
    });

    const coverB64 = await editImage(portraitFile, coverPrompt(coverStyle, childName), {
      input_fidelity: "medium",
    });

    return res.json({
      cover: b64ToDataUrl(coverB64),
      coverStyle,
    });
  } catch (err) {
    console.error("[cover-api final]", err);
    const message = err?.message || "Cover generation failed";
    const status = /moderation|safety|policy/i.test(message) ? 400 : 500;
    return res.status(status).json({ error: message });
  }
});

app.listen(PORT, () => {
  console.log(`[cover-api] http://localhost:${PORT}`);
  console.log(`  POST /api/cover-portrait  (multipart: photo, childName, age)`);
  console.log(`  POST /api/cover-final     (urlencoded/multipart fields: portraitBase64, coverStyle, childName)`);
});
