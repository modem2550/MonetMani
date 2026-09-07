/**
 * URL safety helpers
 *
 * ข้อมูล event (link, image_url, image_urls) มาจาก Supabase โดยตรง
 * และถูกเอาไปใส่ใน href / inline style ของหน้าเว็บ
 * ฟังก์ชันในไฟล์นี้ทำหน้าที่ตรวจสอบก่อนว่าเป็น URL ที่ "ปลอดภัยพอ" จะ render
 * เพื่อป้องกัน scheme แปลกๆ (เช่น javascript:) และป้องกันการ CSS-injection
 * ผ่านทาง background-image: url('...')
 */

const SAFE_PROTOCOLS = new Set(['http:', 'https:']);

/**
 * ตรวจสอบว่า string ที่ได้มาเป็น http(s) URL ที่ใช้งานได้จริงหรือไม่
 * ใช้สำหรับ validate ก่อนใส่ค่าลงใน href หรือ url()
 */
export function isSafeHttpUrl(value: unknown): value is string {
  if (typeof value !== 'string' || value.trim() === '') return false;
  try {
    const parsed = new URL(value, 'https://placeholder.invalid');
    // ถ้า value เป็น relative path (เช่น /img/x.jpg) parsed.protocol จะกลายเป็น https:
    // จาก base url ปลอม แต่เราต้องแยกแยะ relative path ที่ขึ้นต้นด้วย '/' ว่าโอเค
    if (value.startsWith('/')) return true;
    return SAFE_PROTOCOLS.has(parsed.protocol);
  } catch {
    return false;
  }
}

/**
 * คืนค่า href ที่ปลอดภัยสำหรับใช้งาน หรือ undefined ถ้า URL ไม่ผ่านการตรวจสอบ
 * (ปล่อยให้ caller ตัดสินใจ fallback เอง เช่น ไม่ render <a> เลย)
 */
export function safeHref(value: unknown): string | undefined {
  return isSafeHttpUrl(value) ? (value as string) : undefined;
}

/**
 * แปลง URL ของ Supabase storage ให้เป็น proxied asset URL
 * เช่น https://ekiockkaoxakovrdssva.supabase.co/storage/v1/object/public/event-images/369/medium-xxx.webp
 * -> /assets/images/369/medium-xxx.webp
 */
export function normalizeStorageUrl(url: string): string {
  if (typeof url !== 'string') return url;
  return url
    .replace(
      /^https:\/\/[^/]+\.supabase\.co\/storage\/v1\/object\/public\/event-images\//,
      '/assets/images/'
    )
    .replace(
      /^https:\/\/monimonetfans\.vercel\.app\/assets\/images\//,
      '/assets/images/'
    );
}

/**
 * คืนค่า URL รูปภาพที่ปลอดภัย พร้อม escape สำหรับใช้ใน CSS url('...')
 * ถ้า URL ไม่ผ่านการตรวจสอบ จะคืนค่า fallback แทน
 */
export function safeImageUrl(value: unknown, fallback = '/img/placeholder.jpg'): string {
  if (!isSafeHttpUrl(value)) return fallback;
  return normalizeStorageUrl(value as string);
}

/**
 * Escape ค่าที่จะเอาไปแทรกใน CSS single-quoted string เช่น
 * style={`background-image:url('${cssUrlEscape(url)}')`}
 * ป้องกันไม่ให้ค่าที่มี ' หรือ \ หลุดออกจาก string literal ของ CSS
 */
export function cssUrlEscape(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}
