"use client";

import { useEffect } from "react";

/** Testimonials live on the homepage only — no standalone detail route. */
export default function TestimonialsRedirectPage() {
  useEffect(() => {
    window.location.replace("/#testimonials");
  }, []);

  return null;
}
