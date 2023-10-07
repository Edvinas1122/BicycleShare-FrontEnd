"use client";
import { motion, AnimatePresence } from "framer-motion"

export default function Template({
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
			>
			{children}
		</motion.div>
		</AnimatePresence>
	);
}