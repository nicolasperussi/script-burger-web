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
	title: string;
	variant: string;
	size?: string;
	onClick(): void;
};

function Button({ variant, size = 'md', title, onClick }: ButtonProps) {
	const sizes = {
		sm: 'text-sm',
		md: 'text-md',
		lg: 'text-lg',
		xl: 'text-xl',
		xl2: 'text-2xl',
		xl3: 'text-3xl',
	};

	const variants = {
		fill_red: 'bg-red-600 text-white hover:bg-red-500 shadow-sm',
		fill_orange: 'bg-orange-600 text-white hover:bg-orange-500 shadow-sm',
		outline_red:
			'border border-red-500 text-red-500 hover:bg-red-600 hover:text-white hover:border-red-600 shadow-sm',
		outline_orange:
			'border border-orange-500 text-orange-500 hover:bg-orange-600 hover:text-white hover:border-orange-600 shadow-sm',
		text_red: 'text-red-500',
		text_orange: 'text-orange-500',
		text_black: 'text-stone-500',
	};

	return (
		<button
			className={`${variants[variant as keyof typeof variants]} ${
				sizes[size as keyof typeof sizes]
			} rounded-md px-3 py-2 font-semibold`}
			onClick={onClick}
		>
			{title}
		</button>
	);
}

export default Button;
