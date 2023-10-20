"use client";
import { motion, AnimatePresence } from "framer-motion"

export default function Animation({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<AnimatePresence>
		<motion.div
			key="template"
			initial={{ opacity: 0.2 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{
				duration: 0.2,
				ease: "easeInOut",
			}}
			className={
				"flex flex-col w-full h-full justify-begin"
			}
			>
			{children}
		</motion.div>
		</AnimatePresence>
	);
}