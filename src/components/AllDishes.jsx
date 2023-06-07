import React, { useEffect, useState } from "react";
import { getDishes } from "../services/api.js";
import { useTable } from "react-table";
const AllDishes = ({ allDishes }) => {
  const data = React.useMemo(() => allDishes, []);
  const colums = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "_id",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "category",
        accessor: "category",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Label",
        accessor: "label",
      },
      {
        Header: "Description",
        accessor: "description",
      },
    ],
    []
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns: colums, data });

  return (
    <div className="App">
      <h1>All Dishes</h1>
      <div>
        <div className="conatiner">
          <table {...getTableProps()}>
            <thead>
              {headerGroups?.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows?.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()}> {cell.render("Cell")} </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllDishes;
