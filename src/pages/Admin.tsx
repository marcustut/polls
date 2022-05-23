import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  Heading,
  Text,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  TextField,
} from "@modulz/design-system";
import {
  HamburgerMenuIcon,
  Pencil2Icon,
  PlusIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import {
  arrayUnion,
  updateDoc,
  arrayRemove,
  onSnapshot,
  query,
  getDoc,
  deleteDoc,
  setDoc,
} from "firelordjs";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import { useSigninCheck, useAuth } from "reactfire";
import { Icon } from "@iconify/react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  Auth,
  getAuth,
} from "firebase/auth";

import { DarkThemeButton } from "@/components/DarkThemeButton";
import { LogOutButton } from "@/components/LogOutButton";
import { Team } from "@/models/team";
import { useFirelord } from "@/providers/FirelordProvider";

const signIn = (auth: Auth) => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider);
};

type CleanedTeam = Team & { name: string };

const POLL_ID = "First Poll";

export const Admin: FunctionComponent = () => {
  const auth = getAuth();
  const { data } = useSigninCheck();
  const { polls, teams } = useFirelord();
  const [_teams, setTeams] = useState<CleanedTeam[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<CleanedTeam>();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"edit" | "new" | "delete">("new");
  const [newTeam, setNewTeam] = useState<CleanedTeam>({ name: "", points: 0 });

  useEffect(() => {
    const unsubscribe = onSnapshot(query(teams.collection()), (result) => {
      const teams = result.docs.map((doc) => ({ name: doc.id, ...doc.data() }));
      setTeams(teams);
    });
    return () => unsubscribe();
  }, []);

  const addTeam = useCallback(
    (id: string, points: number) => {
      toast.promise(
        Promise.all([
          setDoc(teams.doc(id), { points }),
          updateDoc(polls.doc(POLL_ID), { teams: arrayUnion(id) }),
        ]),
        {
          pending: "Adding team...",
          error: "An error occured when adding team",
          success: "Successfully added team",
        }
      );
      setOpen(false);
    },
    [teams, polls]
  );

  const deleteTeam = useCallback(
    (id: string) => {
      toast.promise(
        Promise.all([
          deleteDoc(teams.doc(id)),
          updateDoc(polls.doc(POLL_ID), { teams: arrayRemove(id) }),
        ]),
        {
          pending: "Deleting team...",
          error: "An error occured when deleting team",
          success: "Successfully deleted team",
        }
      );
      setOpen(false);
    },
    [teams, polls]
  );

  const updateTeam = useCallback(
    (id: string, points: number) => {
      toast.promise(updateDoc(teams.doc(id), { points }), {
        pending: "Updating team...",
        error: "An error occured when updating team",
        success: "Successfully updated team",
      });
      setOpen(false);
    },
    [teams]
  );

  if (!data)
    return (
      <>
        <DarkThemeButton />

        <Box css={{ height: "$8" }} />

        <Box css={{ m: "0 $4" }}>
          <Heading css={{ mb: "$6", scrollMarginTop: "$7" }}>
            Loading...
          </Heading>
        </Box>
      </>
    );

  if (!data.signedIn)
    return (
      <>
        <Helmet>
          <title>Sign In</title>
        </Helmet>

        <DarkThemeButton />

        <Box css={{ height: "$8" }} />

        <Box css={{ m: "0 $4" }}>
          <Heading css={{ mb: "$6", scrollMarginTop: "$7" }}>
            Sign in to continue.
          </Heading>

          <Button size="3" css={{ width: "100%" }} onClick={() => signIn(auth)}>
            <Icon icon="logos:google-icon" style={{ marginRight: "8px" }} />{" "}
            Continue with Google
          </Button>
        </Box>
      </>
    );

  return (
    <>
      <Helmet>
        <title>Admin</title>
      </Helmet>

      <LogOutButton />
      <DarkThemeButton />

      <Box css={{ height: "$8" }} />

      <Box css={{ m: "0 $4" }}>
        <Heading css={{ mb: "$6", scrollMarginTop: "$7" }}>
          This admin page is for managing team scores.
        </Heading>
        <Table>
          <Thead>
            <Tr>
              <Th css={{ width: 190 }}>Name</Th>
              <Td align="center">Points</Td>
              <Td css={{ width: 100 }} align="center"></Td>
            </Tr>
          </Thead>
          <Tbody css={{ color: "$gray12" }}>
            {_teams
              .sort((a, b) => b.points - a.points)
              .map((team) => (
                <Tr key={team.name}>
                  <Th css={{ width: 190 }}>{team.name}</Th>
                  <Td align="center">{team.points}</Td>
                  <Td css={{ width: 100 }} align="center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button css={{ borderRadius: "$1", padding: "$1" }}>
                          <HamburgerMenuIcon />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Choose an action</DropdownMenuLabel>
                        <DropdownMenuGroup>
                          <DropdownMenuItem
                            css={{
                              display: "flex",
                              justifyContent: "start",
                            }}
                            onClick={() => {
                              setMode("edit");
                              setOpen(true);
                              setSelectedTeam(team);
                            }}
                          >
                            <Pencil2Icon style={{ marginRight: "8px" }} />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            css={{
                              display: "flex",
                              justifyContent: "start",
                              "&:hover": { background: "$red10" },
                            }}
                            onClick={() => {
                              setMode("delete");
                              setOpen(true);
                              setSelectedTeam(team);
                            }}
                          >
                            <TrashIcon style={{ marginRight: "8px" }} />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>

        <Box css={{ display: "flex", justifyContent: "end", marginTop: "$4" }}>
          <Button
            onClick={() => {
              setMode("new");
              setOpen(true);
              setSelectedTeam(undefined);
            }}
          >
            <PlusIcon style={{ marginRight: "4px" }} /> Add Group
          </Button>
        </Box>
      </Box>

      <Dialog
        open={open}
        onOpenChange={(open) => {
          setOpen(open);
          setSelectedTeam(undefined);
        }}
      >
        <DialogContent>
          <Text size="5" as="h6" css={{ fontWeight: 500, mb: "$3" }}>
            {mode === "new"
              ? "Create Team"
              : mode === "edit"
              ? `Editing Team`
              : "Are you sure?"}
          </Text>
          {(mode === "new" || mode === "edit") && (
            <>
              <Text size="1" as="label" css={{ mb: "$1", color: "$gray10" }}>
                Group Name
              </Text>
              <TextField
                size="2"
                placeholder="Group Name"
                defaultValue={selectedTeam ? selectedTeam.name : undefined}
                disabled={mode === "edit"}
                onChange={(e) =>
                  setNewTeam({ ...newTeam, name: e.target.value })
                }
              />
              <Box css={{ height: "$2" }} />
              <Text size="1" as="label" css={{ mb: "$1", color: "$gray10" }}>
                Points
              </Text>
              <TextField
                size="2"
                type="number"
                placeholder="Points"
                defaultValue={selectedTeam ? selectedTeam.points : undefined}
                onChange={(e) =>
                  setNewTeam({
                    ...newTeam,
                    points: parseInt(e.target.value) ?? 0,
                  })
                }
              />
            </>
          )}
          <Button
            variant={
              mode === "new" ? "green" : mode === "edit" ? "blue" : "red"
            }
            size="2"
            css={{ mt: "$4", width: "100%" }}
            onClick={
              mode === "new"
                ? () => addTeam(newTeam.name, newTeam.points)
                : mode === "edit" && selectedTeam
                ? () => updateTeam(selectedTeam.name, newTeam.points)
                : mode === "delete" && selectedTeam
                ? () => deleteTeam(selectedTeam.name)
                : () => {}
            }
          >
            {mode === "new" ? "Create" : mode === "edit" ? "Submit" : "Delete"}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};
