export const toJsonLd = (data: Record<string, unknown>) => {
  return JSON.stringify(data).replace(/</g, "\\u003c")
}
