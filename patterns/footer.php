<?php
/**
 * Title: Footer
 * Slug: equalstrue/footer
 * Categories: footer
 * Block Types: core/template-part/footer
 * Description: Footer columns with logo, title, tagline and links.
 */

?>
<!-- wp:group {"tagName":"footer","className":"site-footer","layout":{"type":"constrained"}} -->
<footer class="wp-block-group site-footer">
	<!-- wp:group {"align":"wide","layout":{"type":"default"}} -->
	<div class="wp-block-group alignwide">
		<!-- wp:image {"className":"wp-block-site-logo","lightbox":{"enabled":false},"linkDestination":"none"} -->
		<figure class="wp-block-image wp-block-site-logo">
			<img
				src="<?php echo get_template_directory_uri(); ?>/assets/images/equalstrue-logo.svg"
				alt="<?php echo esc_attr( get_bloginfo( 'sitetitle' ) ); ?>"
			/>
		</figure>
		<!-- /wp:image -->
	</div>
	<!-- /wp:group -->
</footer>
<!-- /wp:group -->
