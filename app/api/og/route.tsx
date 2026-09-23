import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { LEVELS, isLevel } from '@/lib/triage';

export const runtime = 'nodejs';
let fonts: Promise<ArrayBuffer[]> | null = null;
async function one(w: string): Promise<ArrayBuffer> {
  const file = `noto-sans-latin-${w}-normal.woff`;
  try {
    const b = await readFile(join(process.cwd(), 'assets', file));
    return b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength) as ArrayBuffer;
  } catch {
    const r = await fetch(`https://cdn.jsdelivr.net/npm/@fontsource/noto-sans@5.3.0/files/${file}`);
    return r.arrayBuffer();
  }
}
function loadFonts() {
  fonts ??= Promise.all([one('700'), one('900')]);
  return fonts;
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const l = url.searchParams.get('l');
  const level = isLevel(l) ? l : null;
  const L = level ? LEVELS[level] : null;
  const w = 1200;
  const h = 630;
  const [f700, f900] = await loadFonts();

  const img = new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#fbfaf7',
          padding: 64,
          fontFamily: 'Noto Sans',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 20,
              background: '#22c55e',
              color: '#fff',
              fontSize: 48,
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            +
          </div>
        </div>

        {L ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={{ fontSize: 36, fontWeight: 700, color: '#374151' }}>FreeDoc says:</div>
            <div
              style={{
                display: 'flex',
                alignSelf: 'flex-start',
                background: L.color,
                color: L.ink,
                fontSize: 84,
                fontWeight: 900,
                padding: '18px 40px',
                borderRadius: 28,
                letterSpacing: -2,
              }}
            >
              {L.label}
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ fontSize: 88, fontWeight: 900, color: '#0b0f14', letterSpacing: -3, lineHeight: 1 }}>Should I go to the ER?</div>
            <div style={{ fontSize: 40, fontWeight: 700, color: '#374151' }}>Get a clear answer in 60 seconds.</div>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 34, fontWeight: 700, color: '#0b0f14' }}>Free symptom check · 60 seconds</div>
          <div style={{ fontSize: 34, fontWeight: 800, color: '#15803d' }}>freedoc.live</div>
        </div>
      </div>
    ),
    {
      width: w,
      height: h,
      fonts: [
        { name: 'Noto Sans', data: f700, weight: 700, style: 'normal' },
        { name: 'Noto Sans', data: f900, weight: 900, style: 'normal' },
      ],
    }
  );

  if (url.searchParams.get('download')) {
    const buf = await img.arrayBuffer();
    return new Response(buf, {
      headers: { 'content-type': 'image/png', 'content-disposition': 'attachment; filename="freedoc-result.png"' },
    });
  }
  return img;
}
