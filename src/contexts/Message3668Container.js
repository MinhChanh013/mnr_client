import { createContext, useContext, useMemo, useRef, useState } from "react";

const Message3668Context = createContext();

export const ProviderMessage3668Context = ({ children }) => {
  const tableRef = useRef();
  const [rowSelected, setRowSelected] = useState();

  const handleSelectRow = () => {
    const selectedIndex = tableRef.current.state.selectedIndexes.at(0);
    const rows = tableRef.current.state.props.rows;
    const data = rows[selectedIndex]["cells"];

    setRowSelected(data);
  };

  const value = useMemo(() => {
    return {
      tableRef,
      rowSelected,
      handleSelectRow,
    };
  }, [tableRef, rowSelected]);

  return (
    <Message3668Context.Provider value={value}>
      {children}
    </Message3668Context.Provider>
  );
};

export const useMessage3668Context = () => useContext(Message3668Context);
