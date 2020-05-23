export function toUpperCamelCase(s: string): string {
  if (s.length === 0) {
    return "";
  } else if (s.length === 1) {
    return s.toUpperCase();
  } else {
    return `${s[0].toUpperCase()}${s.slice(1)}`;
  }
}
