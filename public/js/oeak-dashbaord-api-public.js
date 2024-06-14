(function ($) {
	'use strict';

	/**
	 * All of the code for your public-facing JavaScript source
	 * should reside in this file.
	 *
	 * Note: It has been assumed you will write jQuery code here, so the
	 * $ function reference has been prepared for usage within the scope
	 * of this function.
	 *
	 * This enables you to define handlers, for when the DOM is ready:
	 *
	 * $(function() {
	 *
	 * });
	 *
	 * When the window is loaded:
	 *
	 * $( window ).load(function() {
	 *
	 * });
	 *
	 * ...and/or other possibilities.
	 *
	 * Ideally, it is not considered best practise to attach more than a
	 * single DOM-ready or window-load handler for a particular page.
	 * Although scripts in the WordPress core, Plugins and Themes may be
	 * practising this, we should strive to set a better example in our own work.
	 */
	jQuery(document).ready(function ($) {
		var platform_input = $('#platform').val();
		var data_to_send = {
			year: $('#year').val(),
			month: $('#month').val(),
			platform: $('#platform').val(),
			action: "get_oeak_data",
		};
		if (platform_input == 'podcast') {
			$.ajax({
				url: ajax_object.ajax_url, // URL to admin-ajax.php
				type: 'POST',
				data: data_to_send,
				success: function (response) {
					$('#dataTable').DataTable({
						data: JSON.parse(response),
						columns: [
							{
								data: "logo",
								render: function (data, type, row) {
									// If type is 'display', render the logo as an image
									if (type === 'display') {
										return '<img src="https://previewdash.oeak.at/storage/logos/' + data + '" alt="Logo" style="width: 50px; height: auto;">';
									}
									return data;
								}
							},
							{ data: "podcast_name" },
							{ data: "company_name" },
							{ data: "podcast_category" },
							{
								data: "podcast_downloads_current_month",
								render: function (data, type, row) {
									if (type === 'display') {
										return parseFloat(data).toLocaleString('de-DE'); // German locale for European formatting
									}
									return data;
								}
							},
							{
								data: "podcast_downloads_previous_month",
								render: function (data, type, row) {
									if (type === 'display') {
										return parseFloat(data).toLocaleString('de-DE'); // German locale for European formatting
									}
									return data;
								}
							},
							{
								data: "podcast_downloads_percentage_increase",
								render: function (data, type, row) {
									if (type === 'display') {
										return data + '%';
									}
									return data;
								}
							},
							{
								data: "podcast_active_episodes_current_month",
								render: function (data, type, row) {
									if (type === 'display') {
										return parseFloat(data).toLocaleString('de-DE'); // German locale for European formatting
									}
									return data;
								}
							},
							{
								data: "podcast_active_episodes_previous_month",
								render: function (data, type, row) {
									if (type === 'display') {
										return parseFloat(data).toLocaleString('de-DE'); // German locale for European formatting
									}
									return data;
								}
							},
							{
								data: "podcast_published_episodes_current_month",
								render: function (data, type, row) {
									if (type === 'display') {
										return parseFloat(data).toLocaleString('de-DE'); // German locale for European formatting
									}
									return data;
								}
							},
							{ data: "podcast_rank_current_month" }
						],
						// Sort by podcast_rank_current_month column by default
						order: [[10, 'asc']],
						paging: false, // Disable pagination
						dom: 'Bfrtip', // Add this to include buttons
						buttons: [
							'excel',
							{
								extend: 'pdfHtml5',
								orientation: 'landscape', // Export the PDF in landscape mode
								pageSize: 'A4', // Optional: Set the page size to A4
								exportOptions: {
									columns: ':visible' // Export only visible columns
								}
							}
						]
					});
				},
				error: function (xhr, status, error) {
					// Handle errors here
					console.error("Network response was not ok:", error);
				},
				complete: function () {
					// This code runs regardless of success or error
				},
			});

			$(document).on('change', '#yearsselect2', function () {
				var choosenPeriod = $(this).val();
				const dateStr = choosenPeriod;
				var [month, year] = dateStr.split('/');

				$('#year').val(year);
				$('#month').val(month);

				var data_to_send = {
					year: $('#year').val(),
					month: $('#month').val(),
					platform: $('#platform').val(),
					action: "get_oeak_data",
				};
				$.ajax({
					url: ajax_object.ajax_url, // URL to admin-ajax.php
					type: 'POST',
					data: data_to_send,
					success: function (response) {
						var dataTable = $('#dataTable').DataTable();
						dataTable.destroy();
						
						$('#dataTable').DataTable({
							data: JSON.parse(response),
							columns: [
								{
									data: "logo",
									render: function (data, type, row) {
										// If type is 'display', render the logo as an image
										if (type === 'display') {
											return '<img src="https://previewdash.oeak.at/storage/logos/' + data + '" alt="Logo" style="width: 50px; height: auto;">';
										}
										return data;
									}
								},
								{ data: "podcast_name" },
								{ data: "company_name" },
								{ data: "podcast_category" },
								{
									data: "podcast_downloads_current_month",
									render: function (data, type, row) {
										if (type === 'display') {
											return parseFloat(data).toLocaleString('de-DE'); // German locale for European formatting
										}
										return data;
									}
								},
								{
									data: "podcast_downloads_previous_month",
									render: function (data, type, row) {
										if (type === 'display') {
											return parseFloat(data).toLocaleString('de-DE'); // German locale for European formatting
										}
										return data;
									}
								},
								{
									data: "podcast_downloads_percentage_increase",
									render: function (data, type, row) {
										if (type === 'display') {
											return data + '%';
										}
										return data;
									}
								},
								{
									data: "podcast_active_episodes_current_month",
									render: function (data, type, row) {
										if (type === 'display') {
											return parseFloat(data).toLocaleString('de-DE'); // German locale for European formatting
										}
										return data;
									}
								},
								{
									data: "podcast_active_episodes_previous_month",
									render: function (data, type, row) {
										if (type === 'display') {
											return parseFloat(data).toLocaleString('de-DE'); // German locale for European formatting
										}
										return data;
									}
								},
								{
									data: "podcast_published_episodes_current_month",
									render: function (data, type, row) {
										if (type === 'display') {
											return parseFloat(data).toLocaleString('de-DE'); // German locale for European formatting
										}
										return data;
									}
								},
								{ data: "podcast_rank_current_month" }
							],
							// Sort by podcast_rank_current_month column by default
							order: [[10, 'asc']],
							paging: false, // Disable pagination
							dom: 'Bfrtip', // Add this to include buttons
							buttons: [
								'excel',
								{
									extend: 'pdfHtml5',
									orientation: 'landscape', // Export the PDF in landscape mode
									pageSize: 'A4', // Optional: Set the page size to A4
									exportOptions: {
										columns: ':visible' // Export only visible columns
									}
								}
							]
						});

						$('.currnetmonth').each(function () {
							$(this).html(month);
						});
						$('.lastmonth').each(function () {
							$(this).html('0' + month - 1);
							if (month == '01') {
								$(this).html('12');
							}
						});
						$('.currnetyear').each(function () {
							$(this).html(year);
						});
						$('.currnetyearlastmonth').each(function () {
							$(this).html(year);
							if (month == '01') {
								$(this).html(year - 1);
							}
						});
					},
					error: function (xhr, status, error) {
						// Handle errors here
						console.error("Network response was not ok:", error);
					},
					complete: function () {
						// This code runs regardless of success or error
					},
				});
			});
		} else if (platform_input == 'newsletter') {
			var data_to_send = {
				platform: platform_input,
				month: $('#month').val(),
				action: "get_oeak_data",
			};

			$.extend( $.fn.dataTableExt.oSort, {
				"string-case-insensitive-asc": function (a, b) {
					return a.toLowerCase().localeCompare(b.toLowerCase());
				},
			
				"string-case-insensitive-desc": function (a, b) {
					return b.toLowerCase().localeCompare(a.toLowerCase());
				}
			});
			
			$.ajax({
				url: ajax_object.ajax_url,
				type: 'POST',
				data: data_to_send,
				success: function (response) {
					var data = JSON.parse(response);
			
					// Custom comparator function for sorting by month and year
					function sortByMonthAndYearDesc(a, b) {
						if (a.year === b.year) {
							return b.month - a.month;
						}
						return b.year - a.year;
					}
			
					// Sort the data array by month and year
					data.sort(sortByMonthAndYearDesc);
			
					// Group entries by month and year
					let groupedData = {};
					data.forEach(entry => {
						let key = `${entry.year}-${entry.month}`;
						if (!groupedData[key]) {
							groupedData[key] = [];
						}
						groupedData[key].push(entry);
					});
			
					// Sort companies within each group alphabetically
					for (let key in groupedData) {
						groupedData[key].sort((a, b) => a.company_name.localeCompare(b.company_name));
					}
			
					// Concatenate groups into the final sorted array
					let sortedData = [];
					for (let key in groupedData) {
						sortedData = sortedData.concat(groupedData[key]);
					}
					// Initialize DataTable with sorted data
					$('#dataTable').DataTable({
						data: sortedData,
						columns: [
							{ data: "company_name" },
							{ data: "newsletter_name" },
							{
								data: null,
								render: function (data, type, row) {
									if (type === 'display') {
										return row.month + '/' + row.year;
									}
									return data;
								}
							},
							{
								data: "newsletters_number_per_month",
								render: function (data, type, row) {
									if (type === 'display') {
										return parseFloat(data).toLocaleString('de-DE');
									}
									return data;
								}
							},
							{
								data: "average_newsletters_per_mailing",
								render: function (data, type, row) {
									if (type === 'display') {
										let roundedNumber = Math.ceil(parseFloat(data));
										let formattedNumber = roundedNumber.toLocaleString('de-DE');
										return formattedNumber;
									}
									return data;
								}
							},
							{
								data: "newsletter_absolute_openings",
								render: function (data, type, row) {
									if (type === 'display') {
										return parseFloat(data).toLocaleString('de-DE');
									}
									return data;
								}
							},
							{
								data: "newsletter_relative_opening_rate",
								render: function (data, type, row) {
									if (type === 'display') {
										return data + '%';
									}
									return data;
								}
							},
						],
						order: [], // Remove default sorting
						paging: false,
						dom: 'Bfrtip',
						buttons: [
							'excel',
							{
								extend: 'pdfHtml5',
								orientation: 'landscape',
								pageSize: 'A4',
								exportOptions: {
									columns: ':visible'
								}
							}
						]
					});
				},
				error: function (xhr, status, error) {
					console.error("Network response was not ok:", error);
				},
				complete: function () {
					// This code runs regardless of success or error
				},
			});
			
					
		}
	});
})(jQuery);
