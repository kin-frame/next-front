import { Stack } from "@mui/material";

import Login from "./_components/LoginSection";

export default function Home() {
  return (
    <Stack
      sx={{ alignItems: "center", justifyContent: "center", height: "100vh" }}
    >
      <Login url={`${process.env.API_URL}/auth/google`} />
    </Stack>
  );
}
