import clsx from 'clsx';

import { registerBlockType } from '@wordpress/blocks';
import {
	useBlockProps,
	__experimentalGetBorderClassesAndStyles as getBorderClassesAndStyles,
	__experimentalGetSpacingClassesAndStyles as getSpacingClassesAndStyles,
	__experimentalUseBorderProps as useBorderProps,
	__experimentalGetSpacingClassesAndStyles as useSpacingProps,
} from '@wordpress/block-editor';
import { _x } from '@wordpress/i18n';
import { SVG, Path } from '@wordpress/primitives';

import './style.scss';

import metadata from './block.json';

const Icon = () => (
	<SVG
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
	>
		<Path
			d="M11.25 5.75v12h1.5v-12zM5 6.5a2 2 0 0 0-2 2V15a2 2 0 0 0 2 2h4.5v-1.5H5a.5.5 0 0 1-.5-.5V8.5A.5.5 0 0 1 5 8h4.5V6.5zm9.5 0V8H19a.5.5 0 0 1 .5.5V15a.5.5 0 0 1-.5.5h-4.5V17H19a2 2 0 0 0 2-2V8.5a2 2 0 0 0-2-2z"
		/>
	</SVG>
);

registerBlockType( metadata.name, {
	icon: Icon,
	edit: (props) => {
		const {
			attributes,
		} = props;
		const blockProps = useBlockProps();
		const className = blockProps.className;
		const borderProps = useBorderProps( attributes );
		const spacingProps = useSpacingProps( attributes );
		return (
			<input
				type="email" { ...blockProps }
				className={ clsx(
					className,
					borderProps.className,
				) }
				style={ {
					...borderProps.style,
					...spacingProps.style,
				} }
				name="email"
			/>
		);
	},
	save: ({ attributes }) => {
		const blockProps = useBlockProps.save();
		const className = blockProps.className;
		const borderProps = getBorderClassesAndStyles( attributes );
		const spacingProps = getSpacingClassesAndStyles( attributes );
		const inputClasses = clsx(
			className,
			borderProps.className,
		);
		const inputStyle = {
			...borderProps.style,
			...spacingProps.style,
		};

		return (
			<input
				type="email" { ...blockProps }
				className={ inputClasses }
				style={ inputStyle }
				name="email"
			/>
		);
	},
} );
