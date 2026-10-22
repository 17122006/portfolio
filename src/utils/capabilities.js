let webglSupport;

/** Checks for WebGL once, then releases the probe context straight away. */
export function detectWebGL() {
  if (webglSupport !== undefined) return webglSupport;
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    webglSupport = Boolean(window.WebGLRenderingContext && gl);
    gl?.getExtension('WEBGL_lose_context')?.loseContext();
  } catch {
    webglSupport = false;
  }
  return webglSupport;
}

/** Very small devices / data-saver mode get the static visual instead of WebGL. */
export function isLowPowerDevice() {
  const nav = window.navigator;
  const fewCores = typeof nav.hardwareConcurrency === 'number' && nav.hardwareConcurrency <= 2;
  const lowMemory = typeof nav.deviceMemory === 'number' && nav.deviceMemory <= 2;
  const saveData = nav.connection?.saveData === true;
  return fewCores || lowMemory || saveData;
}

/** Phones/tablets get a lighter 3D scene (fewer polygons, no antialias, lower pixel ratio, no pointer tracking). */
export function isMobileDevice() {
  const mq = (q) => window.matchMedia?.(q).matches === true;
  return mq('(pointer: coarse)') || mq('(max-width: 899.95px)');
}
