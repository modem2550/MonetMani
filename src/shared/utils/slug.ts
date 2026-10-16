/**
 * Slug utilities
 * รวม logic การสร้าง slug ไว้ที่เดียว กันโค้ดซ้ำ/ไม่ตรงกันระหว่างหน้า index กับ schedule
 */

/**
 * แปลงข้อความเป็น slug: lowercase, ตัดช่องว่างเป็น '-', เอาเฉพาะ a-z 0-9 -
 */
export function toSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[()]/g, '')
    .replace(/[^a-z0-9-]/g, '');
}

/**
 * สร้าง slug สำหรับ event โดยรวม id (หรือบางส่วนของ id) เข้าไปกัน slug ชนกัน
 * @param title ชื่ออีเวนต์
 * @param id id ของอีเวนต์ (จะถูกตัดให้เหลือ 8 ตัวอักษรแรกเพื่อความกระชับ)
 */
export function toEventSlug(title: string | undefined, id: string | number | undefined): string {
  const idPart = String(id ?? '0000').substring(0, 8);
  return `${toSlug(title || 'event')}-${idPart}`;
}
