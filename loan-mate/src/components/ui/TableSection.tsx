import { Table, TableHeader, TableDivider, TableRow } from "@/components/ui/Table";
import React from "react";

interface Props {
  header: React.ReactNode;
  rows: React.ReactNode;
  topContent?: React.ReactNode;
  columns?: string;
}

export default function TableSection({
  header,
  rows,
  topContent,
  columns = "1fr 1fr 1fr",
}: Props) {

  // Fragment 내부 flatten
  const rowsArray = React.Children.toArray(rows).flatMap((row) => {
    if (React.isValidElement(row) && row.type === React.Fragment) {
      const fragment = row as React.ReactElement<{ children?: React.ReactNode }>;
      return React.Children.toArray(fragment.props.children);
    }
    return [row];
  });

  // 타입 가드
  const isTableRowElement = (
    element: React.ReactNode
  ): element is React.ReactElement<{ columns?: string }> => {
    return React.isValidElement(element) && element.type === TableRow;
  };

  return (
    <section className="rounded-3xl bg-[#F3F6F8] px-4 py-5 mt-6">
      {topContent && <div className="mb-5">{topContent}</div>}

      <Table>
        <TableHeader columns={columns}>{header}</TableHeader>
        <TableDivider />

        {rowsArray.map((row, index) => {
          const content = isTableRowElement(row)
            ? React.cloneElement(row, { columns }) // ★ 타입 안전하게 columns 전달
            : row;

          return (
            <div key={index}>
              {content}
              {index < rowsArray.length - 1 && <TableDivider />}
            </div>
          );
        })}
      </Table>
    </section>
  );
}
