import Link from "next/link";
import Image from "next/image";


const LOGO_SRC = "/logo.png";

export default function Logo({ hideTextOnMobile = false }) {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image
        src={LOGO_SRC}
        alt="FitLog logo"
        width={32}
        height={32}
        className="h-8 w-8 object-contain"
      />
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