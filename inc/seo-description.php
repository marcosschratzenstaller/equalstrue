<?php

function equalstruefront_seo_description_render() {
	$page_desc = get_option( 'seodescription' );

	if ( empty( $page_desc ) ) {
		return;
	}

	printf( '<meta name="description" content="%s" />', esc_attr( $page_desc ) );
}
add_action( 'wp_head', 'equalstruefront_seo_description_render' );

function equalstruefront_seo_description_setting() {
	register_setting( 'general', 'seodescription' );
	add_settings_field(
		'seodescription',
		__( 'Description SEO', 'equalstruefront' ),
		'equalstruefront_seo_description_callback',
		'general',
		'default',
		array( 'label_for' => 'seodescription' )
	);
}
add_action( 'admin_init', 'equalstruefront_seo_description_setting' );

function equalstruefront_seo_description_callback() {
	?>
	<textarea name="seodescription" id="seodescription" class="regular-text" cols="44" rows="5"><?php echo esc_html( get_option( 'seodescription' ) ); ?></textarea>
	<?php
}
