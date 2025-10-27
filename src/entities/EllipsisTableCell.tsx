"use client";

import { useEffect, useRef, useState } from "react";
import { TableCell, TableCellProps } from "@mui/material";

type EllipsisTableCellProps = TableCellProps & {
  ellipsis?: boolean;
};

export default function EllipsisTableCell({
  ellipsis,
  ...tableCellProps
}: EllipsisTableCellProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isOverflowed, setIsOverflowed] = useState(false);

  useEffect(() => {
    if (!ellipsis) return;
    if (ref.current) {
      const el = ref.current;
      setIsOverflowed(el.scrollWidth > el.clientWidth);
    }
  }, [ellipsis]);

  return (
    <TableCell
      ref={ref}
      title={
        isOverflowed && typeof tableCellProps.children === "string"
          ? tableCellProps.children
          : ""
      }
      {...tableCellProps}
    />
  );
}
