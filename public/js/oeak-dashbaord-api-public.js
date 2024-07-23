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
							{
								extend: 'excelHtml5',
								text: 'Export to Excel',
								customize: function (xlsx) {
									var sheet = xlsx.xl.worksheets['sheet1.xml'];
					
									// Define which columns to adjust (D, E, F => 3, 4, 5 in 0-based index)
									var columnsToAdjust = [3, 4, 6, 7, 8];
					
									// Loop through each row in the sheet
									$('row', sheet).each(function () {
										var cells = $(this).find('c');
					
										// Loop through each cell in the row
										cells.each(function (index) {
											if (columnsToAdjust.includes(index)) {
												// console.log(index);
												$(this).find('v').text($(this).find('v').text().replace(/[,.]/g, ''));
												$(this).find('t').text($(this).find('t').text().replace(/[,.]/g, ''));
												$(this).attr('s', '52'); // Assuming '52' is the right alignment style index

											}
										});
									});
								},
								exportOptions: {
									columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] // Specify all columns for export
								}
							},
							{
								extend: 'pdfHtml5',
								orientation: 'landscape', // Export the PDF in landscape mode
								pageSize: 'A4', // Optional: Set the page size to A4
								exportOptions: {
									columns: ':visible' // Export only visible columns
								},
								customize: function (doc) {
									doc['footer'] = (function (currentPage, pageCount) {
										return {
											columns: [
												{
													alignment: 'center',
													text: [
														'Seite ',
														{ text: currentPage.toString(), italics: true },
														' von ',
														{ text: pageCount.toString(), italics: true }
													]
												}
											],
											margin: [0, 0]
										};
									});
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
						
						// Save the current sorting order
						var order = dataTable.order();
			
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
							// Reapply the previous sorting order
							order: order,
							paging: false, // Disable pagination
							dom: 'Bfrtip', // Add this to include buttons
							buttons: [
								{
									extend: 'excelHtml5',
									text: 'Export to Excel',
									customize: function (xlsx) {
										var sheet = xlsx.xl.worksheets['sheet1.xml'];
						
										// Define which columns to adjust (D, E, F => 3, 4, 5 in 0-based index)
										var columnsToAdjust = [3, 4, 6, 7, 8];
						
										// Loop through each row in the sheet
										$('row', sheet).each(function () {
											var cells = $(this).find('c');
						
											// Loop through each cell in the row
											cells.each(function (index) {
												if (columnsToAdjust.includes(index)) {
													// console.log(index);
													$(this).find('v').text($(this).find('v').text().replace(/[,.]/g, ''));
													$(this).find('t').text($(this).find('t').text().replace(/[,.]/g, ''));
													$(this).attr('s', '52'); // Assuming '52' is the right alignment style index
												}
											});
										});
									},
									exportOptions: {
										columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] // Specify all columns for export
									}
								},
								{
									extend: 'pdfHtml5',
									orientation: 'landscape', // Export the PDF in landscape mode
									pageSize: 'A4', // Optional: Set the page size to A4
									exportOptions: {
										columns: ':visible' // Export only visible columns
									},
									customize: function (doc) {
										doc['footer'] = (function (currentPage, pageCount) {
											return {
												columns: [
													{
														alignment: 'center',
														text: [
															'Seite ',
															{ text: currentPage.toString(), italics: true },
															' von ',
															{ text: pageCount.toString(), italics: true }
														]
													}
												],
												margin: [0, 0]
											};
										});
									}
								}
							]
						});
			
						$('.currnetmonth').each(function () {
							$(this).html(month);
						});
						$('.lastmonth').each(function () {
							$(this).html('0' + (month - 1));
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
			
					// Sort companies and newsletters within each group
					for (let key in groupedData) {
						groupedData[key].sort((a, b) => {
							let nameA = a.company_name.split(" ");
							let nameB = b.company_name.split(" ");
							let firstWordA = nameA[0];
							let firstWordB = nameB[0];
			
							if (firstWordA === firstWordB) {
								let secondWordA = nameA[1] ? nameA[1] : "";
								let secondWordB = nameB[1] ? nameB[1] : "";
								if (secondWordA === secondWordB) {
									let newsletterA = a.newsletter_name.split(" ");
									let newsletterB = b.newsletter_name.split(" ");
									let newsletterFirstWordA = newsletterA[0];
									let newsletterFirstWordB = newsletterB[0];
			
									if (newsletterFirstWordA === newsletterFirstWordB) {
										let newsletterSecondWordA = newsletterA[1] ? newsletterA[1] : "";
										let newsletterSecondWordB = newsletterB[1] ? newsletterB[1] : "";
										return newsletterSecondWordA.localeCompare(newsletterSecondWordB);
									}
									return newsletterFirstWordA.localeCompare(newsletterFirstWordB);
								}
								return secondWordA.localeCompare(secondWordB);
							}
							return firstWordA.localeCompare(firstWordB);
						});
					}
			
					// Concatenate groups into the final sorted array
					let sortedData = [];
					for (let key in groupedData) {
						sortedData = sortedData.concat(groupedData[key]);
					}
			
					// Convert month and year to MM/YYYY string format
					sortedData.forEach(item => {
						item.month_year_string = `${String(item.month).padStart(2, '0')}/${item.year}`;
					});
			
					// Get unique dates for the filter dropdown
					let uniqueDates = [...new Set(sortedData.map(item => item.month_year_string))];
			
					// Populate the filter dropdown
					let filterDateDropdown = $('#filterDate');
					uniqueDates.forEach(date => {
						filterDateDropdown.append(new Option(date, date));
					});
			
					// Initialize DataTable with sorted data
					console.log('kosta');
					var table = $('#dataTable').DataTable({
						data: sortedData,
						columns: [
							{ data: "company_name" },
							{ data: "newsletter_name" },
							{
								data: "month_year_string",
								render: function (data, type, row) {
									if (type == 'display') {
										return data;
									}
									return data;
								}
							},
							{
								data: "newsletters_number_per_month",
								render: function (data, type, row) {
									if (type == 'display') {
										return parseFloat(data).toLocaleString('de-DE');
									}
									return data;
								}
							},
							{
								data: "average_newsletters_per_mailing",
								render: function (data, type, row) {
									if (type == 'display') {
										let roundedNumber = Math.ceil(parseFloat(data));
										let formattedNumber = roundedNumber.toLocaleString('de-DE');
										return formattedNumber;
									}
									return data;
								}
							},
							{
								data: "average_openings_per_newsletter",
								render: function (data, type, row) {
									if (type == 'display') {
										let roundedNumber = Math.ceil(parseFloat(data));
										let formattedNumber = roundedNumber.toLocaleString('de-DE');
										return formattedNumber;
									}
									return data;
								}
							},
							{
								data: "newsletter_relative_opening_rate",
								render: function (data, type, row) {
									if (type == 'display') {
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
							{
								extend: 'excelHtml5',
								text: 'Export to Excel',
								customize: function (xlsx) {
									var sheet = xlsx.xl.worksheets['sheet1.xml'];
					
									// Define which columns to adjust (D, E, F => 3, 4, 5 in 0-based index)
									var columnsToAdjust = [3, 4, 5];
					
									// Loop through each row in the sheet
									$('row', sheet).each(function () {
										var cells = $(this).find('c');
					
										// Loop through each cell in the row
										cells.each(function (index) {
											if (columnsToAdjust.includes(index)) {
												$(this).find('v').text($(this).find('v').text().replace(/\./g, ''));
											}
										});
									});
								},
								exportOptions: {
									columns: [0, 1, 2, 3, 4, 5, 6] // Specify all columns for export
								}
							},
							{
								extend: 'pdfHtml5',
								orientation: 'landscape',
								pageSize: 'A4',
								exportOptions: {
									columns: ':visible'
								},
								customize: function (doc) {
									// Center-align the fourth column
									var body = doc.content[1].table.body;
									body.forEach(function (row, rowIndex) {
										if (rowIndex > 0) { // Skip the header row
											row[3].alignment = 'center'; // 3rd column index is 2 (0-based)
											row[4].alignment = 'center'; // 3rd column index is 2 (0-based)
											row[5].alignment = 'center'; // 3rd column index is 2 (0-based)
											row[6].alignment = 'center'; // 3rd column index is 2 (0-based)
										}
									});
									doc['footer'] = (function (currentPage, pageCount) {
										return {
											columns: [
												{
													alignment: 'center',
													text: [
														'Seite ',
														{ text: currentPage.toString(), italics: true },
														' von ',
														{ text: pageCount.toString(), italics: true }
													]
												}
											],
											margin: [0, 0]
										};
									});
								}
							}
						]
					});
			
					// Apply the filter when the dropdown value changes
					$('#filterDate').on('change', function () {
						var selectedDate = $(this).val();
						if (selectedDate) {
							table.column(2).search(selectedDate).draw();
						} else {
							table.column(2).search('').draw();
						}
					});
				},
				error: function (xhr, status, error) {
					console.error("Network response was not ok:", error);
				},
				complete: function () {
					// This code runs regardless of success or error
				},
			});			
		} else if (platform_input == 'testValue') {
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
							{ data: "davon_at" },
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
						order: [[11, 'asc']],
						paging: false, // Disable pagination
						dom: 'Bfrtip', // Add this to include buttons
						buttons: [
							{
								extend: 'excelHtml5',
								text: 'Export to Excel',
								customize: function (xlsx) {
									var sheet = xlsx.xl.worksheets['sheet1.xml'];
					
									// Define which columns to adjust (D, E, F => 3, 4, 5 in 0-based index)
									var columnsToAdjust = [3, 4, 6, 7, 8];
					
									// Loop through each row in the sheet
									$('row', sheet).each(function () {
										var cells = $(this).find('c');
					
										// Loop through each cell in the row
										cells.each(function (index) {
											if (columnsToAdjust.includes(index)) {
												// console.log(index);
												$(this).find('v').text($(this).find('v').text().replace(/[,.]/g, ''));
												$(this).find('t').text($(this).find('t').text().replace(/[,.]/g, ''));
												$(this).attr('s', '52'); // Assuming '52' is the right alignment style index

											}
										});
									});
								},
								exportOptions: {
									columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] // Specify all columns for export
								}
							},
							{
								extend: 'pdfHtml5',
								orientation: 'landscape', // Export the PDF in landscape mode
								pageSize: 'A4', // Optional: Set the page size to A4
								exportOptions: {
									columns: ':visible' // Export only visible columns
								},
								customize: function (doc) {
									doc['footer'] = (function (currentPage, pageCount) {
										return {
											columns: [
												{
													alignment: 'center',
													text: [
														'Seite ',
														{ text: currentPage.toString(), italics: true },
														' von ',
														{ text: pageCount.toString(), italics: true }
													]
												}
											],
											margin: [0, 0]
										};
									});
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
		}
	});
})(jQuery);
