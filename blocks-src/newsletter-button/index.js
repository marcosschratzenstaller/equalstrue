import { registerBlockType } from '@wordpress/blocks';
import {
	useBlockProps,
	RichText,
} from '@wordpress/block-editor';
import { __, _x } from '@wordpress/i18n';
import { SVG, Path } from '@wordpress/primitives';

import './style.scss';

import metadata from './block.json';

const Icon = () => (
	<SVG
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
	>
		<Path
			d="M8 12.5h8V11H8v1.5Z M19 6.5H5a2 2 0 0 0-2 2V15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5a2 2 0 0 0-2-2ZM5 8h14a.5.5 0 0 1 .5.5V15a.5.5 0 0 1-.5.5H5a.5.5 0 0 1-.5-.5V8.5A.5.5 0 0 1 5 8Z"
		/>
	</SVG>
);

registerBlockType( metadata.name, {
	icon: Icon,
	edit( { attributes, setAttributes } ) {
		return (
			<RichText
				{ ...useBlockProps() }
				tagName="button"
				value={ attributes.text }
				onChange={ ( text ) => setAttributes( { text } ) }
				placeholder={ __( 'Add text…' ) }
				additionalProps={{ type: 'submit' }}
			/>
		);
	},
	save( { attributes } ) {
		return <RichText.Content { ...useBlockProps.save()  } tagName="button" value={ attributes.text } type="submit" />;
	},
} );
