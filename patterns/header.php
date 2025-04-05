<?php
/**
 * Title: Header
 * Slug: equalstrue/header
 * Categories: header
 * Block Types: core/template-part/header
 * Description: Header with site title and navigation.
 */

?>

<!-- wp:group {"tagName":"header","align":"full","className":"site-header","style":{"position":{"type":"sticky","top":"0px"}},"layout":{"type":"constrained"}} -->
<header class="wp-block-group alignfull site-header">
	<!-- wp:group {"align":"wide","style":{"spacing":{"padding":{"top":"var:preset|spacing|40","bottom":"var:preset|spacing|40"}}},"layout":{"type":"flex","flexWrap":"nowrap","justifyContent":"space-between"}} -->
	<div class="wp-block-group alignwide" style="padding-top:var(--wp--preset--spacing--40);padding-bottom:var(--wp--preset--spacing--40)">
		<!-- wp:image {"className":"wp-block-site-logo","lightbox":{"enabled":false},"linkDestination":"custom"} -->
		<figure class="wp-block-image wp-block-site-logo">
			<a
				href="<?php echo esc_url( home_url( '/' ) ); ?>"
				>
				<img
					src="<?php echo get_template_directory_uri(); ?>/assets/images/equalstrue-logo.svg"
					alt="<?php echo esc_attr( get_bloginfo( 'sitetitle' ) ); ?>"
				/>
			</a>
		</figure>
		<!-- /wp:image -->
		<!-- wp:navigation {"overlayBackgroundColor":"base","overlayTextColor":"contrast","layout":{"type":"flex","justifyContent":"right","flexWrap":"wrap"}} /-->
		<!-- wp:buttons -->
		<div class="wp-block-buttons">
			<!-- wp:button {"className":"is-style-outline"} -->
			<div class="wp-block-button is-style-outline">
				<a class="wp-block-button__link wp-element-button" href="#">
				<?php esc_html_e( 'Hire Now', 'equalstrue' ); ?>
				</a>
			</div>
			<!-- /wp:button -->
		</div>
		<!-- /wp:buttons -->
	</div>
	<!-- /wp:group -->
</header>
<!-- /wp:group -->
