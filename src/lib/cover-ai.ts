export type CoverStyle = "full" | "frame" | "silhouette";

export type AiPipelinePhase = "idle" | "portrait" | "cover" | "done" | "error";

function apiBase(): string {
  if (typeof window === "undefined") return "";
  return (process.env.NEXT_PUBLIC_COVER_API_URL || "").trim().replace(/\/$/, "");
}

export function isCoverAiConfigured(): boolean {
  return Boolean(apiBase());
}

/** Strip data URL prefix → raw base64 */
export function dataUrlToBase64(dataUrl: string): string {
  const i = dataUrl.indexOf(",");
  if (i === -1) return dataUrl;
  return dataUrl.slice(i + 1);
}

export async function requestPortraitTransform(
  file: File,
  opts: { childName: string; age: string; signal?: AbortSignal }
): Promise<{ portrait: string }> {
  const base = apiBase();
  if (!base) throw new Error("NEXT_PUBLIC_COVER_API_URL is not set");

  const fd = new FormData();
  fd.append("photo", file);
  fd.append("childName", opts.childName);
  fd.append("age", opts.age);

  const res = await fetch(`${base}/api/cover-portrait`, {
    method: "POST",
    body: fd,
    signal: opts.signal,
  });
  const json = (await res.json().catch(() => ({}))) as { error?: string; portrait?: string };
  if (!res.ok) throw new Error(json.error || `Portrait API error (${res.status})`);
  if (!json.portrait) throw new Error("Invalid portrait response");
  return { portrait: json.portrait };
}

export async function requestCoverFinal(
  portraitDataUrl: string,
  opts: { coverStyle: CoverStyle; childName: string; signal?: AbortSignal }
): Promise<{ cover: string; coverStyle: CoverStyle }> {
  const base = apiBase();
  if (!base) throw new Error("NEXT_PUBLIC_COVER_API_URL is not set");

  const fd = new FormData();
  fd.append("portraitBase64", dataUrlToBase64(portraitDataUrl));
  fd.append("coverStyle", opts.coverStyle);
  fd.append("childName", opts.childName);

  const res = await fetch(`${base}/api/cover-final`, {
    method: "POST",
    body: fd,
    signal: opts.signal,
  });
  const json = (await res.json().catch(() => ({}))) as {
    error?: string;
    cover?: string;
    coverStyle?: CoverStyle;
  };
  if (!res.ok) throw new Error(json.error || `Cover API error (${res.status})`);
  if (!json.cover) throw new Error("Invalid cover response");
  return { cover: json.cover, coverStyle: json.coverStyle || opts.coverStyle };
}
