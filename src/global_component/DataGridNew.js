import Title from "antd/es/skeleton/Title";
import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactDataGrid from "react-data-grid";

const DataGridNew = ({
  rows = [],
  columns = [],
  className,
  maxHeight = 720,
  style,
}) => {
  const reactDataGridRef = useRef();
  const [sortColumns, setSortColumns] = useState([]);
  const [currentRows, setCurrenRows] = useState([]);
  const [currentPage, setCurrenPage] = useState(1);

  useEffect(() => {
    setCurrenRows([]);
    setCurrenPage(1);
  }, [rows]);

  const getComparator = (sortColumn) => {
    switch (sortColumn) {
      ////// so sánh các dữ liệu kiểu số
      case "ImExType":
      case "SumCargoWeight":
      case "ID":
      case "IDRef":
      case "STT":
        return (a, b) => {
          return a[sortColumn] - b[sortColumn];
        };
      ////// so sánh các dữ liệu kiểu chuỗi
      default:
        return (a, b) => {
          if (
            (a[sortColumn] === null && b[sortColumn] === null) ||
            (a[sortColumn] === undefined && b[sortColumn] === undefined)
          )
            return 0;
          else if (a[sortColumn] === null || a[sortColumn] === undefined)
            return 1;
          else if (b[sortColumn] === null || b[sortColumn] === undefined)
            return -1;
          else return a[sortColumn].localeCompare(b[sortColumn]);
        };
    }
  };

  const sortedRows = useMemo(() => {
    if (sortColumns.length === 0) return currentRows;

    return [...currentRows].sort((a, b) => {
      for (const sort of sortColumns) {
        const comparator = getComparator(sort.columnKey);
        const compResult = comparator(a, b);
        if (compResult !== 0) {
          return sort.direction === "ASC" ? compResult : -compResult;
        }
      }
      return 0;
    });
  }, [currentRows, sortColumns]);

  return (
    <ReactDataGrid

    //   ref={reactDataGridRef}
    //   className={`rdg-light ${className}`}
    //   style={{
    //     height: "calc(100% - var(--height-toolbar) - 40px)",
    //     maxHeight: maxHeight,
    //     ...style,
    //   }}



      renderers={{
        noRowsFallback: (
          <Title
            level={5}
            style={{ color: "#818181", gridColumn: "1/-1", margin: "10px" }}
          >
            --- Không có dữ liệu ---
          </Title>
        ),
      }}

    //   defaultColumnOptions={{ sortable: true, resizable: true }}

    //   sortColumns={sortColumns}
    //   onSortColumnsChange={setSortColumns}


      rows={sortedRows}
      columns={columns}
    />
  );
};

export default DataGridNew;
