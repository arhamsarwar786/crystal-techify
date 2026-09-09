import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

const LOCAL_UPLOADS = path.join(process.cwd(), "data", "uploads");

function blobToken() {
  return process.env.BLOB_READ_WRITE_TOKEN?.trim() || "";
}

export function isRemoteCv(stored: string) {
  return /^https?:\/\//i.test(stored);
}

export async function saveCv(filename: string, data: Buffer): Promise<string> {
  const token = blobToken();
  if (token) {
    const { put } = await import("@vercel/blob");
    const blob = await put(`cvs/${filename}`, data, {
      access: "private",
      token,
      addRandomSuffix: false,
    });
    return blob.url;
  }

  await mkdir(LOCAL_UPLOADS, { recursive: true });
  const filePath = path.join(LOCAL_UPLOADS, filename);
  await writeFile(filePath, data);
  return filePath;
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
  const root = path.resolve(LOCAL_UPLOADS);
  if (!filePath.startsWith(root)) return null;
  try {
    const body = await readFile(filePath);
    return { body, filename: path.basename(filePath) };
  } catch {
    return null;
  }
}
