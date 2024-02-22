import * as React from "react";

interface ServerTargetProps {
	children?: React.ReactNode;
}

/**
 * # ServerTarget
 * 
 */
export function ServerTarget({ children }: ServerTargetProps) {
	return (
		<div>
			<h1 data-testid="server-target-h1">server-target</h1>
			{children}
		</div>
	);
}
