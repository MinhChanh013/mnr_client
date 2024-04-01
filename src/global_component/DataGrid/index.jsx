/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";

import { Pagination } from "antd";
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
export const paginationTypes = {
  none: "none",
  scroll: "scroll",
  pagination: "pagination",
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
      limit = 20,
      maxHeight = 600,
      pagination = paginationTypes.scroll
    },
    ref
  ) => {
    const [sortColumns, setSortColumns] = useState([]);
    const [selectedRows, setSelectedRows] = useState(() => new Set());
    const [currentRows, setCurrenRows] = useState([])
    const [currentPage, setCurrenPage] = useState(1)
    const reactDataGridRef = useRef();

    useEffect(() => {
      setCurrenRows([]);
      setCurrenPage(1);
    }, [rows]);

    useEffect(() => {
      const start_index = (currentPage - 1) * limit
      const dataRowCurrent = rows.slice(start_index, start_index + limit)
      switch (pagination) {
        case "none":
          setCurrenRows(rows)
          break;
        case "scroll":
          let dataRowCurrentScroll
          if (start_index === 0) {
            dataRowCurrentScroll = rows.slice(rateScreen * start_index, rateScreen * (start_index + limit))
          }
          else {
            dataRowCurrentScroll = rows.slice(rateScreen * start_index, rateScreen * start_index + limit)
          }
          if (currentRows.length === selectedRows.size && currentRows.length !== 0 && selectedRows.size !== 0) {
            const idArrRowCurrent = dataRowCurrentScroll.map((item) => item[columnKeySelected])
            setSelectedRows(prevSelectedRows => new Set([...prevSelectedRows, ...idArrRowCurrent]))
          }
          setCurrenRows(prevCurrenRows => {
            return [...prevCurrenRows, ...dataRowCurrentScroll]
          })
          break;
        case "pagination":
          setCurrenRows(dataRowCurrent)
          break;
        default:
          break;
      }
    }, [currentPage, limit, pagination, rows])

    useEffect(() => {
      if (pagination === "scroll") {
        reactDataGridRef.current?.element.addEventListener("scroll", handleScroll)
      }
      return () => {
        reactDataGridRef.current?.element.removeEventListener("scroll", handleScroll)
      }
    }, [rows])

    const rateScreen = useMemo(() => {
      return Math.ceil(maxHeight / (limit * 30))
    }, [])

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

    const handleScroll = () => {
      const dataGridScrollTop = reactDataGridRef.current.element.scrollTop;
      const dataGridScrollHeight = reactDataGridRef.current.element.scrollHeight;
      const dataGridClientHeight = reactDataGridRef.current.element.clientHeight;
      if (
        dataGridScrollTop + 20 >= dataGridScrollHeight - dataGridClientHeight
      ) {
        setCurrenPage(prevPage => {
          return prevPage + 1
        })
      }
    }

    return (
      <>
        <ReactDataGrid
          ref={reactDataGridRef}
          className={`rdg-light ${className} ${pagination === "scroll" ? "fill-grid" : ""}`}
          style={{ height: 'calc(100% - 40px)', maxHeight: maxHeight, ...style }}
          defaultColumnOptions={{ sortable: true, resizable: true }}
          sortColumns={sortColumns}
          onSortColumnsChange={setSortColumns}
          rows={currentRows}
          columns={columnsCombined}
          selectedRows={selectedRows}
          rowHeight={30}
          direction={direction}
          rowKeyGetter={(row) => row[columnKeySelected]}
          onRowsChange={setRows}
          onSelectedCellChange={
            typeof onFocus === "function" ? onFocus : () => { }
          }
          enableVirtualization
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
        {
          pagination === "pagination" && rows && rows.length > 0 ?
            <Pagination
              style={{
                marginTop: 10,
                marginRight: 10,
                display: "flex",
                justifyContent: "flex-end"
              }}
              pageSize={limit}
              showSizeChanger={false}
              onChange={(pageChange) => setCurrenPage(pageChange)}
              defaultCurrent={currentPage}
              total={rows.length} /> :
            ""
        }
      </>
    );
  }
);

export default DataGrid;
