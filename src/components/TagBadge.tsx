import {
  miscellaneousInfoTagsSet,
  partOfSpeechTagsSet,
  usageDomainTagsSet,
  wordTagsDescription,
} from "@/lib/wordTagsUtils";

export default function TagBadge({ tag }: { tag: string }) {
  const renderBadge = () => {
    let badgeColor = "badge-neutral";
    if (miscellaneousInfoTagsSet.has(tag)) {
      badgeColor = "";
    } else if (partOfSpeechTagsSet.has(tag)) {
    } else if (usageDomainTagsSet.has(tag)) {
    } else {
      return;
    }

    return (
      <div className={`badge ${badgeColor}`}>{wordTagsDescription[tag]}</div>
    );
  };

  return <span>{renderBadge()}</span>;
}
