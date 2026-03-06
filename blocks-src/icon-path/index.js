import { registerBlockType, registerBlockVariation } from '@wordpress/blocks';
import metadata from './block.json';
import { getPathD } from './utils';
import variations from './variations';

registerBlockType( metadata.name, {
	category: `${ metadata.name.split( '/' )[ 0 ] }-icons`,
	variations,
	edit: ( { attributes } ) => {
		const iconName = attributes.name;
		const variation = variations.find(variation => variation.name === iconName);
		const dValue = attributes.d || ( variation ? getPathD( variation.icon ) : '' );

		return iconName && dValue ? (
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden="true"
				focusable="false"
			>
				<path data-name={ iconName } d={ dValue }></path>
			</svg>
		) : (
			<></>
		);
	},
	save: ( { attributes } ) => {
		const iconName = attributes.name;
		const variation = variations.find(variation => variation.name === iconName);
		const dValue = attributes.d || ( variation ? getPathD( variation.icon ) : '' );

		return iconName && dValue ? (
			<path data-name={ iconName } d={ dValue }></path>
		) : (
			<></>
		);
	},
} );

variations.forEach( ( variation ) => {
		registerBlockVariation( metadata.name, {
			name: variation.name,
			title: variation.title,
			icon: variation.icon,
			attributes: {
				...variation.attributes,
				d: getPathD( variation.icon ),
			},
			isDefault: variation.isDefault,
		} );
	} );
