<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @link       https://github.com/KostaBinov27
 * @since      1.0.0
 *
 * @package    Oeak_Dashbaord_Api
 * @subpackage Oeak_Dashbaord_Api/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the public-facing stylesheet and JavaScript.
 *
 * @package    Oeak_Dashbaord_Api
 * @subpackage Oeak_Dashbaord_Api/public
 * @author     Kosta <kostabinovps@gmail.com>
 */
class Oeak_Dashbaord_Api_Public
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
	 * @param      string    $plugin_name       The name of the plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct($plugin_name, $version)
	{

		$this->plugin_name = $plugin_name;
		$this->version = $version;
	}

	/**
	 * Register the stylesheets for the public-facing side of the site.
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

		wp_enqueue_style('datatables-css', plugin_dir_url(__FILE__) . 'css/datatables.min.css', array(), $this->version, 'all');
		wp_enqueue_style($this->plugin_name, plugin_dir_url(__FILE__) . 'css/oeak-dashbaord-api-public.css', array(), $this->version, 'all');
	}

	/**
	 * Register the JavaScript for the public-facing side of the site.
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

		wp_enqueue_script('datatables-js', plugin_dir_url(__FILE__) . 'js/datatables.min.js', array('jquery'), $this->version, false);
		wp_enqueue_script('alphabetNumeric-js', 'https://cdn.datatables.net/plug-ins/1.10.25/sorting/alphabetNumeric.js', array('jquery'), $this->version, false);
		wp_enqueue_script($this->plugin_name, plugin_dir_url(__FILE__) . 'js/oeak-dashbaord-api-public.js', array('jquery'), $this->version, false);
		wp_localize_script($this->plugin_name, 'ajax_object', array('ajax_url' => admin_url('admin-ajax.php')));
	}


	public function oeak_dashboard_data($atts)
	{

		// Get the stored dates from the options table
		$podcast_date = get_option('podcast_date', '');
		$newsletter_date = get_option('newsletter_date', '');

		// Split the podcast date into month and year
		if ($podcast_date) {
			list($podcast_month, $podcast_year) = explode('-', $podcast_date);
			$podcast_month = (int) $podcast_month; // Convert to integer to remove leading zero
		} else {
			$podcast_year = '';
			$podcast_month = '';
		}

		// Split the newsletter date into month and year
		if ($newsletter_date) {
			list($newsletter_month, $newsletter_year) = explode('-', $newsletter_date);
			$newsletter_month = (int) $newsletter_month; // Convert to integer to remove leading zero
		} else {
			$newsletter_year = '';
			$newsletter_month = '';
		}
		
		$atts = shortcode_atts(array(
			'year' => $podcast_year,
			'month' => $podcast_month,
			'platform' => '',
		), $atts, 'oeak_dashboard_data');


		ob_start();
		require plugin_dir_path(__FILE__) . "partials/oeak-dashbaord-api-public-display.php";
		$return_string = ob_get_clean();
		return $return_string;
	}
}
