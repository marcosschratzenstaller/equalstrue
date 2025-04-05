import { registerBlockType, registerBlockVariation } from '@wordpress/blocks';
import metadata from './block.json';
import { getPathD } from './utils';
import variations from './variations';
import { iconsMap } from '../icon/icons';

registerBlockType( metadata.name, {
	category: `${ metadata.name.split( '/' )[ 0 ] }-icons`,
	variations,
	edit: ( { attributes } ) => {
		const iconName = attributes.name;
		const IconComponent = iconsMap[ iconName ];
		const dValue = getPathD( IconComponent );

		return iconName ? (
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
		const IconComponent = iconsMap[ iconName ];
		const dValue = getPathD( IconComponent );

		return iconName ? (
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
		attributes: variation.attributes,
		isDefault: variation.isDefault,
		example: (
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden="true"
				focusable="false"
			>
				<path d={ getPathD( iconsMap[ variation.name ] ) } />
			</svg>
		),
	} );
} );
