import Image from "next/image";
import Link from "next/link";
import { FiClock, FiStar, FiCheck, FiX } from "react-icons/fi";
import { FaFire } from "react-icons/fa";

export default function PlanItem({ workout, tab, onDone, onRemove }) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-ink p-4 sm:flex-row sm:items-center">
      
      <div className="relative h-32 w-full shrink-0 overflow-hidden rounded-xl sm:h-20 sm:w-36">
        <Image
          src="/workout.png"
          alt={workout.name}
          fill
          sizes="144px"
          className="object-cover"
        />
      </div>

      
      <div className="min-w-0 flex-1">
        <h3
          className={`font-display text-lg font-bold uppercase tracking-wide text-white ${
            workout.done ? "line-through opacity-60" : ""
          }`}
        >
          {workout.name}
        </h3>
        <p className="text-xs font-semibold text-slate-400">
          {workout.equipment}
        </p>
        <div className="mt-2 flex items-center gap-4 text-xs text-slate-300">
          <span className="flex items-center gap-1.5">
            <FiClock size={13} className="text-accent" />
            {workout.duration} min
          </span>
          <span className="flex items-center gap-1.5">
            <FaFire size={12} className="text-accent" />
            {workout.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1.5">
            <FiStar size={13} className="text-accent" />
            {workout.rating}
          </span>
        </div>
      </div>

      
      <div className="flex items-center gap-2">
        <Link
          href={`/workout/${workout.id}`}
          className="rounded-full border border-slate-600 px-4 py-2 text-xs font-medium text-white transition hover:bg-white/10"
        >
          View Details
        </Link>

        
        {tab === "plan" &&
          (workout.done ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-700 px-4 py-2 text-xs font-bold text-slate-300">
              <FiCheck size={14} />
              Done
            </span>
          ) : (
            <button
              onClick={() => onDone(workout.id)}
              className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-xs font-bold text-black transition hover:brightness-95"
            >
              <FiCheck size={14} />
              Mark as Done
            </button>
          ))}

        
        <button
          onClick={() => onRemove(workout.id)}
          aria-label="Remove"
          className="rounded-full p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
        >
          <FiX size={18} />
        </button>
      </div>
    </div>
  );
}