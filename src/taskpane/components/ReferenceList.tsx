import { makeStyles, tokens } from "@fluentui/react-components";
import Fuse from "fuse.js";
import * as React from "react";

interface Author {
  family?: string;
  given?: string;
  literal?: string;
}

export interface Reference {
  "citation-label"?: string; // citatin label
  "citation-key": string; // used to cite for bibtex
  type?: string; // article / book / conference-paper ...
  "original-title"?: string; // original (untranslated) title
  title: string; // article / book title (translated)
  author: Author[]; // array of authors [{family: "Feng", given: "Feng"}, {literal: "John"}]
  abstract?: string; // article abstract
  issued?: { "date-parts": Array<any> }; // issued date
  DOI?: string; // Digital Object Identity
  ISBN?: string; // ISBN of a book
  ISSN?: string;
  URL?: string; // URL to this article/book
  publisher?: string; // publisher
  version?: string;
  volume?: number;
  keyword?: string;
  "container-title"?: string; // journal name
  "container-title-short"?: string;
  page?: string;
  source?: string;
  language?: string;
  // index signature, so we can access property like this project[key]
  [k: string]: any;
}

export interface ReferenceListProps {
  searchKey: string;
  items: Reference[];
}

const useStyles = makeStyles({
  list: {
    marginTop: "1rem",
    padding: "0",
  },
  listItem: {
    padding: "0.5rem 0.5rem",
    display: "flex",
    cursor: "pointer",
    border: "1px solid black",
  },
  title: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: 600,
  },
  author: {
    fontSize: tokens.fontSizeBase300,
    fontColor: tokens.colorNeutralBackgroundStatic,
  },
});

/**
 * Convert array of author objects to string
 * @param authors
 */
export function authorToString(authors: Author[] | undefined) {
  if (!!!authors?.length) return "";

  let names = [];
  for (let author of authors) {
    if (!!!author) continue;
    if (!!author.literal) names.push(author.literal);
    else names.push(`${author.given} ${author.family}`);
  }
  return names.join(", ");
}

async function insertReference(reference: Reference) {
  try {
    await Word.run(async (context) => {
      let body = context.document.body;
      body.insertParagraph(reference["citation-key"], Word.InsertLocation.end);
      await context.sync();
    });
  } catch (error) {
    console.log("Error: " + error);
  }
}

const ReferenceList: React.FC<ReferenceListProps> = (props: ReferenceListProps) => {
  const { searchKey, items } = props;
  const styles = useStyles();

  const fuseOptions = {
    keys: ["title", "author.family", "author.given"],
  };

  const fuse = new Fuse(items, fuseOptions);
  const filtered = !!searchKey ? fuse.search(searchKey).map((result) => result.item) : items;
  console.log("searchKey", searchKey);
  console.log("filtered", filtered);

  const listItems = filtered.map((item, index) => (
    <div className={styles.listItem} key={index}>
      <div onClick={() => insertReference(item)}>
        <div className={styles.title}>{item.title}</div>
        <div className={styles.author}>{authorToString(item.author)}</div>
      </div>
    </div>
  ));

  return <div className={styles.list}>{listItems}</div>;
};

export default ReferenceList;
