"use client";

import { useState } from "react";
import Link from "next/link";
import { FiChevronDown } from "react-icons/fi";
import { usePlan } from "@/context/PlanContext";
import PlanItem from "@/components/PlanItem";

export default function MyPlan() {
  const { plan, saved, loaded, markDone, removeFromPlan, removeFromSaved } =
    usePlan();

  const [tab, setTab] = useState("plan");
  const [sortBy, setSortBy] = useState("duration");

  // লোডিং (localStorage থেকে ডাটা আসার আগ পর্যন্ত)
  if (!loaded) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-32">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-accent" />
        <p className="text-sm text-slate-500">Loading workouts…</p>
      </div>
    );
  }

  // উপরের তিনটা সংখ্যা (Today's Plan থেকে হিসাব)
  const totalMinutes = plan.reduce((sum, w) => sum + w.duration, 0);
  const totalCalories = plan.reduce((sum, w) => sum + w.caloriesBurned, 0);

  // যে ট্যাব খোলা, তার লিস্ট
  const list = tab === "plan" ? plan : saved;

  // Sort: Duration আর Calories কম থেকে বেশি, Rating বেশি থেকে কম
  const sorted = [...list].sort((a, b) => {
    if (sortBy === "duration") return a.duration - b.duration;
    if (sortBy === "calories") return a.caloriesBurned - b.caloriesBurned;
    return b.rating - a.rating;
  });

  const stats = [
    { label: "Exercises", value: plan.length, accent: true },
    { label: "Minutes", value: totalMinutes },
    { label: "Calories", value: totalCalories },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      {/* টাইটেল */}
      <h1 className="font-display text-4xl font-bold uppercase text-ink sm:text-5xl">
        My Plan
      </h1>
      <p className="mt-2 text-sm text-slate-500">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      {/* তিনটা স্ট্যাট কার্ড */}
      <div className="mt-6 grid grid-cols-1 gap-4 rounded-2xl bg-ink p-6 sm:grid-cols-3 sm:gap-0">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`sm:px-6 ${
              i > 0 ? "sm:border-l sm:border-white/10" : ""
            }`}
          >
            <p className="text-xs text-slate-400">{s.label}</p>
            <p
              className={`mt-1 font-display text-4xl font-bold ${
                s.accent ? "text-accent" : "text-white"
              }`}
            >
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* ট্যাব আর Sort */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex rounded-xl bg-ink p-1">
          <button
            onClick={() => setTab("plan")}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
              tab === "plan"
                ? "bg-ink-soft text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Today&apos;s Plan
          </button>
          <button
            onClick={() => setTab("saved")}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
              tab === "saved"
                ? "bg-ink-soft text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Saved
          </button>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500">Sort By</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none rounded-lg bg-ink py-2 pl-4 pr-9 text-sm text-white outline-none"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
            <FiChevronDown
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white"
            />
          </div>
        </div>
      </div>

      {/* লিস্ট বা খালি অবস্থা */}
      <div className="mt-6">
        {sorted.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl bg-slate-500 px-6 py-20 text-center">
            <h2 className="font-display text-2xl font-bold uppercase text-white">
              Nothing here yet
            </h2>
            <p className="mt-2 text-sm text-slate-300">
              Browse the library and add a lift to get today moving.
            </p>
            <Link
              href="/"
              className="mt-6 rounded-full bg-accent px-6 py-3 text-sm font-bold text-black transition hover:brightness-95"
            >
              Go to workouts
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {sorted.map((workout) => (
              <PlanItem
                key={workout.id}
                workout={workout}
                tab={tab}
                onDone={markDone}
                onRemove={tab === "plan" ? removeFromPlan : removeFromSaved}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}