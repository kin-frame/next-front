import {
  Skeleton,
  SkeletonProps,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableCellProps,
  TableHead,
  TableRow,
} from "@mui/material";

import EllipsisTableCell from "./EllipsisTableCell";

type TableColumnType<T extends Record<string, React.ReactNode>> = {
  [K in keyof T]: {
    dataIndex: K;
    key: string;
    title?: React.ReactNode;
    onHeaderCellSx?: () => TableCellProps["sx"];
    render?: (value: T[K], record: T, index: number) => React.ReactNode;
    onCellSx?: (value: T[K], record: T, index: number) => TableCellProps["sx"];
    titleAlign?: "center" | "left" | "right" | "justify" | "inherit";
    align?: "center" | "left" | "right" | "justify" | "inherit";
    colSpan?: number;
    width?: string;
    /** ellipsis 처리가 필요한 column에 적용 */
    ellipsis?: boolean;
    /** Skeleton 추가 설정이 필요하면 적용 */
    skeleton?: SkeletonProps;
  };
}[keyof T];

type TableColumnArrayType<T extends Record<string, React.ReactNode>> =
  TableColumnType<T>[];

export type RecordTableProps<T extends Record<string, React.ReactNode>> = {
  data: T[];
  columns: TableColumnArrayType<T>;
  caption: string;
  size?: number;
  emptyComponent?: React.ReactNode;
  tableLayout?: "auto" | "fixed";
  enableSkeleton?: {
    size: number;
    height?: SkeletonProps["height"];
  };
  isFetching?: boolean;
};

export default function RecordTable<T extends Record<string, React.ReactNode>>({
  caption,
  columns,
  data,
  size,
  emptyComponent,
  tableLayout = "fixed",
  enableSkeleton,
  isFetching,
}: RecordTableProps<T>) {
  return (
    <Table
      sx={{
        position: "relative",
        "td, th": {
          fontSize: "15px",
          py: "8px",
          px: "8px",
          lineHeight: "150%",
          wordBreak: "break-all",
        },
        "td.EllipsisTableCell": {
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          overflow: "hidden",
        },
        tableLayout: tableLayout,
        caption: {
          position: "absolute",
          width: "1px",
          height: "1px",
          padding: "0",
          margin: -"1px",
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          whiteSpace: "nowrap",
          border: "0",
        },
      }}
    >
      <caption>{caption}</caption>
      <colgroup>
        {columns.map((column) => (
          <col key={column.key} style={{ width: column.width }} />
        ))}
      </colgroup>
      <TableHead>
        <TableRow
          sx={{
            th: {
              bgcolor: "gray.50",
              fontWeight: 700,
              whiteSpace: "pre-line",
            },
          }}
        >
          {columns.map((column) => (
            <TableCell
              key={column.key}
              sx={column.onHeaderCellSx && column.onHeaderCellSx()}
              align={column.titleAlign ?? column.align}
            >
              {column.title}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {enableSkeleton &&
          isFetching &&
          new Array(enableSkeleton.size).fill(0).map((_v, i) => (
            <TableRow key={`row_${i}`}>
              {columns.map((column, j) => (
                <EllipsisTableCell
                  key={`data_${i}_${j}`}
                  className={column.ellipsis ? "EllipsisTableCell" : ""}
                  ellipsis={column.ellipsis}
                  align={column.align}
                >
                  <Skeleton
                    sx={{ display: "inline-block" }}
                    width="60%"
                    variant="text"
                    {...column.skeleton}
                  />
                </EllipsisTableCell>
              ))}
            </TableRow>
          ))}
        {(!enableSkeleton || !isFetching) &&
          data.map((v, i) => (
            <TableRow key={`row_${i}`}>
              {columns.map((column, j) => (
                <EllipsisTableCell
                  key={`data_${i}_${j}`}
                  sx={
                    column.onCellSx && {
                      [`&.${tableCellClasses.root}`]: column.onCellSx(
                        v[column.dataIndex],
                        v,
                        j
                      ),
                    }
                  }
                  className={column.ellipsis ? "EllipsisTableCell" : ""}
                  ellipsis={column.ellipsis}
                  align={column.align}
                >
                  {column.render && typeof column.render === "function"
                    ? column.render(v[column.dataIndex], v, i)
                    : v[column.dataIndex]}
                </EllipsisTableCell>
              ))}
            </TableRow>
          ))}
        {!!size &&
          !!data.length &&
          new Array(size - data.length).fill(0).map((v, i) => (
            <TableRow key={i}>
              <TableCell colSpan={columns.length}>&nbsp;</TableCell>
            </TableRow>
          ))}
        {data.length === 0 && !isFetching && (
          <TableRow sx={{ height: 43 * (size ?? 1) }}>
            <TableCell
              colSpan={columns.length}
              align="center"
              sx={{
                height: "200px",
              }}
            >
              {emptyComponent ?? "검색결과가 없습니다."}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
