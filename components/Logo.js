import Link from "next/link";
import { FaDumbbell } from "react-icons/fa";

export default function Logo({ hideTextOnMobile = false }) {
  return (
    <Link href="/" className="flex items-center gap-2">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-ink">
        <FaDumbbell size={16} />
      </span>
      <span
        className={`font-display text-xl font-bold tracking-wide text-white ${
          hideTextOnMobile ? "hidden sm:inline" : ""
        }`}
      >
        FITLOG
      </span>
    </Link>
  );
}