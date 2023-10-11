"use client";
import { motion, AnimatePresence } from "framer-motion"

export default async function AnimateAppearing({
	children,
	key
}: {
	children: React.ReactNode;
	key: React.Key;
}) {
	return (
		<AnimatePresence>
		<motion.div
			key={key}
			initial={{ opacity: 0.5, scale: 0.8 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{
			  duration: 0.4,
			  delay: 0,
			  ease: [0, 0.71, 0.2, 1.01]
			}}
			>
			{children}
		</motion.div>
		</AnimatePresence>
	);
}