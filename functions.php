<?php

function ninodem_setup() {
	add_theme_support( 'title-tag' );
	add_theme_support( 'wp-block-styles' );
	add_theme_support( 'editor-styles' );
	add_editor_style(
		[
			'assets/css/both.css',
			'assets/css/editor.css',
		]
	);
	remove_theme_support('core-block-patterns');
}
add_action( 'after_setup_theme', 'ninodem_setup' );

function equalstrue_scripts() {
	$directory_uri = trailingslashit(get_template_directory_uri());
	$directory = trailingslashit(get_template_directory());

	$stylesheets = [
		'equalstrue-both' => ['src'=>'assets/css/both.css','deps'=>[]],
		'equalstrue-view' => ['src'=>'assets/css/view.css','deps'=>['equalstrue-both']],
	];

	foreach ($stylesheets as $handle => $stylesheet) {
		$file = $directory . $stylesheet['src'];
		if (!file_exists($file)) {
			continue;
		}
		wp_register_style(
			$handle,
			$directory_uri . $stylesheet['src'],
			$stylesheet['deps'],
			'1.0.0-' . filemtime($file)
		);
		wp_enqueue_style($handle);
	}
}
add_action('wp_enqueue_scripts', 'equalstrue_scripts');

function ninodem_block_variations() {
	if ( ! function_exists( 'register_block_style' ) ) {
		return;
	}
	register_block_style(
		'core/paragraph',
		array(
			'name'  => 'heading',
			'label' => __( 'Heading', 'ninodem' ),
		)
	);
	register_block_style(
		'core/button',
		array(
			'name'  => 'link',
			'label' => __( 'Link', 'ninodem' ),
		)
	);
}
add_action( 'init', 'ninodem_block_variations' );

function equalstrue_navigation_toggle($block_content, $block) {
	if ('core/navigation' === $block['blockName']) {
		$open_from = '<rect x="4" y="7.5" width="16" height="1.5" /><rect x="4" y="15" width="16" height="1.5" />';
		$open_to = '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5" d="M12 3.75v16.5M3.75 12h16.5"/>';
		$block_content = preg_replace('#'.$open_from.'#', $open_to, $block_content);
	}
	return $block_content;
}
add_filter('render_block', 'equalstrue_navigation_toggle', 10, 2);

/**
 * Registers the block using a `blocks-manifest.php` file, which improves the performance of block type registration.
 * Behind the scenes, it also registers all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://make.wordpress.org/core/2025/03/13/more-efficient-block-type-registration-in-6-8/
 * @see https://make.wordpress.org/core/2024/10/17/new-block-type-registration-apis-to-improve-performance-in-wordpress-6-7/
 */
function esqualstrue_icon_block_init() {
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
add_action( 'init', 'esqualstrue_icon_block_init' );

function ninodem_test_pattern() {
	if (isset($_GET['pattern'])) {
		$pattern = sanitize_text_field($_GET['pattern']);
		$file = get_template_directory() . "/patterns/{$pattern}.php";
		if (file_exists($file)) {
			ob_start();
			include $file;
			echo ob_get_clean();
			die;
		}
	}
}
add_action( 'after_setup_theme', 'ninodem_test_pattern' );
