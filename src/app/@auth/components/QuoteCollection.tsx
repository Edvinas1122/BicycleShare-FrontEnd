import React, { useState, useEffect } from 'react';

export const QuoteCollection: React.FC<{
	quotes: string[]
}> = ({ 
	quotes 
}) => {
	const quoteClass = "text-center text-gray-600 italic flex justify-center items-center";
	const textStyle = {
		maxWidth: '400px',
		overflowWrap: 'break-word',
	};
	const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
	const [quoteStyle, setQuoteStyle] = useState(quoteClass + "opacity-0 delayed-fade-in");

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
			setQuoteStyle("opacity-0");
			setTimeout(() => {
				setQuoteStyle(quoteClass + "opacity-0 delayed-fade-in");
			}, 300);
		}, 6000); // Change quotes every 3 seconds

		return () => clearInterval(interval); // Clean up interval on unmount
	}, [quotes]);


	return (
		<div className={quoteStyle}>
			<p style={textStyle}>{`" ${quotes[currentQuoteIndex]}..."`}</p>
		</div>
	);
};
