<?php

/**
 * Provide a public-facing view for the plugin
 *
 * This file is used to markup the public-facing aspects of the plugin.
 *
 * @link       https://github.com/KostaBinov27
 * @since      1.0.0
 *
 * @package    Oeak_Dashbaord_Api
 * @subpackage Oeak_Dashbaord_Api/public/partials
 */

 if ($atts['platform'] == 'podcast') {
    if ($atts['month']){
        // Get the current year, month, and day
        $currentYear = date('Y');
        $currentMonth = date('m');
        $currentDay = date('d');

        // Start year and month
        $startYear = 2024;
        $startMonth = 1;

        // Check if the current day is less than 10
        $showCurrentMonth = $currentDay >= 10;

        echo '<div class="wpDataTableFilterSection custom" id="table_1_1_filter_sections" style="min-height: auto;">';
        echo '<label>Periode Auswählen:</label>';
        echo '<select name="yearsselect2" id="yearsselect2">';

        // Get the starting month and year from $atts
        $startYear = $atts['year'];
        $startMonth = $atts['month'];

        // Loop through each year and month from the starting date to January 2024
        for ($year = $startYear; $year >= $startYear && $year >= $startYear; $year--) {
            // Set the starting month for the loop
            $startLoopMonth = ($year == $startYear ? $startMonth : 12);

            for ($month = $startLoopMonth; $month >= 1; $month--) {
                // If the month is zero, skip to the next iteration
                if ($month == 0) continue;
                
                // Format the month to have a leading zero
                $formattedMonth = str_pad($month, 2, '0', STR_PAD_LEFT);
                // Create the option value
                $optionValue = $formattedMonth . '/' . $year;
                echo '<option value="' . $optionValue . '">' . $optionValue . '</option>';
            }
        }

        echo '</select>';
        echo '</div>';
    }
}
?>
<!-- This file should primarily consist of HTML with a little bit of PHP. -->
<input hidden id="month" value="<?php echo $atts['month']; ?>">
<input hidden id="year" value="<?php echo $atts['year']; ?>">
<input hidden id="platform" value="<?php echo $atts['platform']; ?>">

<?php if ($atts['platform'] == 'podcast') { ?>
    <style>
        @media only screen and (min-width: 1240px) {
            .section_wrapper {
                max-width: 1450px !important;
            }
        }
    </style>
    <table id="dataTable" class="dataTableClass display" style="width:100%">
        <thead>
            <tr>
                <th>Logo</th>
                <th>Podcast Name</th>
                <th>Publisher/Marke</th>
                <th>Kategorie</th>
                <th>Valide Downloads <span class="currnetmonth"><?php echo $atts['month']; ?></span>/<span class="currnetyear"><?php echo $atts['year']; ?></span></th>
                <th>Valide Downloads <span class="lastmonth"><?php echo $atts['month'] - 1; ?></span>/<span class="currnetyearlastmonth"><?php echo $atts['year']; ?></span></th>
                <th>Veränderung in % zum Vormonat</th>
                <th>Aktive Episoden <span class="currnetmonth"><?php echo $atts['month']; ?></span>/<span class="currnetyear"><?php echo $atts['year']; ?></span></th>
                <th>Aktive Episoden <span class="lastmonth"><?php echo $atts['month'] - 1; ?></span>/<span class="currnetyearlastmonth"><?php echo $atts['year']; ?></span></th>
                <th>Veröffentlichte Episoden <span class="currnetmonth"><?php echo $atts['month']; ?></span>/<span class="currnetyear"><?php echo $atts['year']; ?></span></th>
                <th>Rang</th>
            </tr>
        </thead>
    </table>
<?php } else if ($atts['platform'] == 'newsletter') { ?>
    <select id="filterDate" style="margin-bottom: 10px;">
        <option value="">Select Date</option>
    </select>
    <table id="dataTable" class="dataTableClass display" style="width:100%">
        <thead>
            <tr>
                <th>Publisher</th>
                <th>Name des Newsletters</th>
                <th>Datum</th>
                <th style="width: 5%;">Anzahl Newsletter</th>
                <th>ø Versand pro Mailing</th>
                <th>ø Öffnungen absolut</th>
                <th>% Öffnungsrate</th>
            </tr>
        </thead>
    </table>
<?php } else if ($atts['platform'] == 'testValue') { ?>
    <style>
        @media only screen and (min-width: 1240px) {
            .section_wrapper {
                max-width: 1450px !important;
            }
        }
    </style>
    <table id="dataTable" class="dataTableClass display" style="width:100%">
        <thead>
            <tr>
                <th>Logo</th>
                <th>Podcast Name</th>
                <th>Publisher/Marke</th>
                <th>Kategorie</th>
                <th>Valide Downloads <span class="currnetmonth"><?php echo $atts['month']; ?></span>/<span class="currnetyear"><?php echo $atts['year']; ?></span></th>
                <th>Valide Downloads <span class="lastmonth"><?php echo $atts['month'] - 1; ?></span>/<span class="currnetyearlastmonth"><?php echo $atts['year']; ?></span></th>
                <th>davon AT Anteil <span class="currnetmonth"><?php echo $atts['month']; ?></span>/<span class="currnetyear"><?php echo $atts['year']; ?></span></th>
                <th>Veränderung in % zum Vormonat</th>
                <th>Aktive Episoden <span class="currnetmonth"><?php echo $atts['month']; ?></span>/<span class="currnetyear"><?php echo $atts['year']; ?></span></th>
                <th>Aktive Episoden <span class="lastmonth"><?php echo $atts['month'] - 1; ?></span>/<span class="currnetyearlastmonth"><?php echo $atts['year']; ?></span></th>
                <th>Veröffentlichte Episoden <span class="currnetmonth"><?php echo $atts['month']; ?></span>/<span class="currnetyear"><?php echo $atts['year']; ?></span></th>
                <th>Rang</th>
            </tr>
        </thead>
    </table>
<?php } ?>