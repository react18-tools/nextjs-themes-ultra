import * as React from "react";

interface ThemeSwitcherProps {
	children?: React.ReactNode;
}

/**
 * # ThemeSwitcher
 * 
 */
export function ThemeSwitcher({ children }: ThemeSwitcherProps) {
	return (
		<div>
			<h1 data-testid="theme-switcher-h1">theme-switcher</h1>
			{children}
		</div>
	);
}
