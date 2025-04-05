import { createElement, isValidElement } from '@wordpress/element';

const getPathD = ( IconComponent ) => {
	if ( ! IconComponent ) {
		return '';
	}

	let iconInstance = isValidElement( IconComponent )
		? IconComponent
		: createElement( IconComponent );

	if ( typeof iconInstance.type === 'function' ) {
		iconInstance = iconInstance.type( iconInstance.props );
	}

	if ( ! isValidElement( iconInstance ) ) {
		return '';
	}

	const children = Array.isArray( iconInstance.props.children )
		? iconInstance.props.children
		: [ iconInstance.props.children ];

	const pathElements = children
		.map( ( child ) =>
			typeof child.type === 'function' ? child.type( child.props ) : child
		)
		.filter(
			( child ) => isValidElement( child ) && child.type === 'path'
		);

	if ( ! pathElements.length ) {
		return '';
	}

	return pathElements[ 0 ].props.d || '';
};

export { getPathD };
