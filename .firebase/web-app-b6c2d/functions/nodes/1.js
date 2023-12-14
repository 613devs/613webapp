

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.d016fd21.js","_app/immutable/chunks/scheduler.6f4350a0.js","_app/immutable/chunks/index.a2aaaa84.js","_app/immutable/chunks/stores.1a5d395d.js","_app/immutable/chunks/singletons.9ba51318.js","_app/immutable/chunks/index.6cc25391.js"];
export const stylesheets = [];
export const fonts = [];
