<?php

function equalstruefront_setup() {
	add_theme_support( 'title-tag' );
	add_theme_support( 'wp-block-styles' );
	add_theme_support( 'editor-styles' );
	add_editor_style(
		array(
			'assets/css/both.css',
			'assets/css/editor.css',
		)
	);
	remove_theme_support( 'core-block-patterns' );
}
add_action( 'after_setup_theme', 'equalstruefront_setup' );

function equalstruefront_scripts() {
	$directory_uri = trailingslashit( get_template_directory_uri() );
	$directory     = trailingslashit( get_template_directory() );

	$stylesheets = array(
		'equalstruefront-both' => array(
			'src'  => 'assets/css/both.css',
			'deps' => array(),
		),
		'equalstruefront-view' => array(
			'src'  => 'assets/css/view.css',
			'deps' => array( 'equalstruefront-both' ),
		),
	);

	foreach ( $stylesheets as $handle => $stylesheet ) {
		$file = $directory . $stylesheet['src'];
		if ( ! file_exists( $file ) ) {
			continue;
		}
		wp_register_style(
			$handle,
			$directory_uri . $stylesheet['src'],
			$stylesheet['deps'],
			'1.0.0-' . filemtime( $file )
		);
		wp_enqueue_style( $handle );
	}
}
add_action( 'wp_enqueue_scripts', 'equalstruefront_scripts' );

function equalstruefront_block_variations() {
	if ( ! function_exists( 'register_block_style' ) ) {
		return;
	}
	register_block_style(
		'core/paragraph',
		array(
			'name'  => 'heading',
			'label' => __( 'Heading', 'equalstruefront' ),
		)
	);
	register_block_style(
		'core/button',
		array(
			'name'  => 'link',
			'label' => __( 'Link', 'equalstruefront' ),
		)
	);
}
add_action( 'init', 'equalstruefront_block_variations' );

function equalstruefront_navigation_toggle( $block_content, $block ) {
	if ( 'core/navigation' === $block['blockName'] ) {
		$open_from     = '<rect x="4" y="7.5" width="16" height="1.5" /><rect x="4" y="15" width="16" height="1.5" />';
		$open_to       = '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5" d="M12 3.75v16.5M3.75 12h16.5"/>';
		$block_content = preg_replace( '#' . $open_from . '#', $open_to, $block_content );
	}
	return $block_content;
}
add_filter( 'render_block', 'equalstruefront_navigation_toggle', 10, 2 );

/**
 * Registers the block using a `blocks-manifest.php` file, which improves the performance of block type registration.
 * Behind the scenes, it also registers all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://make.wordpress.org/core/2025/03/13/more-efficient-block-type-registration-in-6-8/
 * @see https://make.wordpress.org/core/2024/10/17/new-block-type-registration-apis-to-improve-performance-in-wordpress-6-7/
 */
function equalstruefront_icon_block_init() {
	/**
	 * Registers the block(s) metadata from the `blocks-manifest.php` and registers the block type(s)
	 * based on the registered block metadata.
	 * Added in WordPress 6.8 to simplify the block metadata registration process added in WordPress 6.7.
	 *
	 * @see https://make.wordpress.org/core/2025/03/13/more-efficient-block-type-registration-in-6-8/
	 */
	if ( function_exists( 'wp_register_block_types_from_metadata_collection' ) ) {
		wp_register_block_types_from_metadata_collection( __DIR__ . '/blocks', __DIR__ . '/blocks/blocks-manifest.php' );
		return;
	}

	/**
	 * Registers the block(s) metadata from the `blocks-manifest.php` file.
	 * Added to WordPress 6.7 to improve the performance of block type registration.
	 *
	 * @see https://make.wordpress.org/core/2024/10/17/new-block-type-registration-apis-to-improve-performance-in-wordpress-6-7/
	 */
	if ( function_exists( 'wp_register_block_metadata_collection' ) ) {
		wp_register_block_metadata_collection( __DIR__ . '/blocks', __DIR__ . '/blocks/blocks-manifest.php' );
	}
	/**
	 * Registers the block type(s) in the `blocks-manifest.php` file.
	 *
	 * @see https://developer.wordpress.org/reference/functions/register_block_type/
	 */
	$manifest_data = require __DIR__ . '/blocks/blocks-manifest.php';
	foreach ( array_keys( $manifest_data ) as $block_type ) {
		register_block_type( __DIR__ . "/blocks/{$block_type}" );
	}
}
add_action( 'init', 'equalstruefront_icon_block_init' );

function equalstruefront_test_pattern() {
	// phpcs:disable WordPress.Security.NonceVerification.Recommended
	if ( defined( 'WP_DEBUG' ) && WP_DEBUG && isset( $_GET['pattern'] ) ) {
		$pattern = sanitize_text_field( wp_unslash( $_GET['pattern'] ) );
		$file    = get_template_directory() . "/patterns/{$pattern}.php";
		if ( file_exists( $file ) ) {
			ob_start();
			include $file;
			echo ob_get_clean(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			die;
		}
	}
	// phpcs:enable WordPress.Security.NonceVerification.Recommended
}
add_action( 'after_setup_theme', 'equalstruefront_test_pattern' );

function equalstruefront_social_links( $block_content, $block ) {
	if ( 'core/social-link' === $block['blockName'] ) {
		$replaces = array(
			'instagram' => 'M7.05 2.508a4.966 4.966 0 0 0-4.961 4.96v9.061a4.97 4.97 0 0 0 4.96 4.963h9.901a4.97 4.97 0 0 0 4.961-4.963V7.47a4.966 4.966 0 0 0-4.96-4.961zm0 1.75h9.9c1.77 0 3.211 1.44 3.211 3.21v9.061c0 1.77-1.44 3.213-3.21 3.213H7.05a3.216 3.216 0 0 1-3.211-3.213V7.47c0-1.77 1.44-3.211 3.21-3.211m9.99 1.385a1.242 1.242 0 1 0 0 2.484 1.242 1.242 0 0 0 0-2.484m-5.041 1.74a4.62 4.62 0 0 0-4.613 4.615 4.62 4.62 0 0 0 4.613 4.615 4.62 4.62 0 0 0 4.615-4.615A4.62 4.62 0 0 0 12 7.383m0 1.752A2.87 2.87 0 0 1 14.864 12 2.87 2.87 0 0 1 12 14.865 2.867 2.867 0 0 1 9.136 12a2.867 2.867 0 0 1 2.863-2.865',
			'tiktok'    => 'M26.124 9.972V14a10.6 10.6 0 0 1-5.58-2.259v8.143l-.016-.025q.016.242.016.493a7.347 7.347 0 0 1-7.333 7.336 7.347 7.347 0 0 1-7.335-7.337 7.347 7.347 0 0 1 8.499-7.246v3.971a3.477 3.477 0 0 0-4.639 3.275 3.48 3.48 0 0 0 3.475 3.474 3.48 3.48 0 0 0 3.466-3.689V4.311h4.027q.019.513.043 1.026c.026.671.266 1.315.682 1.843a7.6 7.6 0 0 0 2.224 1.917c.95.536 1.84.768 2.471.878z',
			'youtube'   => 'M22.046 8.694c-.125-1.212-.395-2.552-1.39-3.257-.77-.546-1.782-.566-2.727-.565l-5.994.005-5.764.005c-.803 0-1.583-.061-2.328.286-.641.299-1.142.866-1.443 1.497-.419.878-.506 1.873-.557 2.844a46 46 0 0 0 .028 5.308c.082 1.29.29 2.715 1.287 3.537.883.728 2.129.764 3.275.765l10.912.009c.466 0 .953-.008 1.428-.06.935-.1 1.826-.369 2.427-1.062.606-.698.762-1.67.854-2.591a33.3 33.3 0 0 0-.008-6.721M9.832 15.13V8.87l5.42 3.13z',
			'threads'   => 'M17.18 11.056c2.868 1.208 4.28 4.099 3.343 7.09-.638 2.042-2.455 3.692-4.402 4.437-2.455.943-5.752.883-8.173-.122-4.91-2.035-6.057-7.686-5.569-12.388.34-3.291 1.71-6.5 4.734-8.149C9.393.676 12.31.5 14.804 1.021c2.591.543 4.694 2.076 5.968 4.397.394.712.712 1.5.95 2.375.006.034-.007.069-.04.075l-1.804.476c-.034.006-.069-.014-.076-.04q-.404-1.548-1.289-2.748c-1.845-2.51-5.229-3.182-8.146-2.66-3.439.618-5.338 3.033-5.894 6.35-.454 2.694-.312 5.814.93 8.298 1.044 2.09 2.936 3.263 5.215 3.59 1.228.169 2.428.149 3.602-.069 1.683-.312 3.486-1.425 4.218-3.02.476-1.031.523-2.34 0-3.365a3.45 3.45 0 0 0-1.336-1.404c-.027-.02-.068-.006-.082.02q-.009.01-.007.02a7.4 7.4 0 0 1-.353 1.48c-.244.685-.596 1.276-1.065 1.757-1.573 1.621-4.313 1.764-6.165.596-1.479-.936-2.035-2.849-1.33-4.423.732-1.628 2.524-2.334 4.225-2.415a14 14 0 0 1 2.673.108c.034.007.06-.02.068-.054v-.02a4.3 4.3 0 0 0-.27-.916c-.57-1.255-1.853-1.588-3.134-1.425a2.72 2.72 0 0 0-1.947 1.154.057.057 0 0 1-.082.013L8.1 8.126c-.026-.02-.033-.054-.013-.088q1.23-1.733 3.344-2.009c1.167-.156 2.475.027 3.493.645 1.526.936 2.068 2.62 2.204 4.322q.018.05.047.06zm-7.32 2.66c-.305 1.025.401 1.832 1.357 2.076 1.343.34 2.835.04 3.473-1.337q.377-.816.447-1.906c0-.034-.02-.06-.047-.06a10.5 10.5 0 0 0-3.066-.137c-.848.09-1.899.476-2.164 1.364',
			'linkedin'  => 'M5.259 3.121q-.996 0-1.627.588A1.95 1.95 0 0 0 3 5.184q0 .864.63 1.453c.422.391.978.586 1.628.586q.975 0 1.607-.586c.42-.392.631-.862.631-1.453q0-.887-.63-1.475c-.422-.391-.943-.588-1.608-.588m11.187 5.6q-1.166-.001-2.097.455a3.8 3.8 0 0 0-1.48 1.24V8.848H9.246v11.82h3.621v-6.42q0-1.185.615-1.842t1.65-.656 1.651.656q.615.657.615 1.842v6.42H21v-6.906q0-2.35-1.24-3.696v-.002q-1.238-1.343-3.313-1.343m-13.093.16v11.998h3.79V8.88Z',
		);
		$service  = false;
		if ( isset( $block['attrs'] ) && isset( $block['attrs']['service'] ) ) {
			$service = $block['attrs']['service'];
		}
		if ( isset( $replaces[ $service ] ) ) {
			$block_content = preg_replace( '/(d=")[^"]+(")/', '$1' . $replaces[ $service ] . '$2', $block_content );
		}
	}
	return $block_content;
}
add_filter( 'render_block', 'equalstruefront_social_links', 10, 2 );

require get_theme_file_path( 'inc/seo-description.php' );

require get_theme_file_path( 'inc/newsletter-subscribe.php' );
