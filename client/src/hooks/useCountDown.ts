import { useEffect, useState } from "react";

/**
 * Hook to set up reusable countdown
 * @returns [current count, function to start count]
 */
export default function useCountDown(): [number, (seconds: number) => void] {
    const [count, setCount] = useState(0);

    function startCount(seconds: number) {
        setCount(seconds);
    }

    useEffect(() => {
        if (count > 0) {
            setTimeout(() => setCount(count - 1), 1000);
        }
    }, [count]);

    return [count, startCount];
}
