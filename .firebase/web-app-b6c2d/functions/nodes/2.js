import * as universal from '../entries/pages/_page.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+page.ts";
export const imports = ["_app/immutable/nodes/2.e51c0105.js","_app/immutable/chunks/scheduler.6f4350a0.js","_app/immutable/chunks/index.a2aaaa84.js","_app/immutable/chunks/index.6cc25391.js"];
export const stylesheets = ["_app/immutable/assets/2.1804738b.css"];
export const fonts = [];
