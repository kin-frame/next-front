"use client";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useAtom } from "jotai";

import { listTypeAtom } from "../_atoms/listType";

export default function ToggleListType() {
  const [listType, setListType] = useAtom(listTypeAtom);

  return (
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
  );
}
