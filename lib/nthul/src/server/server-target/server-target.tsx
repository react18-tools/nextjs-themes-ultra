import * as React from "react";
import { cookies } from "next/headers";
import { DEFAULT_ID } from "../../constants";

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
	const val = cookies().get(key)?.value ?? ",light";
	const [theme, cs] = val.split(",") as [string, "dark" | "light"];

	const cls = `th-${theme} ${cs}`;

	const Tag = tag ?? "div";
	return <Tag className={cls} data-nth="next" id={key} />;
}
