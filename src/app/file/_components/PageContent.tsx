"use client";
import { useAtomValue } from "jotai";

import { listTypeAtom } from "../_atoms/listType";
import FileGrid from "./FileGrid";
import FileList from "./FileList";

export default function PageContent() {
  const listType = useAtomValue(listTypeAtom);

  return (
    <>
      {listType === "grid" && <FileGrid />}
      {listType === "list" && <FileList />}
    </>
  );
}
