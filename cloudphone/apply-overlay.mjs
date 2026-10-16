import {copyFile, readFile, writeFile, access} from 'node:fs/promises';
import {resolve} from 'node:path';

const root = process.cwd();
const sourceStyle = resolve(root, 'cloudphone/telelite.scss');
const targetStyle = resolve(root, 'src/scss/cloudphone.scss');
const entryFile = resolve(root, 'src/index.ts');

for (const path of [sourceStyle, entryFile]) {
  try {
    await access(path);
  } catch {
    console.error(`TeleLite overlay: required file not found: ${path}`);
    console.error('Run this from the root of the Telegram Web K source tree with the cloudphone/ folder copied in.');
    process.exit(1);
  }
}

await copyFile(sourceStyle, targetStyle);
let entry = await readFile(entryFile, 'utf8');
const importLine = "import '@/scss/cloudphone.scss';";
if (!entry.includes(importLine)) {
  const anchor = "import '@/scss/style.scss';";
  if (!entry.includes(anchor)) {
    throw new Error('Could not locate the style.scss import in src/index.ts; upstream source layout may have changed.');
  }
  entry = entry.replace(anchor, `${anchor}\n${importLine}`);
  await writeFile(entryFile, entry);
}
console.log('TeleLite CloudPhone theme installed into src/scss/cloudphone.scss.');
