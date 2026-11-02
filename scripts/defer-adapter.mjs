// Build adapter that runs scripts/defer-js.mjs over the prerendered pages, then hands over to the hosting platform's own
// adapter (Vercel sets NEXT_ADAPTER_PATH). It has to be an adapter because the platform's adapter collects the
// prerendered HTML and takes it out of .next before the build command finishes, so a post-build step never sees it.
import fs from 'node:fs';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import { patchHtmlFile } from './defer-js.mjs';

const platformPath = process.env.NEXT_ADAPTER_PATH;
let platform = null;
if (platformPath) {
  const require = createRequire(import.meta.url);
  const resolved = require.resolve(platformPath, { paths: [process.cwd(), import.meta.dirname] });
  const mod = await import(pathToFileURL(resolved).href);
  platform = mod.default ?? mod;
}

export default {
  name: platform ? `defer-js + ${platform.name}` : 'defer-js',

  async modifyConfig(config, ctx) {
    return platform?.modifyConfig ? platform.modifyConfig(config, ctx) : config;
  },

  async onBuildComplete(ctx) {
    let patched = 0;
    let seen = 0;
    try {
      for (const p of ctx.outputs.prerenders) {
        const file = p.fallback?.filePath;
        if (!file || !file.endsWith('.html') || !fs.existsSync(file)) continue;
        seen++;
        if (patchHtmlFile(file)) patched++;
      }
      console.log(`defer-js: patched ${patched} of ${seen} prerendered pages`);
    } catch (e) {
      console.error('defer-js: skipped, pages are served unchanged:', e);
    }
    if (platform?.onBuildComplete) await platform.onBuildComplete(ctx);
  },
};
