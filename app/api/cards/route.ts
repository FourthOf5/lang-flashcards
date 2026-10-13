import { asc, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { cards, groups } from "@/db/schema";
import {
  errorResponse,
  readOptionalText,
  readPositiveInteger,
  readRequiredText,
} from "@/lib/api-validation";

export const dynamic = "force-dynamic";

export const GET = async (request: Request): Promise<Response> => {
  try {
    const groupIdValue = new URL(request.url).searchParams.get("groupId");
    const groupId = groupIdValue
      ? readPositiveInteger(groupIdValue, "Group id")
      : null;

    const rows = await getDb()
      .select({
        id: cards.id,
        groupId: cards.groupId,
        spanish: cards.spanish,
        english: cards.english,
        note: cards.note,
        groupName: groups.name,
        groupColor: groups.color,
      })
      .from(cards)
      .innerJoin(groups, eq(cards.groupId, groups.id))
      .where(groupId ? eq(cards.groupId, groupId) : undefined)
      .orderBy(asc(groups.name), asc(cards.spanish));

    return Response.json(rows);
  } catch (error) {
    return errorResponse(error);
  }
};

export const POST = async (request: Request): Promise<Response> => {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const [created] = await getDb()
      .insert(cards)
      .values({
        groupId: readPositiveInteger(body.groupId, "Group"),
        spanish: readRequiredText(body.spanish, "Spanish word"),
        english: readRequiredText(body.english, "English word"),
        note: readOptionalText(body.note),
      })
      .returning();

    return Response.json(created, { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
};
