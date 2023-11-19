import { IDefinition } from "../../../models/Definition";
import TagBadge from "../TagBadge";

export default function WordDefinitionViewShort({
  definition,
}: {
  definition: IDefinition;
}) {
  return (
    <div>
      <div className="flex gap-2 flex-wrap">
        {definition.tags.map((tag, index) => {
          return <TagBadge tag={tag} key={index} />;
        })}
      </div>

      <div className=" text-lg">{definition.definition.join(", ")}</div>
    </div>
  );
}
