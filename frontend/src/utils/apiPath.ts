export function apiPath(
    strings: TemplateStringsArray,
    ...values: unknown[]
  ): string {
    return strings.reduce(
      (result, string, i) => result + string + (values[i] ?? ""),
      ""
    );
  }
  