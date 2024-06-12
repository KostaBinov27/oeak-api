<?php

/**
 * Define the internationalization functionality
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @link       https://github.com/KostaBinov27
 * @since      1.0.0
 *
 * @package    Oeak_Dashbaord_Api
 * @subpackage Oeak_Dashbaord_Api/includes
 */

/**
 * Define the internationalization functionality.
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @since      1.0.0
 * @package    Oeak_Dashbaord_Api
 * @subpackage Oeak_Dashbaord_Api/includes
 * @author     Kosta <kostabinovps@gmail.com>
 */
class Oeak_Dashbaord_Api_i18n {


	/**
	 * Load the plugin text domain for translation.
	 *
	 * @since    1.0.0
	 */
	public function load_plugin_textdomain() {

		load_plugin_textdomain(
			'oeak-dashbaord-api',
			false,
			dirname( dirname( plugin_basename( __FILE__ ) ) ) . '/languages/'
		);

	}



}
