import { createClient } from '@supabase/supabase-js';
import { appendFile, writeFile } from 'node:fs/promises';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const IMAGE_SYNC_SECRET = process.env.IMAGE_SYNC_SECRET;
const SITE_URL = (process.env.SITE_URL || 'https://monimonetfans.vercel.app').replace(/\/$/, '');
const PAGE_SIZE = 300;
const DELAY_MS = Number(process.env.ASSET_SYNC_DELAY_MS || 350);
const args = new Set(process.argv.slice(2));
const kindArg = [...args].find((arg) => arg.startsWith('--kind='))?.split('=')[1];
const force = args.has('--force');
const dryRun = args.has('--dry-run');
const allowedKinds = ['event', 'photo', 'video'];
const tables = { event: 'event_data', photo: 'photo_data', video: 'video_data' };

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || !IMAGE_SYNC_SECRET) {
  console.error('Missing environment variables. Set SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, and IMAGE_SYNC_SECRET in .env.');
  process.exit(1);
}
if (kindArg && !allowedKinds.includes(kindArg)) {
  console.error('--kind must be event, photo, or video');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});
const reportPath = `asset-sync-report-${new Date().toISOString().replace(/[:.]/g, '-')}.csv`;
const csvCell = (value) => `"${String(value ?? '').replaceAll('"', '""')}"`;
await writeFile(reportPath, 'kind,id,status,storage_url,message\n', 'utf8');

function sourceUrlFor(row, kind) {
  if (kind !== 'event') return typeof row.thumbnail_url === 'string' ? row.thumbnail_url.trim() : '';
  const urls = row.image_urls && typeof row.image_urls === 'object' ? row.image_urls : {};
  return [row.thumbnail_url, row.image_url, urls.storage_large, urls.large, urls.storage_medium, urls.medium]
    .find((value) => typeof value === 'string' && value.trim())?.trim() || '';
}

async function getRows(kind) {
  const table = tables[kind];
  const rows = [];
  for (let start = 0; ; start += PAGE_SIZE) {
    const { data, error } = await supabase.from(table).select('*').order('id', { ascending: true }).range(start, start + PAGE_SIZE - 1);
    if (error) throw new Error(`Read ${table} failed: ${error.message}`);
    rows.push(...(data || []));
    if (!data || data.length < PAGE_SIZE) break;
  }
  return rows;
}

async function logResult(kind, id, status, storageUrl = '', message = '') {
  await appendFile(reportPath, [kind, id, status, storageUrl, message].map(csvCell).join(',') + '\n', 'utf8');
}

let totals = { success: 0, failed: 0, skipped: 0, dry_run: 0 };
const kinds = kindArg ? [kindArg] : allowedKinds;

for (const kind of kinds) {
  let rows;
  try {
    rows = await getRows(kind);
  } catch (error) {
    console.error(`\n[${kind}] ${error.message}`);
    await logResult(kind, '', 'failed_to_read_table', '', error.message);
    totals.failed++;
    continue;
  }

  console.log(`\n=== ${kind}: ${rows.length} rows in ${tables[kind]} ===`);
  for (let index = 0; index < rows.length; index++) {
    const row = rows[index];
    const id = row.id;
    const existingStorageUrl = typeof row.storage_url === 'string' ? row.storage_url.trim() : '';
    const source = sourceUrlFor(row, kind);
    const prefix = `[${index + 1}/${rows.length}] ${kind} id=${id}`;

    if (existingStorageUrl && !force) {
      console.log(`${prefix} — skip (storage_url already set)`);
      await logResult(kind, id, 'skipped_existing_storage_url', existingStorageUrl, 'Use --force to overwrite');
      totals.skipped++;
      continue;
    }
    if (!source) {
      console.log(`${prefix} — skip (no source image URL)`);
      await logResult(kind, id, 'skipped_missing_source', '', 'No usable thumbnail_url/image_url');
      totals.skipped++;
      continue;
    }
    if (dryRun) {
      console.log(`${prefix} — dry run; would sync`);
      await logResult(kind, id, 'dry_run', '', 'No request sent');
      totals.dry_run++;
      continue;
    }

    try {
      const response = await fetch(`${SITE_URL}/api/assets/sync`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-sync-secret': IMAGE_SYNC_SECRET,
        },
        body: JSON.stringify({ kind, id }),
        signal: AbortSignal.timeout(90_000),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.ok) {
        const message = result.error || `HTTP ${response.status}`;
        console.error(`${prefix} — FAILED: ${message}`);
        await logResult(kind, id, 'failed', '', message);
        totals.failed++;
      } else {
        console.log(`${prefix} — OK ${result.storage_url}`);
        await logResult(kind, id, 'success', result.storage_url, '');
        totals.success++;
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error(`${prefix} — FAILED: ${message}`);
      await logResult(kind, id, 'failed', '', message);
      totals.failed++;
    }

    if (DELAY_MS > 0) await new Promise((resolve) => setTimeout(resolve, DELAY_MS));
  }
}

console.log('\n=== Finished ===');
console.log(`Success: ${totals.success} | Failed: ${totals.failed} | Skipped: ${totals.skipped} | Dry run: ${totals.dry_run}`);
console.log(`Report: ${reportPath}`);
