import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

async function requireAuth() {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");
  return session;
}

function useCloudinary() {
  const url = process.env.CLOUDINARY_URL;
  if (url) return true;
  const name = process.env.CLOUDINARY_CLOUD_NAME;
  const key = process.env.CLOUDINARY_API_KEY;
  const secret = process.env.CLOUDINARY_API_SECRET;
  return !!(name && key && secret);
}

export async function POST(req: Request) {
  try {
    await requireAuth();
    const formData = await req.formData();
    const file = formData.get("file");
    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Use JPEG, PNG, WebP, or GIF." },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "File too large. Max 5MB." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    if (useCloudinary()) {
      if (!process.env.CLOUDINARY_URL) {
        cloudinary.config({
          cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
          api_key: process.env.CLOUDINARY_API_KEY!,
          api_secret: process.env.CLOUDINARY_API_SECRET!,
        });
      }
      const b64 = buffer.toString("base64");
      const dataUri = `data:${file.type};base64,${b64}`;
      const result = await cloudinary.uploader.upload(dataUri, {
        folder: "brian-moses/testimonials",
        resource_type: "image",
      });
      return NextResponse.json({ url: result.secure_url });
    }

    // Local storage fallback
    const ext = path.extname(file.name) || ".jpg";
    const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}${ext}`;
    const dir = path.join(process.cwd(), "public", "uploads", "testimonials");
    await mkdir(dir, { recursive: true });
    const filePath = path.join(dir, safeName);
    await writeFile(filePath, buffer);

    const url = `/uploads/testimonials/${safeName}`;
    return NextResponse.json({ url });
  } catch (e) {
    if ((e as Error).message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Upload error:", e);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
