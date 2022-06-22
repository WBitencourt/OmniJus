
export function uid(): string {
  const unique = String(
    Date.now().toString(32) +
    Math.random().toString(16)
  ).replace(/\./g, '')

  return unique;
}

