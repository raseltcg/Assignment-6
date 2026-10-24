"use client";

import { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const PlanContext = createContext(null);
const MAX_PLAN = 5;

export function PlanProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [loaded, setLoaded] = useState(false);

  
  useEffect(() => {
    try {
      const p = JSON.parse(localStorage.getItem("fitlog-plan"));
      const s = JSON.parse(localStorage.getItem("fitlog-saved"));
      if (Array.isArray(p)) setPlan(p);
      if (Array.isArray(s)) setSaved(s);
    } catch (e) {}
    setLoaded(true);
  }, []);

 
  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem("fitlog-plan", JSON.stringify(plan));
    localStorage.setItem("fitlog-saved", JSON.stringify(saved));
  }, [plan, saved, loaded]);

  const addToPlan = (workout) => {
    if (plan.some((w) => w.id === workout.id)) {
      toast.error("Already in today's plan");
      return;
    }
    if (plan.length >= MAX_PLAN) {
      toast.error("Today's plan is full (max 5 lifts)");
      return;
    }
    setPlan([...plan, { ...workout, done: false }]);
    toast.success("Added to today's plan");
  };

  const addToSaved = (workout) => {
    if (saved.some((w) => w.id === workout.id)) {
      toast.error("Already saved");
      return;
    }
    setSaved([...saved, workout]);
    toast.success("Saved for later");
  };

  const removeFromPlan = (id) => {
    setPlan(plan.filter((w) => w.id !== id));
    toast.success("Removed from today's plan");
  };

  const removeFromSaved = (id) => {
    setSaved(saved.filter((w) => w.id !== id));
    toast.success("Removed from saved");
  };

  const markDone = (id) => {
    setPlan(plan.map((w) => (w.id === id ? { ...w, done: true } : w)));
    toast.success("Workout marked as done");
  };

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        loaded,
        maxPlan: MAX_PLAN,
        addToPlan,
        addToSaved,
        removeFromPlan,
        removeFromSaved,
        markDone,
      }}
    >
      {children}
      <Toaster position="top-right" />
    </PlanContext.Provider>
  );
}


export function usePlan() {
  return useContext(PlanContext);
}