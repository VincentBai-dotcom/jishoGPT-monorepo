import {
  miscellaneousInfoTagsSet,
  partOfSpeechTagsSet,
  usageDomainTagsSet,
  wordTagsDescription,
} from "@/lib/wordTagsUtils";

export default function TagBadge({ tag }: { tag: string }) {
  const renderBadge = () => {
    let badgeColor;
    if (miscellaneousInfoTagsSet.has(tag)) {
      badgeColor = "badge-warning";
    } else if (partOfSpeechTagsSet.has(tag)) {
      badgeColor = "badge-neutral";
    } else if (usageDomainTagsSet.has(tag)) {
      badgeColor = "badge-success";
    } else {
      return;
    }

    return (
      <div className={`badge ${badgeColor}`}>{wordTagsDescription[tag]}</div>
    );
  };

  return <span>{renderBadge()}</span>;
}
