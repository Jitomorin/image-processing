"use client";

import { Progress } from "@nextui-org/react";
import { useState, useEffect } from "react";

export default function LoadingComponent() {
  const [value, setValue] = useState<number>(0); // Completion percentage
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  useEffect(() => {
    const totalDuration = 29800; // around 30 seconds
    const intervalDuration = 100; // Update interval in milliseconds
    const totalSteps = totalDuration / intervalDuration;
    let step = 0;

    // Function to update the value
    const updateValue = () => {
      step += 1;
      const percentage = (step / totalSteps) * 100;
      setValue(Math.min(percentage, 100)); // Ensure value does not exceed 100%

      if (step >= totalSteps) {
        setLoading(false); // End loading when complete
        clearInterval(intervalId); // Clear the interval
      }
    };

    // Start the interval to update value
    const intervalId = setInterval(updateValue, intervalDuration);

    // Cleanup on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      {loading && (
        <Progress
          aria-label="Downloading..."
          size="md"
          value={value}
          color="success"
          showValueLabel={true}
          className="max-w-md"
        />
      )}
    </div>
  );
}
