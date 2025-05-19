"use client"

import { useState, useEffect } from "react";
const Timer = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });
    
      useEffect(() => {
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + 7); // Set end date to 7 days from now
    
        const timer = setInterval(() => {
          const now = new Date().getTime();
          const distance = endDate.getTime() - now;
    
          setTimeLeft({
            days: Math.floor(distance / (1000 * 60 * 60 * 24)),
            hours: Math.floor(
              (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            ),
            minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((distance % (1000 * 60)) / 1000),
          });
    
          if (distance < 0) {
            clearInterval(timer);
          }
        }, 1000);
    
        return () => clearInterval(timer);
      }, []);

      
    return (
        <div className="flex flex-wrap justify-center gap-3 mb-8">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div
            key={unit}
            className="bg-white rounded-md shadow-md p-3 min-w-[70px]"
          >
            <div className="text-xl font-bold text-amber-600">{value}</div>
            <div className="text-xs text-gray-600 uppercase">{unit}</div>
          </div>
        ))}
      </div>
    );
};

export default Timer;