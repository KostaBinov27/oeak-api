<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       https://github.com/KostaBinov27
 * @since      1.0.0
 *
 * @package    Oeak_Dashbaord_Api
 * @subpackage Oeak_Dashbaord_Api/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Oeak_Dashbaord_Api
 * @subpackage Oeak_Dashbaord_Api/admin
 * @author     Kosta <kostabinovps@gmail.com>
 */
class Oeak_Dashbaord_Api_Admin
{

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of this plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct($plugin_name, $version)
	{

		$this->plugin_name = $plugin_name;
		$this->version = $version;
	}

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles()
	{

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Oeak_Dashbaord_Api_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Oeak_Dashbaord_Api_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_style($this->plugin_name, plugin_dir_url(__FILE__) . 'css/oeak-dashbaord-api-admin.css', array(), $this->version, 'all');
	}

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts()
	{

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Oeak_Dashbaord_Api_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Oeak_Dashbaord_Api_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_script($this->plugin_name, plugin_dir_url(__FILE__) . 'js/oeak-dashbaord-api-admin.js', array('jquery'), $this->version, false);
	}

	// Function to add the menu item
	public function custom_admin_menu()
	{
		add_menu_page(
			'Tables Settings',    // Page title
			'Tables Settings',          // Menu title
			'manage_options',       // Capability
			'tables-settings',    // Menu slug
			'custom_menu_page',     // Function to display page content
			'dashicons-admin-generic', // Icon URL or dashicon class
			6                       // Position
		);

		// Function to display the menu page content
		function custom_menu_page()
		{
			// Handle form submission
			if ($_SERVER['REQUEST_METHOD'] === 'POST') {
				if (isset($_POST['podcast_date'])) {
					update_option('podcast_date', sanitize_text_field($_POST['podcast_date']));
				}
				if (isset($_POST['newsletter_date'])) {
					update_option('newsletter_date', sanitize_text_field($_POST['newsletter_date']));
				}
				echo '<div class="updated"><p>Settings saved.</p></div>';
			}

			$podcast_date = get_option('podcast_date', '');
			$newsletter_date = get_option('newsletter_date', '');

			// Get current year and month
			$current_year = date('Y');
			$current_month = date('m');

			// Generate date options
			$date_options = [];
			for ($year = 2024; $year <= $current_year; $year++) {
				for ($month = 1; $month <= 12; $month++) {
					if ($year == $current_year && $month > $current_month) break;
					$formatted_month = str_pad($month, 2, '0', STR_PAD_LEFT);
					$date_options[] = "$formatted_month-$year";
				}
			}
			$date_options = array_reverse($date_options); // Reverse to show latest dates first

			echo '<div class="wrap">';
			echo '<h1>Newsletters and Podcasts Settings</h1>';
			echo '<form method="POST" action="">';
			echo '<table class="form-table">';

			// Podcast Date Dropdown
			echo '<tr>';
			echo '<th scope="row"><label for="podcast_date">Podcast And Newsletter Date</label></th>';
			echo '<td><select name="podcast_date" id="podcast_date">';
			foreach ($date_options as $option) {
				$selected = ($option === $podcast_date) ? 'selected' : '';
				echo '<option value="' . esc_attr($option) . '" ' . $selected . '>' . esc_html($option) . '</option>';
			}
			echo '</select></td>';
			echo '</tr>';

			// Newsletter Date Dropdown
			// echo '<tr>';
			// echo '<th scope="row"><label for="newsletter_date">Newsletter Date</label></th>';
			// echo '<td><select name="newsletter_date" id="newsletter_date">';
			// foreach ($date_options as $option) {
			// 	$selected = ($option === $newsletter_date) ? 'selected' : '';
			// 	echo '<option value="' . esc_attr($option) . '" ' . $selected . '>' . esc_html($option) . '</option>';
			// }
			// echo '</select></td>';
			// echo '</tr>';

			echo '</table>';
			echo '<p class="submit"><input type="submit" class="button-primary" value="Save Changes"></p>';
			echo '</form>';
			echo '</div>';
		}
	}
}
