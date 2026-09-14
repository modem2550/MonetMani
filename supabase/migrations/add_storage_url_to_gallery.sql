-- เพิ่มคอลัมน์ storage_url ให้ photo_data และ video_data
-- เก็บ URL ของรูป/thumbnail ที่ sync เข้า Supabase Storage bucket "event-images" แล้ว
-- (รูปแบบค่า: "/assets/images/gallery-photo-<id>/main-<hash>.webp")
-- ค่า thumbnail_url เดิม (ลิงก์ต้นทางภายนอก) ยังเก็บไว้เหมือนเดิม ไม่ถูกลบ/ทับ

alter table public.photo_data
    add column if not exists storage_url text;

alter table public.video_data
    add column if not exists storage_url text;

-- (ไม่บังคับ) index เผื่ออยาก query หาแถวที่ยังไม่ได้ sync บ่อยๆ
create index if not exists idx_photo_data_storage_url_null
    on public.photo_data (id)
    where storage_url is null;

create index if not exists idx_video_data_storage_url_null
    on public.video_data (id)
    where storage_url is null;
