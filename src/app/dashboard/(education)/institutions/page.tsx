'use client'

interface Props {
	params: {
		id: string;
	};
}

export default function Institutions({ params }: Props) {
	const { id } = params;

	return (
		<>
			<h1>Page { id }</h1>
			<p>Page content</p>
		</>
	);
}