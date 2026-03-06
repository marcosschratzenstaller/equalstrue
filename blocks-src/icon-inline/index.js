/**
 * WordPress dependencies
 */
import {
	Path,
	SVG,
	Modal,
	Button,
	SearchControl,
	__experimentalTruncate as Truncate
} from '@wordpress/components';
import {
	BlockIcon,
	RichTextToolbarButton,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { Fragment, useState } from '@wordpress/element';
import {
	registerFormatType,
	applyFormat,
	getActiveFormat,
	insert,
	removeFormat,
} from '@wordpress/rich-text';

// Map of icons with their corresponding React components.
import variations from '../icon-path/variations'; // Import custom icons map

// Create a map with name as key, and { title, icon } as value
const iconsMap = Object.fromEntries(
	variations.map( ( { name, title, icon } ) => [ name, { title, icon } ] )
);

import './editor.scss';
import './style.scss';

import metadata from './block.json';
const namespace = metadata.name.split('/')[0];
const name = metadata.name;
const title = metadata.title;

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
			d="M16 13v1.5h4V13ZM4 18.5h16V17H4ZM9 5a.91.91 0 0 0-.903.903c0 .253.107.483.278.648v1.94L7.003 7.12a.9.9 0 0 0-.261-.654.91.91 0 0 0-1.277 0 .91.91 0 0 0 0 1.277.898.898 0 0 0 .654.26l1.372 1.373h-1.94a.9.9 0 0 0-.648-.278A.91.91 0 0 0 4 10c0 .494.41.903.903.903a.901.901 0 0 0 .648-.278h1.94L6.12 11.997a.9.9 0 0 0-.654.261.91.91 0 0 0 0 1.277.91.91 0 0 0 1.277 0 .898.898 0 0 0 .26-.654l1.373-1.372v1.94a.9.9 0 0 0-.278.648c0 .493.41.903.903.903a.91.91 0 0 0 .903-.903.901.901 0 0 0-.278-.648v-1.94l1.372 1.372a.9.9 0 0 0 .261.654.91.91 0 0 0 1.277 0 .91.91 0 0 0 0-1.277.9.9 0 0 0-.654-.26l-1.372-1.373h1.94c.165.17.396.278.648.278A.91.91 0 0 0 14 10a.91.91 0 0 0-.903-.903.901.901 0 0 0-.648.278h-1.94l1.372-1.372a.9.9 0 0 0 .654-.261.91.91 0 0 0 0-1.277.91.91 0 0 0-1.277 0 .9.9 0 0 0-.26.654L9.624 8.491v-1.94a.901.901 0 0 0 .278-.648A.91.91 0 0 0 9 5Z"
			fill="currentColor"
		/>
	</SVG>
);

const icon = {
	name,
	title,
	tagName: 'i',
	className: null,
	attributes: {
		className: 'class',
	},
	edit: Edit,
};

const hasFormatAt = ( formats, index ) =>
	Array.isArray( formats?.[ index ] ) &&
	formats[ index ].some( ( format ) => format.type === name );

const getSelectedIconRange = ( value ) => {
	const start = value?.start ?? 0;
	const formats = value?.formats;

	if ( hasFormatAt( formats, start ) ) {
		return {
			start,
			end: start + 1,
		};
	}

	if ( start > 0 && hasFormatAt( formats, start - 1 ) ) {
		return {
			start: start - 1,
			end: start,
		};
	}

	return null;
};

function Edit( {
	value,
	onChange,
	onFocus,
	isActive,
} ) {
	const [ isModalOpen, setModalOpen ] = useState( false );
	const [ searchTerm, setSearchTerm ] = useState( '' );
	const selectedIconRange = getSelectedIconRange( value );
	const activeIconFormat =
		getActiveFormat( value, name ) ||
		( selectedIconRange
			? getActiveFormat(
					{
						...value,
						start: selectedIconRange.start,
						end: selectedIconRange.end,
					},
					name
			  )
			: null );
	const isIconSelected = Boolean( selectedIconRange && activeIconFormat );

	// Opens the icon selection modal.
	const openModal = () => setModalOpen( true );
	// Closes the modal.
	const closeModal = () => setModalOpen( false );

	// Handles the icon selection.
	const onSelectIcon = ( key, event ) => {
		event.preventDefault();

		const className = `${ namespace }-icons--${ key }`;
		const iconFormat = {
			type: name,
			attributes: {
				className,
			},
		};
		let nextValue;

		if ( selectedIconRange ) {
			nextValue = removeFormat(
				value,
				name,
				selectedIconRange.start,
				selectedIconRange.end
			);
			nextValue = applyFormat(
				nextValue,
				iconFormat,
				selectedIconRange.start,
				selectedIconRange.end
			);
			nextValue = {
				...nextValue,
				start: selectedIconRange.end,
				end: selectedIconRange.end,
			};
		} else {
			const insertionPoint = value.start;
			const collapsedValue = {
				...value,
				start: insertionPoint,
				end: insertionPoint,
			};
			const nextChar = value.text?.[ insertionPoint ] || '';
			const shouldInsertSpaceAfter =
				nextChar !== '' && ! /\s/.test( nextChar );

			nextValue = insert( collapsedValue, '\u200B' );
			nextValue = applyFormat(
				nextValue,
				iconFormat,
				insertionPoint,
				insertionPoint + 1
			);

			if ( shouldInsertSpaceAfter ) {
				nextValue = insert(
					nextValue,
					' ',
					insertionPoint + 1,
					insertionPoint + 1
				);
			}
		}

		onChange( nextValue );
		onFocus();
		closeModal();
	};

	// Filter icons by search term
	const filteredIcons = Object.entries( iconsMap ).filter(
		( [ key, { title } ] ) =>
			key.toLowerCase().includes( searchTerm.toLowerCase() ) ||
			title.toLowerCase().includes( searchTerm.toLowerCase() )
	);

	return (
		<Fragment>
					<RichTextToolbarButton
						icon={ Icon }
						title={
							isIconSelected
								? __( 'Select icon', 'equalstrue' )
								: title
						}
						onClick={ openModal }
						isActive={ isActive || isIconSelected }
					/>
			{ isModalOpen && (
				<Modal
					title="Select an Icon"
					onRequestClose={ closeModal }
					isDismissible={ false }
					__experimentalHideHeader={ true }
					style={ {
						'--modal-boder-width': '1px',
						'--modal-content-padding': '32px',
						'--max-items': '7',
						'--item-min-width': '105px',
						width: 'calc(var(--max-items) * var(--item-min-width) + var(--modal-content-padding) * 2 + var(--modal-boder-width) * 2)',
						maxWidth: '100%',
						borderRadius: '4px',
						border: 'var(--modal-boder-width) solid #ccc',
					} }
				>
					{ Object.keys( iconsMap ).length > 7 && (
						<SearchControl
							label="Search icons"
							value={ searchTerm }
							onChange={ ( val ) => setSearchTerm( val ) }
							autoFocus
							__nextHasNoMarginBottom
						/>
					) }

					<div
						style={ {
							display: 'grid',
							gridTemplateColumns:
								'repeat(auto-fill, minmax(var(--item-min-width), 8.33333333%))',
							gap: '0',
						} }
					>
						{ filteredIcons.map( ( [ key, { title, icon } ] ) => (
							<Button
								__next40pxDefaultSize
								className="block-editor-block-types-list__item"
								key={ key }
								onClick={ ( event ) =>
									onSelectIcon( key, event )
								}
								style={ { padding: '10px' } }
							>
								<span className="block-editor-block-types-list__item-icon">
									<BlockIcon icon={ icon } showColors />
								</span>
								<span className="block-editor-block-types-list__item-title">
									<Truncate numberOfLines={ 3 }>
										{ title }
									</Truncate>
								</span>
							</Button>
						) ) }
					</div>
					</Modal>
				) }
			</Fragment>
		);
	}

// Register the inline format for inserting the icon.
// The format is applied as an <i> element with a dynamic class name.
registerFormatType( name, icon );
