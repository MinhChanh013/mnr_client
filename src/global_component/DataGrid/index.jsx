import { useCallback, useMemo, useState } from "react";

import ReactDataGrid, { SelectColumn, textEditor } from "react-data-grid";
import { renderCellEditDatePicker } from "./renderCellEditDatePicker";

export const columnTypes = {
  DatePicker: "DatePicker",
  TextEditor: "TextEditor",
};
const getEditCell = (key, cellType) => {
  switch (cellType) {
    case columnTypes.DatePicker:
      return ({ row, onRowChange }) =>
        renderCellEditDatePicker({
          key,
          row,
          onRowChange,
        });

    default:
      return textEditor;
  }
};

const handleRenderColumn = ({
  type = columnTypes.TextEditor,
  editable = true,

  // visible
  // render: () => {}, // hiển thị thông tin.
  // textAlign
  key,
  ...props
}) => {
  return {
    ...props,
    key,
    renderEditCell: editable ? getEditCell(key, type) : null,
  };
};

export default function DataGrid({
  direction = "ltr",
  style,
  columns = [],
  columnKeySelected = "id",
  rows = new Set(),
  setRows,
  selectedRows,
  setSelectedRows,
  onFocus,
}) {
  const [sortColumns, setSortColumns] = useState([]);
  const columnsCombined = useMemo(
    () =>
      columns.length
        ? [SelectColumn, ...columns.map((column) => handleRenderColumn(column))]
        : [],
    [columns]
  );

  const handleFill = useCallback(({ columnKey, sourceRow, targetRow }) => {
    return { ...targetRow, [columnKey]: sourceRow[columnKey] };
  }, []);

  const handlePaste = useCallback(
    ({ sourceColumnKey, sourceRow, targetColumnKey, targetRow }) => {
      return { ...targetRow, [targetColumnKey]: sourceRow[sourceColumnKey] };
    },
    []
  );

  const handleCopy = useCallback(({ sourceRow, sourceColumnKey }) => {
    if (window.isSecureContext) {
      navigator.clipboard.writeText(sourceRow[sourceColumnKey]);
    }
  }, []);

  return (
    <ReactDataGrid
      style={{
        marginTop: "20px",
        ...style,
      }}
      defaultColumnOptions={{ sortable: true, resizable: true }}
      sortColumns={sortColumns}
      onSortColumnsChange={setSortColumns}
      rows={rows}
      columns={columnsCombined}
      selectedRows={selectedRows}
      rowHeight={30}
      direction={direction}
      rowKeyGetter={(row) => row[columnKeySelected]}
      onRowsChange={setRows}
      onSelectedCellChange={onFocus}
      onFill={handleFill}
      onCopy={handleCopy}
      onPaste={handlePaste}
      onSelectedRowsChange={setSelectedRows}
      onCellClick={(args, event) => {
        if (args.column.key === "title") {
          event.preventGridDefault();
          args.selectCell(true);
        }
      }}
    />
  );
}
