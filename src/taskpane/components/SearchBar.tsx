import { Field, Textarea } from "@fluentui/react-components";
import * as React from "react";

interface TextInsertionProps {
  searchKey: string;
  setSearchKey: (key: string) => void;
}

const SearchBar: React.FC<TextInsertionProps> = (props: TextInsertionProps) => {
  return (
    <Field size="large">
      <Textarea size="large" value={props.searchKey} onChange={(ev) => props.setSearchKey(ev.target.value)} />
    </Field>
  );
};

export default SearchBar;
