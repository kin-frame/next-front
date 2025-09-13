import { Stack } from "@mui/material";

import Login from "./_components/LoginSection";

export default function Home() {
  return (
    <Stack sx={{ py: "80px", alignItems: "center" }}>
      <Login url={`${process.env.API_URL}/auth/google`} />
    </Stack>
  );
}
