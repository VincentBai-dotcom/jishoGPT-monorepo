import { useMemo } from "react";
import { IDefinition } from "../../../models/Definition";
import TagBadge from "../TagBadge";

export default function WordTagBadgesView({
  definitions,
}: {
  definitions: [IDefinition];
}) {
  const tags = useMemo(() => {
    return definitions.reduce(
      (tags, definition) => Array.from(new Set([...tags, ...definition.tags])),
      [] as string[]
    );
  }, [definitions]);

  return (
    <div className="flex gap-2">
      {tags.map((tag, index) => {
        return <TagBadge tag={tag} key={index} />;
      })}
    </div>
  );
}
