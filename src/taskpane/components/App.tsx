import { makeStyles } from "@fluentui/react-components";
import { DocumentTextRegular } from "@fluentui/react-icons";
import * as React from "react";
import { insertText } from "../taskpane";
import ReferenceList, { ReferenceListItem } from "./ReferenceList";
import TextInsertion from "./TextInsertion";

interface AppProps {
  title: string;
}

const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
  },
});

const App: React.FC<AppProps> = (props: AppProps) => {
  console.log("props", props);
  const styles = useStyles();
  // The list items are static and won't change at runtime,
  // so this should be an ordinary const, not a part of state.
  const listItems: ReferenceListItem[] = [
    {
      icon: <DocumentTextRegular />,
      primaryText: "Reference 1",
    },
    {
      icon: <DocumentTextRegular />,
      primaryText: "Reference 2",
    },
  ];

  return (
    <div className={styles.root}>
      <TextInsertion insertText={insertText} />
      <ReferenceList items={listItems} />
    </div>
  );
};

export default App;
