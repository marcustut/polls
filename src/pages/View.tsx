import { DarkThemeButton } from "@/components/DarkThemeButton";
import { Team } from "@/models/team";
import { useFirelord } from "@/providers/FirelordProvider";
import { Box, config } from "@modulz/design-system";
import { getDoc, onSnapshot, query } from "firelordjs";
import { FunctionComponent, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

type CleanedTeam = Team & { name: string };

const POLL_ID = "yIK2lpYedYdNCMabzjDy";

export const View: FunctionComponent = () => {
  const { polls, teams } = useFirelord();
  const [_teams, setTeams] = useState<CleanedTeam[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(query(teams.collection()), (result) => {
      const teams = result.docs.map((doc) => ({ name: doc.id, ...doc.data() }));
      setTeams(teams);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Helmet>
        <title>View</title>
      </Helmet>

      <DarkThemeButton />

      <Box css={{ height: "$8" }} />

      <Box css={{ height: "80vh", width: "90vw", m: "0 auto" }}>
        <ResponsiveContainer height="100%" width="100%">
          <BarChart width={500} height={40} data={_teams}>
            <Tooltip />
            <YAxis />
            <XAxis dataKey="name" />
            <Bar dataKey="points" fill={config.theme.colors.tomato8} />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </>
  );
};
