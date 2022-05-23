import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getFirelord } from "firelordjs";
import { PollMeta } from "@/models/poll";
import { TeamMeta } from "@/models/team";

export const config = {
  apiKey: "AIzaSyAje8APkg5wJ-6tI0e8-uBEcmOrOVzU90w",
  authDomain: "example-polls-d56fa.firebaseapp.com",
  projectId: "example-polls-d56fa",
  storageBucket: "example-polls-d56fa.appspot.com",
  messagingSenderId: "316304950997",
  appId: "1:316304950997:web:506188646eba1020bc845c",
};

const app = initializeApp(config);
const db = getFirestore(app);

const firelordPolls = getFirelord<PollMeta>(db);
const firelordTeams = getFirelord<TeamMeta>(db);
export const polls = firelordPolls("polls");
export const teams = firelordTeams("teams");
