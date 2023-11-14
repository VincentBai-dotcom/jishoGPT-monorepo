import { IWordEntry } from "../../../models/WordEntry";
import WordDefinitionViewFull from "./WordDefinitionViewFull";

export default function WordDefinitionsBody({
  wordEntry,
}: {
  wordEntry: IWordEntry;
}) {
  return (
    <div>
      <h3>Dictionary Definition</h3>
      <div className="flex flex-col">
        {wordEntry.definitions.map((definition, index) => {
          return <WordDefinitionViewFull definition={definition} key={index} />;
        })}
      </div>
    </div>
  );
}
