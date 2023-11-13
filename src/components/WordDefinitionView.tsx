import { IDefinition } from "../../models/Definition";
import TagBadge from "./TagBadge";

export default function WordDefinitionView({
  definition,
}: {
  definition: IDefinition;
}) {
  return (
    <div>
      {definition.tags.map((tag, index) => {
        return <TagBadge tag={tag} key={index} />;
      })}
      <div>{definition.definition.join(",")}</div>
    </div>
  );
}
