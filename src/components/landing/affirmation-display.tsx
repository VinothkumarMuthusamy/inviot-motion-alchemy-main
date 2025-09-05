
"use client";

import { generateAffirmation } from "@/ai/flows/dynamic-affirmations";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Typewriter from "typewriter-effect";

const AffirmationDisplay = () => {
  const [affirmation, setAffirmation] = useState("");
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      setLoading(true);
      generateAffirmation({})
        .then(response => {
          setAffirmation(response.affirmation);
        })
        .catch(() => {
          setAffirmation("Unleash the power within and redefine what's possible.");
        })
        .finally(() => {
            setLoading(false);
        });
    }
  }, [isMounted]);

  if (!isMounted) {
    return (
        <div className="mt-12 w-full">
            <Skeleton className="h-8 w-3/4 mx-auto" />
        </div>
    );
  }

  return (
    <div className="mt-12 border-l-4 border-accent pl-6">
        {loading ? (
            <Skeleton className="h-8 w-3/4" />
        ) : (
            <div className="text-xl md:text-2xl text-card-foreground/80 italic text-left">
                <Typewriter
                    onInit={(typewriter) => {
                        typewriter
                        .typeString(`"${affirmation}"`)
                        .pauseFor(2500)
                        .deleteAll()
                        .start();
                    }}
                    options={{
                        delay: 50,
                        cursor: "",
                        loop: true,
                    }}
                />
            </div>
        )}
    </div>
  );
};

export default AffirmationDisplay;
