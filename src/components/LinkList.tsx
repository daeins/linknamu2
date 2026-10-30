import type { LinkItem } from "@/data/profile";
import LinkCard from "./LinkCard";

type Props = {
  links: LinkItem[];
  initialCounts: Record<string, number>;
};

export default function LinkList({ links, initialCounts }: Props) {
  return (
    <ul className="mt-12 flex w-full flex-col gap-4">
      {links.map((link) => (
        <li key={link.id}>
          <LinkCard link={link} initialCount={initialCounts[link.id] ?? 0} />
        </li>
      ))}
    </ul>
  );
}
