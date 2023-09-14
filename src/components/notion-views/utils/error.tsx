import React from 'react';

export default function ParseError({
	children
}: {
	children?: React.ReactNode
})
{
	if (children === undefined) {
		return (
			<div>
				<h1>ParseError</h1>
				<p>Something went wrong while parsing the Notion page.</p>
			</div>
		)
	}
	return (
		<div>
			{children}
		</div>
	);
}