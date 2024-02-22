import * as React from "react";
import { cookies } from "next/headers";
import { DEFAULT_ID } from "../../constants";
import type { ColorSchemePreference } from "../../hooks/use-theme";

interface ServerTargetProps {
	tag?: keyof JSX.IntrinsicElements;
	targetId?: string;
}

/**
 * # ServerTarget
 * --todo 
 * update comments
 * create colorswitch
 * update examples
 */
export function ServerTarget({ tag, targetId }: ServerTargetProps) {
	const key = targetId || DEFAULT_ID;
	const [theme, csp, scs] = (cookies().get(key)?.value ?? ",system,light").split(",") as [
		string,
		ColorSchemePreference,
		"dark" | "light",
	];

	const cls = `th-${theme} ${csp === "system" ? scs : csp}`;

	const Tag = tag ?? "div";
	return <Tag className={cls} data-nth="next" id={targetId ?? DEFAULT_ID} />;
}
