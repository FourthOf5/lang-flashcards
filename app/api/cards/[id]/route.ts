import { eq, sql } from "drizzle-orm";
import { getDb } from "@/db";
import { cards } from "@/db/schema";
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
      .update(cards)
      .set({
        groupId: readPositiveInteger(body.groupId, "Group"),
        spanish: readRequiredText(body.spanish, "Spanish word"),
        english: readRequiredText(body.english, "English word"),
        note: readOptionalText(body.note),
        updatedAt: sql`CURRENT_TIMESTAMP`,
      })
      .where(eq(cards.id, readPositiveInteger(id, "Card id")))
      .returning();

    if (!updated) {
      return Response.json({ error: "Card not found." }, { status: 404 });
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
      .delete(cards)
      .where(eq(cards.id, readPositiveInteger(id, "Card id")))
      .returning({ id: cards.id });

    if (!deleted) {
      return Response.json({ error: "Card not found." }, { status: 404 });
    }

    return Response.json(deleted);
  } catch (error) {
    return errorResponse(error);
  }
};
