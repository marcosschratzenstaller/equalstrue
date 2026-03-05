<?php

// API to register subscriber
add_action('rest_api_init', function () {
	register_rest_route('equalstrue/v1', '/newsletter', [
		'methods'  => 'POST',
		'callback' => function ($request) {
			$email = sanitize_email($request->get_param('email'));
			if (!is_email($email)) return new WP_REST_Response(['success' => false], 400);

			if (email_exists($email)) return new WP_REST_Response(['success' => true], 200);

			wp_create_user($email, wp_generate_password(), $email);
			$user = get_user_by('email', $email);
			if ($user) {
				$user->set_role('subscriber');
				return ['success' => true];
			}

			return new WP_REST_Response(['success' => false], 500);
		},
		'permission_callback' => '__return_true',
	]);
});

// CSV export button in user listing
add_action('restrict_manage_users', function () {
	if (current_user_can('manage_options')) {
		echo '<a href="' . admin_url('users.php?export_newsletter_csv=1') . '" class="button">Export Newsletter CSV</a>';
	}
});

add_action('admin_init', function () {
	if (!isset($_GET['export_newsletter_csv'])) return;

	if (!current_user_can('manage_options')) wp_die('Unauthorized');

	header('Content-Type: text/csv');
	header('Content-Disposition: attachment;filename=newsletter_subscribers.csv');

	$users = get_users(['role' => 'subscriber']);
	$output = fopen('php://output', 'w');
	fputcsv($output, ['Email']);

	foreach ($users as $user) {
		fputcsv($output, [$user->user_email]);
	}
	exit;
});
