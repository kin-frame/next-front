"use client";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { Grid, Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useAtom } from "jotai";

import { listTypeAtom } from "../_atoms/listType";

export default function ToggleListType() {
  const [listType, setListType] = useAtom(listTypeAtom);

  return (
    <Grid size={12}>
      <Stack sx={{ flexDirection: "row", justifyContent: "flex-end" }}>
        <ToggleButtonGroup
          value={listType}
          exclusive
          onChange={(event, value) => {
            if (value !== null) {
              setListType(value);
            }
          }}
        >
          <ToggleButton value="grid">
            <GridViewRoundedIcon />
          </ToggleButton>
          <ToggleButton value="list">
            <MenuRoundedIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>
    </Grid>
  );
}
