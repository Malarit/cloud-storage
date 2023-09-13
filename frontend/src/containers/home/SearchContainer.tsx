import React from "react";
import Search from "../../components/Search";
import debounce from "lodash.debounce";
import useQueryFiles from "../../hooks/useQueryFiles";

const SearchContainer: React.FC = () => {
  const [value, setValue] = React.useState("");
  const { refetch, remove } = useQueryFiles.setSearch(value, {
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const onChange = React.useCallback(
    debounce(() => {
      refetch();
      remove();
    }, 700),
    []
  );

  return (
    <Search
      onChange={(e) => {
        setValue(e.target.value);
        onChange();
      }}
      onClickClose={() => {
        setValue("");
        onChange();
      }}
      inputValue={value}
    />
  );
};

export default SearchContainer;
