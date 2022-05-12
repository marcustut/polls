import { MetaTypeCreator, ServerTimestamp } from "firelordjs";

export type Poll = {
  teams: string[];
  createdAt: ServerTimestamp;
};

export type PollMeta = MetaTypeCreator<Poll, "polls", string>;
