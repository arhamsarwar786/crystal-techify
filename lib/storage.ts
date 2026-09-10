import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

function uploadsDir() {
  return process.env.VERCEL
    ? path.join("/tmp", "crystal-techify-uploads")
    : path.join(process.cwd(), "data", "uploads");
}

function blobToken() {
  return process.env.BLOB_READ_WRITE_TOKEN?.trim() || "";
}

export function isRemoteCv(stored: string) {
  return /^https?:\/\//i.test(stored);
}

async function saveLocal(filename: string, data: Buffer) {
  const root = uploadsDir();
  await mkdir(root, { recursive: true });
  const filePath = path.join(root, filename);
  await writeFile(filePath, data);
  return filePath;
}

export async function saveCv(filename: string, data: Buffer): Promise<string> {
  const token = blobToken();
  if (token) {
    try {
      const { put } = await import("@vercel/blob");
      const blob = await put(`cvs/${filename}`, data, {
        access: "private",
        token,
        addRandomSuffix: false,
      });
      return blob.url;
    } catch (err) {
      console.error("Vercel Blob upload failed, using local fallback", err);
    }
  }

  return saveLocal(filename, data);
}

export async function readCv(
  stored: string,
): Promise<{ body: Buffer; filename: string } | null> {
  if (isRemoteCv(stored)) {
    const token = blobToken();
    const { get } = await import("@vercel/blob");
    const result = await get(stored, {
      access: "private",
      token: token || undefined,
    });
    if (!result || result.statusCode !== 200) return null;
    const body = Buffer.from(await new Response(result.stream).arrayBuffer());
    return { body, filename: path.basename(result.blob.pathname) };
  }

  const filePath = path.resolve(stored);
  const root = path.resolve(uploadsDir());
  if (!filePath.startsWith(root)) return null;
  try {
    const body = await readFile(filePath);
    return { body, filename: path.basename(filePath) };
  } catch {
    return null;
  }
}
