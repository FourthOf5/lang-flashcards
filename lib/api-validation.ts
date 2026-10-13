export const readRequiredText = (value: unknown, field: string): string => {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${field} is required.`);
  }

  return value.trim();
};

export const readOptionalText = (value: unknown): string =>
  typeof value === "string" ? value.trim() : "";

export const readPositiveInteger = (value: unknown, field: string): number => {
  const parsed = typeof value === "number" ? value : Number(value);

  if (!Number.isInteger(parsed) || parsed < 1) {
    throw new Error(`${field} must be a positive integer.`);
  }

  return parsed;
};

export const errorResponse = (error: unknown): Response =>
  Response.json(
    { error: error instanceof Error ? error.message : "Something went wrong." },
    { status: 400 },
  );
