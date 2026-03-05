import { registerBlockType } from '@wordpress/blocks';
import {
	useBlockProps,
	InnerBlocks,
} from '@wordpress/block-editor';

import './style.scss';

import metadata from './block.json';

registerBlockType( metadata.name, {
	edit: () => {
		return (
			<div { ...useBlockProps() }>
				<InnerBlocks
					allowedBlocks={ metadata.allowedBlocks }
				/>
			</div>
		);
	},
	save: () => {
		return (
			<div { ...useBlockProps.save() }>
				<InnerBlocks.Content />
			</div>
		);
	},
} );
