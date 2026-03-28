import { type ReactNode, useRef, useState } from "react";
import styles from "./Tooltip.module.css";

export interface TooltipProps {
	content: string;
	position?: "top" | "bottom" | "left" | "right";
	children: ReactNode;
}

export function Tooltip({ content, position = "top", children }: TooltipProps) {
	const [isVisible, setIsVisible] = useState(false);
	const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

	const show = () => {
		timeoutRef.current = setTimeout(() => setIsVisible(true), 200);
	};

	const hide = () => {
		clearTimeout(timeoutRef.current);
		setIsVisible(false);
	};

	return (
		<span
			role="presentation"
			className={styles.wrapper}
			onMouseEnter={show}
			onMouseLeave={hide}
			onFocus={show}
			onBlur={hide}
		>
			{children}
			{isVisible && (
				<div className={[styles.tooltip, styles[position]].join(" ")} role="tooltip">
					{content}
					<div className={[styles.arrow, styles[`arrow-${position}`]].join(" ")} />
				</div>
			)}
		</span>
	);
}
