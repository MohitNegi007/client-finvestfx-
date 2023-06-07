// import React from "react";
// import { useTable } from "react-table";

// const Categories = ({ data }) => {
//   const [selectedCategory, setSelectedCategory] = React.useState("");

//   const handleCategorySelect = (category) => {
//     setSelectedCategory(category);
//   };

//   const filteredData = selectedCategory
//     ? data.filter((item) => item.category === selectedCategory)
//     : data;

//   const columns = React.useMemo(
//     () => [
//       { Header: "Name", accessor: "name" },
//       { Header: "Image", accessor: "image", Cell: ImageCell },
//       { Header: "Category", accessor: "category" },
//       { Header: "Label", accessor: "label" },
//       { Header: "Price", accessor: "price " },
//       { Header: "Description", accessor: "description" },
//     ],
//     []
//   );

//   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
//     useTable({ columns, data: filteredData });

//   // Custom cell renderer for displaying images
//   function ImageCell({ value }) {
//     return <img src={value} alt="Menu Item" className="menu-image" />;
//   }

//   return (
//     <div>
//       <div className="filter-buttons">
//         <button onClick={() => handleCategorySelect("")}>All</button>
//         <button onClick={() => handleCategorySelect("mains")}>Mains</button>
//         <button onClick={() => handleCategorySelect("appetizer")}>
//           Appetizer
//         </button>
//         <button onClick={() => handleCategorySelect("dessert")}>Dessert</button>
//       </div>
//       <div className="container">
//         <table {...getTableProps()}>
//           <thead>
//             {headerGroups.map((headerGroup) => (
//               <tr {...headerGroup.getHeaderGroupProps()}>
//                 {headerGroup.headers.map((column) => (
//                   <th {...column.getHeaderProps()}>
//                     {column.render("Header")}
//                   </th>
//                 ))}
//               </tr>
//             ))}
//           </thead>
//           <tbody {...getTableBodyProps()}>
//             {rows.map((row) => {
//               prepareRow(row);
//               return (
//                 <tr {...row.getRowProps()}>
//                   {row.cells.map((cell) => (
//                     <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
//                   ))}
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Categories;

import React, { useState, useEffect } from "react";
import { useTable } from "react-table";

const Categories = ({ data }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem("tableData");
    if (storedData) {
      setTableData(JSON.parse(storedData));
    } else {
      setTableData(data);
    }
  }, [data]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handlePriceChange = (rowIndex, value) => {
    setTableData((prevData) => {
      const newData = [...prevData];
      newData[rowIndex].price = value;
      localStorage.setItem("tableData", JSON.stringify(newData));
      return newData;
    });
  };

  const filteredData = selectedCategory
    ? tableData.filter((item) => item.category === selectedCategory)
    : tableData;

  const columns = React.useMemo(
    () => [
      { Header: "Name", accessor: "name" },
      { Header: "Image", accessor: "image", Cell: ImageCell },
      { Header: "Category", accessor: "category" },
      { Header: "Label", accessor: "label" },
      { Header: "Price", accessor: "price", Cell: PriceCell },
      { Header: "Description", accessor: "description" },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: filteredData });

  function ImageCell({ value }) {
    return <img src={value} alt="Menu Item" className="menu-image" />;
  }

  function PriceCell({ value, row }) {
    const [editing, setEditing] = useState(false);
    const [price, setPrice] = useState(value);

    const toggleEditing = () => {
      setEditing(!editing);
    };

    const handleInputChange = (event) => {
      setPrice(event.target.value);
    };

    const saveChanges = () => {
      handlePriceChange(row.index, price);
      toggleEditing();
    };

    return (
      <div>
        {editing ? (
          <input
            type="number"
            value={price}
            onChange={handleInputChange}
            onBlur={saveChanges}
          />
        ) : (
          <span onClick={toggleEditing}>{value}</span>
        )}
      </div>
    );
  }

  const resetPrice = () => {
    localStorage.removeItem("tableData");
    window.location.reload();
  };

  return (
    <div>
      <div>
        <button onClick={resetPrice}>Rest price</button>
      </div>
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
                    <td {...cell.getCellProps()}>
                      {cell.column.id === "price"
                        ? cell.render("Cell", { row })
                        : cell.render("Cell")}
                    </td>
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
