import React from "react";
import ReactDataGrid from "react-data-grid";

const DataGridNew = ({ rows = [], columns = [] }) => {
  return <ReactDataGrid rows={rows} columns={columns} />;
};

export default DataGridNew;
