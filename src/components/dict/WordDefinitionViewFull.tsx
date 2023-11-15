import { IDefinition } from "../../../models/Definition";
import TagBadge from "../TagBadge";

export default function WordDefinitionViewFull({
  definition,
}: {
  definition: IDefinition;
}) {
  return (
    <li>
      <div className="flex gap-2">
        {definition.tags.map((tag, index) => {
          return <TagBadge tag={tag} key={index} />;
        })}
      </div>
      <p>{definition.definition.join(", ")}</p>
    </li>
  );
}
