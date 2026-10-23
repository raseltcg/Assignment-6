import Image from "next/image";
import { FaArrowDown } from "react-icons/fa";

const HERO_IMAGE = "/hero.png";

export default function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-6 sm:px-6">
      <div className="grid items-center gap-8 rounded-3xl bg-ink p-6 sm:p-10 md:grid-cols-2 lg:p-14">
        {/* বাঁ পাশ: লেখা */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">
            Workout Library
          </p>

          <h1 className="mt-4 font-display text-4xl font-bold uppercase leading-none text-white sm:text-5xl lg:text-6xl">
            Train with intent. Log every set.
          </h1>

          <p className="mt-5 max-w-md text-slate-400">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <a
            href="#library"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-bold uppercase text-black transition hover:brightness-95"
          >
            Browse Workouts
            <FaArrowDown size={12} />
          </a>
        </div>

        {/* ডান পাশ: ছবি */}
        <div className="relative h-64 sm:h-80 md:h-96">
          <Image
            src={HERO_IMAGE}
            alt="Workout machine illustration"
            fill
            priority
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}