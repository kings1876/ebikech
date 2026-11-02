// Runs after `next build`. The prerendered pages are complete HTML (real links, real text), so the framework
// scripts do not need to compete with the stylesheet and the first image for bandwidth. This takes their
// <script src> and preload tags out of the HTML and loads them once the page has loaded and its largest element
// has painted (or at the first touch, click or key press, or after 4 s, whichever comes first), which keeps them
// out of the Largest Contentful Paint path.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve('.next/server/app');
const MARK = '<!--defer-js-->';

const SCRIPT_TAG = /<script\s+src="(\/_next\/static\/[^"]+\.js)"([^>]*)><\/script>/g;
const PRELOAD_TAG = /<link\s[^>]*as="script"[^>]*\/?>/g;

function loader(urls) {
  return (
    '<script>(function(){var u=' + JSON.stringify(urls) +
    ',d=0,l=0,p=0,ev=["pointerdown","touchstart","keydown"];' +
    'function go(){if(d)return;d=1;for(var i=0;i<ev.length;i++)removeEventListener(ev[i],go,true);' +
    'for(var j=0;j<u.length;j++){var s=document.createElement("script");s.src=u[j];s.async=true;document.head.appendChild(s)}}' +
    'for(var k=0;k<ev.length;k++)addEventListener(ev[k],go,{capture:true,passive:true});' +
    'function chk(){if(l&&p)setTimeout(go,300)}' +
    'try{new PerformanceObserver(function(){if(!p){p=1;chk()}}).observe({type:"largest-contentful-paint",buffered:true})}catch(e){p=1}' +
    'function ld(){l=1;chk();setTimeout(go,4000)}' +
    'if(document.readyState==="complete")ld();else addEventListener("load",ld)})()</script>'
  );
}

let files = 0;
let patched = 0;
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.html')) {
      files++;
      const html = fs.readFileSync(p, 'utf8');
      if (html.includes(MARK)) continue;
      const urls = [];
      let out = html.replace(SCRIPT_TAG, (all, src, rest) => {
        if (/noModule/i.test(rest)) return all; // legacy-browser fallback stays as it is
        urls.push(src);
        return '';
      });
      if (!urls.length) continue;
      out = out.replace(PRELOAD_TAG, '');
      const i = out.lastIndexOf('</body>');
      if (i < 0) continue;
      out = out.slice(0, i) + MARK + loader([...new Set(urls)]) + out.slice(i);
      fs.writeFileSync(p, out);
      patched++;
    }
  }
})(ROOT);

console.log(`defer-js: patched ${patched} of ${files} prerendered pages`);
if (files > 0 && patched === 0) {
  console.error('defer-js: no scripts found to defer, build output layout may have changed');
  process.exit(1);
}
