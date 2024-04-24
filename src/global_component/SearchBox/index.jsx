import { useState, useEffect } from "react";
import useDebounce from "../../hooks/useDebounce.js";

import { Input } from "antd";
const { Search } = Input;
const SearchBox = (props) => {
  const [searchValue, setSearchValue] = useState("");
  const debounced = useDebounce(searchValue, 500);
  useEffect(() => {
    if (!debounced.trim()) {
      props.onChange(props.data);
      return;
    }
    SearchTable(props.data, debounced);
  }, [debounced]);

  const SearchTable = (data, searchValue) => {
    const filteredData = data.filter((row) => {
      for (const prop in row) {
        if (typeof row[prop] === "string" && prop !== "ID") {
          const regex = new RegExp(searchValue.toLowerCase());
          if (regex.test(row[prop].toLowerCase())) {
            return true;
          }
        }
      }
    });

    props.onChange(filteredData);
  };

  return (
    <Search
      style={props.style}
      placeholder="Tìm kiếm"
      className="HeaderSearch"
      onChange={(e) => {
        setSearchValue(e.target.value);
      }}
    ></Search>
  );
};

export default SearchBox;
