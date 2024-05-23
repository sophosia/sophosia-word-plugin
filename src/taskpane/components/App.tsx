import { makeStyles } from "@fluentui/react-components";
import * as React from "react";
import { useState } from "react";
import ReferenceList, { Reference } from "./ReferenceList";
import SearchBar from "./SearchBar";

const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
    marginTop: "1rem",
    marginLeft: "1rem",
    marginRight: "1rem",
  },
});

const App: React.FC = () => {
  const styles = useStyles();
  // The list items are static and won't change at runtime,
  // so this should be an ordinary const, not a part of state.
  const references: Reference[] = [
    {
      "citation-key": "family1_family2_test_2024",
      title: "A Test Reference",
      author: [
        { family: "Family1", given: "Given1" },
        { family: "Family2", given: "Given2" },
      ],
    },
    {
      "citation-key": "feng_smolyakov_instability_2024",
      title: "Instability of Plasma Flow in Magnetic Nozzle",
      author: [
        { family: "Feng", given: "Hunt" },
        { family: "Smolyakov", given: "Andrei" },
      ],
    },
  ];

  const [searchKey, setSearchKey] = useState<string>("");

  return (
    <div className={styles.root}>
      <SearchBar searchKey={searchKey} setSearchKey={(key) => setSearchKey(key)} />
      <ReferenceList searchKey={searchKey} items={references} />
    </div>
  );
};

export default App;
