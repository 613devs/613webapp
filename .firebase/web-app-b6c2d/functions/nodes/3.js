import * as universal from '../entries/pages/about/_page.ts.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/about/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/about/+page.ts";
export const imports = ["_app/immutable/nodes/3.b395d183.js","_app/immutable/chunks/environment.c65a56ab.js","_app/immutable/chunks/scheduler.6f4350a0.js","_app/immutable/chunks/index.a2aaaa84.js"];
export const stylesheets = [];
export const fonts = [];
