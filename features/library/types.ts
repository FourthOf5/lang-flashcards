export type GroupColor = "coral" | "blue" | "yellow" | "green";

export interface CardGroup {
  id: number;
  name: string;
  description: string;
  color: GroupColor;
  cardCount: number;
}

export interface MemoryCard {
  id: number;
  groupId: number;
  spanish: string;
  english: string;
  note: string;
  groupName: string;
  groupColor: GroupColor;
}

export interface GroupInput {
  name: string;
  description: string;
  color: GroupColor;
}

export interface CardInput {
  groupId: number;
  spanish: string;
  english: string;
  note: string;
}
