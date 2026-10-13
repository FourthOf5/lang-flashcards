import { asc, count, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { cards, groups } from "@/db/schema";
import {
  errorResponse,
  readOptionalText,
  readRequiredText,
} from "@/lib/api-validation";

export const dynamic = "force-dynamic";

export const GET = async (): Promise<Response> => {
  const rows = await getDb()
    .select({
      id: groups.id,
      name: groups.name,
      description: groups.description,
      color: groups.color,
      cardCount: count(cards.id),
    })
    .from(groups)
    .leftJoin(cards, eq(groups.id, cards.groupId))
    .groupBy(groups.id)
    .orderBy(asc(groups.name));

  return Response.json(rows);
};

export const POST = async (request: Request): Promise<Response> => {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const [created] = await getDb()
      .insert(groups)
      .values({
        name: readRequiredText(body.name, "Group name"),
        description: readOptionalText(body.description),
        color: readOptionalText(body.color) || "coral",
      })
      .returning();

    return Response.json({ ...created, cardCount: 0 }, { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
};
