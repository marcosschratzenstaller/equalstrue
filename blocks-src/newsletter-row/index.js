import { registerBlockType } from '@wordpress/blocks';
import {
	useBlockProps,
	InnerBlocks,
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
			d="M4 6.5h5a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H4V16h5a.5.5 0 0 0 .5-.5v-7A.5.5 0 0 0 9 8H4V6.5Zm16 0h-5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h5V16h-5a.5.5 0 0 1-.5-.5v-7A.5.5 0 0 1 15 8h5V6.5Z"
		/>
	</SVG>
);

registerBlockType( metadata.name, {
	title: _x( 'Row', 'single horizontal line' ),
	icon: Icon,
	edit: () => {
		return (
			<form { ...useBlockProps() } method="POST">
				<InnerBlocks
					allowedBlocks={ metadata.allowedBlocks }
				/>
			</form>
		);
	},
	save: () => {
		return (
			<form { ...useBlockProps.save() } method="POST">
				<InnerBlocks.Content />
			</form>
		);
	},
} );
