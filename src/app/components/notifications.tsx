import { motion, AnimatePresence } from "framer-motion"
import React, { useState, useEffect } from 'react';
import { 
	Card,
	CardBody,
	CardFooter,
	Progress
} from "@nextui-org/react";

export const PopUp = ({ 
	children,
	duration,
}: {
	children: React.ReactNode;
	duration: number;
}) => {
	const [isVisible, setIsVisible] = useState(true);

	useEffect(() => {
		if (!isVisible) return;
		const timer = setTimeout(() => {
			setIsVisible(false);
		}, duration);

		return () => clearTimeout(timer); // Clear the timer if the component is unmounted
	}, [setIsVisible]);

	const popUpClass = {
		"base": `
			fixed 
			bottom-0
			left-50
			transform
			translate-x-50
			max-w-screen-sm
			min-h-[40px]
			p-2
			opacity-100
			z-60
			overflow-y-auto
		`
	}

	return (
		<>
			<AnimatePresence>
				{isVisible && (
					<motion.div
						key="error"
						initial={{ opacity: 0, scale: 0.5 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.5 }} // Define the exit animation here
						transition={{
							duration: 0.8,
							delay: 0.1,
							ease: [0, 0.71, 0.2, 1.01]
						}}
						className={popUpClass.base}
					>
						<Card>
							<CardBody className={
								`max-h-[100px]`
							}>
								{children}
							</CardBody>
							<CardFooter>
								<LoadBar duration={duration} />
							</CardFooter>
						</Card>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}

const LoadBar = ({ duration }: { duration: number }) => {
    const [progress, setProgress] = useState<number>(0);
    const stepSize = 20;
    const intervalDuration = duration / (100 / stepSize);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress: number) => {
                if (oldProgress >= 100) {
                    clearInterval(timer);  // Clear the interval when progress is 100%
                    return 100;
                }
                return oldProgress + stepSize;
            });
        }, intervalDuration);

        return () => clearInterval(timer); // Cleanup on unmount or dependencies change
    }, [intervalDuration, stepSize]);

    return (
        <Progress
            aria-label="Loading..."
            color="primary"
            size="sm"
            value={progress}
            className="p-4"
        />
    );
};