export const LoadingPulsar = () => (
	<>
		<div
			className="bottom-0 h-[8px] z-[100] fixed shadow-lg rounded-lg"
			style={{
				// background: 'linear-gradient(90deg, rgba(255,42,188,0.3) 0%, rgba(255,169,0,0.9) 50%, rgba(0,239,255,0.3) 100%)',
				background: 'linear-gradient(90deg, rgba(255,255,255,0.5) 0%, rgba(255,194,0,1) 50%, rgba(255,255,255,0.5) 100%)',
				backgroundSize: '200% 100%',
				animation: 'pulseGradient 0.4s ease-in-out',
			}}
		></div>
	</>
);
