import React from 'react';

type Colors =
	| 'slate'
	| 'gray'
	| 'zinc'
	| 'neutral'
	| 'stone'
	| 'red'
	| 'orange'
	| 'amber'
	| 'yellow'
	| 'lime'
	| 'green'
	| 'emerald'
	| 'teal'
	| 'cyan'
	| 'sky'
	| 'blue'
	| 'indigo'
	| 'violet'
	| 'purple'
	| 'fuchsia'
	| 'pink'
	| 'rose';

type ButtonProps = {
	className?: string;
	title: string;
	type: 'fill' | 'outline' | 'secondary';
	color: Colors;
	size?: string;
	onClick(): void;
};

function Button({
	className = '',
	type,
	size = 'md',
	color,
	title,
	onClick,
}: ButtonProps) {
	console.log(color);

	function setProperties(type: string) {
		return type === 'fill'
			? `bg-${color}-600 text-${size} text-white hover:bg-${color}-500 shadow-sm`
			: type === 'outline'
			? `border border-${color}-500 text-${size} text-${color}-500 hover:bg-${color}-600 hover:text-white hover:border-${color}-600 shadow-sm`
			: `text-${size} text-${color}-500`;
	}

	return (
		<button
			className={`${className} ${setProperties(
				type
			)} rounded-md px-3 py-2 font-semibold`}
			onClick={onClick}
		>
			{title}
		</button>
	);
}

export default Button;
