import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";

import ReactDataGrid, { SelectColumn, textEditor } from "react-data-grid";
import { renderCellEditDatePicker } from "./renderCellEditDatePicker";

export const selectionTypes = {
  multi: "multi",
  single: "single",
  none: "none",
};
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
  visible = true,
  render,
  key,
  selection,
  index,
  ...props
}) => {
  const column = {
    ...props,
    key,
    renderEditCell: editable ? getEditCell(key, type) : null,
  };

  // Hide column when visible = true
  if (!visible) return null;

  // custom renderCell
  if (typeof render === "function") column["renderCell"] = render;

  // Hide header of column SelectColumn
  if (selection === selectionTypes.single && index === 0)
    column["renderHeaderCell"] = null;

  // Hide all SelectColumn
  if (selection === selectionTypes.none && index === 0) {
    return null;
  }

  return column;
};

const DataGrid = forwardRef(
  (
    {
      direction = "ltr",
      style,
      columns = [],
      className,
      columnKeySelected = "id",
      selection = selectionTypes.multi,
      rows = new Set(),
      setRows,
      onFocus,
    },
    ref
  ) => {
    const [sortColumns, setSortColumns] = useState([]);
    const [selectedRows, setSelectedRows] = useState(() => new Set());

    const columnsCombined = useMemo(() => {
      return [SelectColumn, ...columns]
        .map((column, index) =>
          handleRenderColumn({ ...column, selection, index })
        )
        .filter((column) => column);
    }, [columns, selection]);

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

    useImperativeHandle(
      ref,
      () => {
        return {
          getSelectedRows: () => {
            return selectedRows;
          },
          setSelectedRows: () => {
            setSelectedRows(new Set());
          },
        };
      },
      [selectedRows]
    );

    return (
      <ReactDataGrid
        className={`rdg-light ${className}`}
        style={{ ...style }}
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
        onSelectedCellChange={
          typeof onFocus === "function" ? onFocus : () => {}
        }
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
);

export default DataGrid;
