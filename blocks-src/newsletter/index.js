import { registerBlockType } from '@wordpress/blocks';
import { useState } from '@wordpress/element';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

import './style.scss';

import metadata from './block.json';

registerBlockType( metadata.name, {
	edit: ({ attributes, setAttributes }) => {
		const { successMessage, errorMessage } = attributes;
		const blockProps = useBlockProps();
		const [email, setEmail] = useState('');
		const [status, setStatus] = useState(null);

		const handleSubmit = async (e) => {
			e.preventDefault();
			setStatus(null);

			const response = await fetch('/wp-json/equalstrue/v1/newsletter', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email }),
			});

			const result = await response.json();
			setStatus(result.success ? 'success' : 'error');
		};

		return (
			<>
				<InspectorControls>
					<PanelBody title="Messages" initialOpen={true}>
						<TextControl
							label="Success Message"
							value={successMessage}
							onChange={(value) => setAttributes({ successMessage: value })}
						/>
						<TextControl
							label="Error Message"
							value={errorMessage}
							onChange={(value) => setAttributes({ errorMessage: value })}
						/>
					</PanelBody>
				</InspectorControls>

				<div {...blockProps}>
					<form onSubmit={handleSubmit}>
						<input
							type="email"
							required
							placeholder="Your email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<button type="submit">Subscribe</button>
					</form>
					{status === 'success' && <p className="success">{successMessage}</p>}
					{status === 'error' && <p className="error">{errorMessage}</p>}
				</div>
			</>
		);
	},

	save: () => {
		const blockProps = useBlockProps.save();
		return (
			<div {...blockProps}>
				<form>
					<input type="email" required placeholder="Your email" />
					<button type="submit">Subscribe</button>
				</form>
			</div>
		);
	},
} );
