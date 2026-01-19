const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export function apiPath(
  strings: TemplateStringsArray,
  ...values: unknown[]
): string {
  const path = strings.reduce(
    (result, str, i) => result + str + (values[i] ?? ""),
    ""
  );

  return `${BASE_URL}${path}`;
}
