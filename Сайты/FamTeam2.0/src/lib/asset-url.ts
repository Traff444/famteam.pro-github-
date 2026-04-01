/** Prepend BASE_URL to absolute asset paths for GitHub Pages compatibility */
export function assetUrl(path: string): string {
  const base = import.meta.env.BASE_URL;
  // Remove leading slash from path since base already ends with /
  return base + path.replace(/^\//, "");
}
