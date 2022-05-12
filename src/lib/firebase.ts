import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getFirelord } from "firelordjs";
import { PollMeta } from "@/models/poll";
import { TeamMeta } from "@/models/team";

export const config = {
  apiKey: "AIzaSyB5WgpscRFXvipUzrNf3Nm6sgswofTtxns",
  authDomain: "polls-652dc.firebaseapp.com",
  projectId: "polls-652dc",
  storageBucket: "polls-652dc.appspot.com",
  messagingSenderId: "1077819729519",
  appId: "1:1077819729519:web:843fc1d4e141f425870f9a",
  measurementId: "G-TN79L3EEBY",
};

const app = initializeApp(config);
const db = getFirestore(app);

const firelordPolls = getFirelord<PollMeta>(db);
const firelordTeams = getFirelord<TeamMeta>(db);
export const polls = firelordPolls("polls");
export const teams = firelordTeams("teams");
