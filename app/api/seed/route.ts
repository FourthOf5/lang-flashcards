import { count } from "drizzle-orm";
import { getDb } from "@/db";
import { cards, groups } from "@/db/schema";

export const POST = async (): Promise<Response> => {
  const db = getDb();
  const [result] = await db.select({ total: count(groups.id) }).from(groups);

  if (result.total > 0) {
    return Response.json({ seeded: false });
  }

  const createdGroups = await db
    .insert(groups)
    .values([
      {
        name: "Café & breakfast",
        description: "The essentials for an excellent morning.",
        color: "coral",
      },
      {
        name: "Getting around",
        description: "Useful words for streets, stations, and directions.",
        color: "blue",
      },
      {
        name: "Everyday verbs",
        description: "Small verbs that do a lot of work.",
        color: "yellow",
      },
    ])
    .returning();

  const [cafe, travel, verbs] = createdGroups;

  await db.insert(cards).values([
    { groupId: cafe.id, spanish: "el café", english: "coffee", note: "Masculine noun" },
    { groupId: cafe.id, spanish: "el desayuno", english: "breakfast", note: "Desayunar = to have breakfast" },
    { groupId: cafe.id, spanish: "la tostada", english: "toast", note: "Usually a slice of toasted bread" },
    { groupId: cafe.id, spanish: "la cuenta", english: "the bill", note: "La cuenta, por favor." },
    { groupId: travel.id, spanish: "la estación", english: "station", note: "Remember the accent" },
    { groupId: travel.id, spanish: "a la derecha", english: "to the right", note: "Opposite: a la izquierda" },
    { groupId: travel.id, spanish: "todo recto", english: "straight ahead", note: "Useful when asking directions" },
    { groupId: verbs.id, spanish: "querer", english: "to want", note: "Also: to love someone" },
    { groupId: verbs.id, spanish: "poder", english: "to be able to", note: "¿Puedo...? = Can I...?" },
    { groupId: verbs.id, spanish: "encontrar", english: "to find", note: "Stem-changing verb: encuentro" },
  ]);

  return Response.json({ seeded: true }, { status: 201 });
};
