import { MetaTypeCreator } from "firelordjs";

export type Team = {
  points: number;
};

export type TeamMeta = MetaTypeCreator<Team, "teams", string>;
