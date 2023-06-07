// import React, { useState } from "react";

// const Categoriess = ({ data }) => {
//   const [selectedCategory, setSelectedCategory] = React.useState("");

//   const handleCategorySelect = (category) => {
//     setSelectedCategory(category);
//   };

//   const filteredData = selectedCategory
//     ? data.filter((item) => item.category === selectedCategory)
//     : data;

//   return (
//     <div>
//       {/* Buttons to filter data */}
//       <button onClick={() => handleCategorySelect("")}>All</button>
//       <button onClick={() => handleCategorySelect("mains")}>Mains</button>
//       <button onClick={() => handleCategorySelect("appetizer")}>
//         Appetizer
//       </button>
//       <button onClick={() => handleCategorySelect("dessert")}>Dessert</button>
//       {filteredData?.map((item) => (
//         <div key={item.id}>
//           <h2>{item.name}</h2>
//           <img className="dishImg" src={item.image} alt={item.name} />
//           <p>{item.description}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Categoriess;

import React from "react";
import { useTable } from "react-table";

const Categories = ({ data }) => {
  const [selectedCategory, setSelectedCategory] = React.useState("");

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const filteredData = selectedCategory
    ? data.filter((item) => item.category === selectedCategory)
    : data;

  const columns = React.useMemo(
    () => [
      { Header: "Name", accessor: "name" },
      { Header: "Image", accessor: "image", Cell: ImageCell },
      { Header: "Category", accessor: "category" },
      { Header: "Label", accessor: "label" },
      { Header: "Price", accessor: "price" },
      { Header: "Description", accessor: "description" },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: filteredData });

  // Custom cell renderer for displaying images
  function ImageCell({ value }) {
    return <img src={value} alt="Menu Item" className="menu-image" />;
  }

  return (
    <div>
      <div className="filter-buttons">
        <button onClick={() => handleCategorySelect("")}>All</button>
        <button onClick={() => handleCategorySelect("mains")}>Mains</button>
        <button onClick={() => handleCategorySelect("appetizer")}>
          Appetizer
        </button>
        <button onClick={() => handleCategorySelect("dessert")}>Dessert</button>
      </div>
      <div className="container">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
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
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Categories;
