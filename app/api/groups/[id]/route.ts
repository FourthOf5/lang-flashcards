import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { groups } from "@/db/schema";
import {
  errorResponse,
  readOptionalText,
  readPositiveInteger,
  readRequiredText,
} from "@/lib/api-validation";

type RouteContext = { params: Promise<{ id: string }> };

export const PATCH = async (
  request: Request,
  context: RouteContext,
): Promise<Response> => {
  try {
    const { id } = await context.params;
    const body = (await request.json()) as Record<string, unknown>;
    const [updated] = await getDb()
      .update(groups)
      .set({
        name: readRequiredText(body.name, "Group name"),
        description: readOptionalText(body.description),
        color: readOptionalText(body.color) || "coral",
      })
      .where(eq(groups.id, readPositiveInteger(id, "Group id")))
      .returning();

    if (!updated) {
      return Response.json({ error: "Group not found." }, { status: 404 });
    }

    return Response.json(updated);
  } catch (error) {
    return errorResponse(error);
  }
};

export const DELETE = async (
  _request: Request,
  context: RouteContext,
): Promise<Response> => {
  try {
    const { id } = await context.params;
    const [deleted] = await getDb()
      .delete(groups)
      .where(eq(groups.id, readPositiveInteger(id, "Group id")))
      .returning({ id: groups.id });

    if (!deleted) {
      return Response.json({ error: "Group not found." }, { status: 404 });
    }

    return Response.json(deleted);
  } catch (error) {
    return errorResponse(error);
  }
};
