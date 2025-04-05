import { registerBlockType } from '@wordpress/blocks';
import {
	useBlockProps,
	InnerBlocks,
	BlockControls,
} from '@wordpress/block-editor';
import { ToolbarButton } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { SVG, Path } from '@wordpress/primitives';

import './style.scss';
import './editor.scss';

import metadata from './block.json';

const Icon = () => (
	<SVG
		width="24"
		height="24"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		aria-hidden="true"
		focusable="false"
	>
		<Path
			d="M11.996 0a2.185 2.185 0 0 0-2.168 2.168c0 .606.258 1.159.668 1.555v4.656L7.203 5.086a2.159 2.159 0 0 0-.627-1.57 2.183 2.183 0 0 0-3.064 0 2.183 2.183 0 0 0 0 3.064c.428.429 1 .637 1.57.627L8.375 10.5H3.717a2.16 2.16 0 0 0-1.553-.668A2.185 2.185 0 0 0-.004 12c0 1.185.984 2.168 2.168 2.168.606 0 1.159-.258 1.555-.668h4.656l-3.293 3.293a2.159 2.159 0 0 0-1.57.627 2.183 2.183 0 0 0 0 3.064 2.183 2.183 0 0 0 3.064 0c.429-.428.637-1 .627-1.57l3.293-3.293v4.658a2.16 2.16 0 0 0-.668 1.553c0 1.185.984 2.168 2.168 2.168a2.185 2.185 0 0 0 2.168-2.168c0-.606-.258-1.159-.668-1.555v-4.656l3.293 3.293c-.01.57.199 1.142.627 1.57a2.183 2.183 0 0 0 3.064 0 2.183 2.183 0 0 0 0-3.064c-.428-.428-1-.637-1.57-.627L15.617 13.5h4.656c.396.41.95.668 1.555.668A2.185 2.185 0 0 0 23.996 12a2.185 2.185 0 0 0-2.168-2.168c-.606 0-1.159.258-1.555.668h-4.656l3.293-3.293c.57.01 1.142-.199 1.57-.627a2.183 2.183 0 0 0 0-3.064 2.183 2.183 0 0 0-3.064 0c-.428.428-.637 1-.627 1.57l-3.293 3.293V3.723c.41-.396.668-.949.668-1.555A2.185 2.185 0 0 0 11.996 0z"
			fill="currentColor"
		/>
	</SVG>
);

registerBlockType( metadata.name, {
	icon: Icon,
	edit: ( props ) => {
		const { clientId, isSelected } = props;
		const { removeBlock } = useDispatch( 'core/block-editor' );

		const innerBlocks = useSelect(
			( select ) => select( 'core/block-editor' ).getBlocks( clientId ),
			[ clientId ]
		);

		const hasChild = innerBlocks.length > 0;

		const handleReplaceIcon = () => {
			if ( hasChild ) {
				removeBlock( innerBlocks[ 0 ].clientId );
			}
			setTimeout( () => {
				document
					.querySelector(
						`[data-block="${ clientId }"] .block-editor-button-block-appender`
					)
					?.click();
			}, 100 );
		};

		return (
			<div { ...useBlockProps() }>
				{ hasChild && (
					<BlockControls group="other">
						<ToolbarButton
							label="Replace"
							text="Replace"
							icon={ null }
							onClick={ handleReplaceIcon }
						/>
					</BlockControls>
				) }

				<InnerBlocks
					placeholder={ ! isSelected && Icon }
					allowedBlocks={ metadata.allowedBlocks }
					renderAppender={
						hasChild ? false : InnerBlocks.ButtonBlockAppender
					}
				/>
			</div>
		);
	},
	save: () => {
		return (
			<svg
				{ ...useBlockProps.save() }
				width="24"
				height="24"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden="true"
				focusable="false"
			>
				<InnerBlocks.Content />
			</svg>
		);
	},
} );
