"use client";

import { useEffect, useState } from "react";
import { getWorkouts } from "@/lib/api";
import WorkoutCard from "./WorkoutCard";

export default function Library() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const data = await getWorkouts();
        setWorkouts(data);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <section
      id="library"
      className="mx-auto max-w-7xl scroll-mt-20 px-4 py-14 sm:px-6"
    >
      <h2 className="font-display text-3xl font-bold uppercase text-ink sm:text-4xl">
        The Library
      </h2>
      <p className="mt-2 text-sm text-slate-500">
        Twelve lifts covering every major muscle group.
      </p>

      <div className="mt-8">
        {/* লোডিং অ্যানিমেশন */}
        {loading && (
          <div className="flex flex-col items-center justify-center gap-4 py-24">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-accent" />
            <p className="text-sm text-slate-500">Loading workouts…</p>
          </div>
        )}

        {/* এরর */}
        {!loading && error && (
          <p className="py-24 text-center text-slate-500">
            Could not load workouts. Please refresh the page.
          </p>
        )}

        {/* কার্ডের গ্রিড */}
        {!loading && !error && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {workouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}