"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FiCalendar, FiBookmark } from "react-icons/fi";
import { getWorkout } from "@/lib/api";
import { usePlan } from "@/context/PlanContext";

// Library কার্ডের মতো একই ছবি (public ফোল্ডারে আছে)
const IMAGE = "/workout.png";

export default function WorkoutDetails() {
  const { id } = useParams();
  const { addToPlan, addToSaved } = usePlan();

  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const data = await getWorkout(id);
        setWorkout(Array.isArray(data) ? data[0] : data);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  // লোডিং
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-32">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-accent" />
        <p className="text-sm text-slate-500">Loading workout…</p>
      </div>
    );
  }

  // ভুল id বা এরর
  if (error || !workout || !workout.name) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-32 text-center sm:px-6">
        <h1 className="font-display text-3xl font-bold uppercase text-ink">
          Workout not found
        </h1>
        <Link
          href="/"
          className="mt-6 inline-block rounded-full bg-accent px-6 py-3 text-sm font-bold text-black"
        >
          Back to workouts
        </Link>
      </div>
    );
  }

  // টেবিলের সারি
  const specs = [
    { label: "Equipment", value: workout.equipment },
    { label: "Difficulty", value: workout.difficulty },
    { label: "Sets", value: workout.sets },
    { label: "Reps", value: workout.reps },
    { label: "Duration", value: `${workout.duration} min` },
    { label: "Calories", value: `${workout.caloriesBurned} kcal` },
    { label: "Rating", value: workout.rating },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="grid gap-10 md:grid-cols-2">
        {/* বাঁ পাশ: বড় ছবি */}
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-2xl">
          <Image
            src={IMAGE}
            alt={workout.name}
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        {/* ডান পাশ: তথ্য */}
        <div>
          <h1 className="font-display text-4xl font-bold uppercase text-ink sm:text-5xl">
            {workout.name}
          </h1>

          <p className="mt-3 text-slate-500">{workout.description}</p>

          {/* ট্যাগ */}
          <div className="mt-4 flex flex-wrap gap-2">
            {workout.muscleGroups.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-black"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* তথ্যের টেবিল */}
          <div className="mt-6 overflow-hidden rounded-2xl bg-ink">
            {specs.map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between border-b border-white/10 px-6 py-4 last:border-b-0"
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  {row.label}
                </span>
                <span className="text-sm text-white">{row.value}</span>
              </div>
            ))}
          </div>

          {/* ইনস্ট্রাকশন */}
          <ol className="mt-8 list-inside list-decimal space-y-2 text-sm text-slate-500">
            {workout.instructions.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>

          {/* বাটন */}
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => addToPlan(workout)}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold text-black transition hover:brightness-95"
            >
              <FiCalendar size={16} />
              Add to today&apos;s plan
            </button>

            <button
              onClick={() => addToSaved(workout)}
              className="inline-flex items-center gap-2 rounded-full border border-slate-400 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              <FiBookmark size={16} />
              Save for later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}