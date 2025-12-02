import { Table, TableHeader, TableRow, TableCell, TableDivider } from "@/components/ui/Table";
import React from "react";

interface Props {
  header: React.ReactNode;
  rows: React.ReactNode;
  topContent?: React.ReactNode;
  columns?: string; // grid-template-columns 값
}


export default function TableSection({ header, rows, topContent, columns = "1fr 1fr 1fr" }: Props) {
  const rowsArray = React.Children.toArray(rows)
    .flatMap((row) => {
      if (React.isValidElement(row) && row.type === React.Fragment) {
        return React.Children.toArray(row.props.children);
      }
      return [row];
    });

  return (
    <section className="rounded-3xl bg-[#F3F6F8] px-4 py-5 mt-6">

      {topContent && <div className="mb-5">{topContent}</div>}

      <Table>
        <TableHeader columns={columns}>{header}</TableHeader>
        <TableDivider />

        {rowsArray.map((row, index) => {
          const content =
            React.isValidElement(row) && row.type !== React.Fragment
              ? React.cloneElement(row as any, { columns })
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
