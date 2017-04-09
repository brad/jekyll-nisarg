<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after
 *
 * @package Nisarg
 */

?>
	</div><!-- #content -->
	<footer id="colophon" class="site-footer" role="contentinfo">
		<div class="row site-info">
			<?php echo '&copy; '.date( 'Y' ); ?>
			<span class="sep"> | </span>
			<?php printf( esc_html__( 'Proudly Powered by ','nisarg' ) ); ?>
			<a href=" <?php echo esc_url( __( 'https://wordpress.org/', 'nisarg' ) ); ?>" >WordPress</a>
			<span class="sep"> | </span>
			<?php
			$nisarg_theme_url_str = '<a href="'.esc_url( 'https://wordpress.org/themes/nisarg/' ).'" rel="designer">Nisarg</a>';
			printf( esc_html__( 'Theme: %1$s', 'nisarg' ), $nisarg_theme_url_str );
			?>
		</div><!-- .site-info -->
	</footer><!-- #colophon -->
</div><!-- #page -->
<?php wp_footer(); ?>
</body>
</html>
