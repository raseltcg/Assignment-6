import Link from "next/link";
import Image from "next/image";
import { FiClock, FiStar } from "react-icons/fi";
import { FaFire } from "react-icons/fa";

// সব কার্ডে এই একটা ছবিই দেখাবে (public ফোল্ডারের ছবি)
const SINGLE_IMAGE = "/workout.png";

export default function WorkoutCard({ workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group block overflow-hidden rounded-2xl bg-ink transition hover:-translate-y-1 hover:shadow-xl"
    >
      {/* ছবি */}
      <div className="relative h-44 w-full overflow-hidden">
        <Image
          src={SINGLE_IMAGE}
          alt={workout.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-5">
        {/* ট্যাগ */}
        <div className="flex flex-wrap gap-2">
          {workout.muscleGroups.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-accent px-3 py-0.5 text-[11px] font-bold uppercase text-black"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* নাম */}
        <h3 className="mt-3 font-display text-xl font-bold uppercase tracking-wide text-white">
          {workout.name}
        </h3>

        {/* equipment */}
        <p className="mt-1 text-xs text-slate-400">{workout.equipment}</p>

        {/* স্ট্যাটস */}
        <div className="mt-4 flex items-center gap-4 border-t border-white/10 pt-4 text-xs text-slate-300">
          <span className="flex items-center gap-1.5">
            <FiClock size={13} />
            {workout.duration} min
          </span>
          <span className="flex items-center gap-1.5">
            <FaFire size={12} />
            {workout.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1.5">
            <FiStar size={13} />
            {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}