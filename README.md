# MMM-CaravanPiGasWeight - a MagicMirror<sup>2</sup> Module

This [MagicMirror<sup>2</sup>](https://github.com/MichMich/MagicMirror/) module is used in the [CaravanPi](https://github.com/spitzlbergerj/CaravanPi) project to display data of a HX711 weight sensor. CaravanPi is a project based on a Raspberry Pi for a smart caravan.

In the CaravanPi project Magic Mirror is used as a display module. The screen is usually not mounted behind a mirror, but can also be used as a TV in the caravan. For the Caravan Pi project there are further modules for Magic Mirror:

[MMM-CaravanPiPosition - Module for displaying level information](https://github.com/spitzlbergerj/MMM-CaravanPiPosition)
[MMM-CaravanPiGasWeight - Module for indicating the filling of a gas bottle via a scale](https://github.com/spitzlbergerj/MMM-CaravanPiGasWeight)
[MMM-CaravanPiTemperature - Module for displaying temperature values e.g. in the refrigerator](https://github.com/spitzlbergerj/MMM-CaravanPiTemperature)
[MMM-CaravanPiClimate - Module for displaying climate values](https://github.com/spitzlbergerj/MMM-CaravanPiClimate)

## Screendumps
modus: Boxlines

<img src="https://raw.githubusercontent.com/spitzlbergerj/MMM-CaravanPiGasWeight/master/img/MMM-CaravanPiGasWeight-Screendump-Boxlines.jpg">

## Installation
In your terminal, go to your MagicMirror's Module folder:
````
cd ~/MagicMirror/modules
````

Clone this repository:
````
git clone https://github.com/spitzlbergerj/MMM-CaravanPiGasWeight
````

install the node dependencies:
````
cd MMM-CaravanPiGasWeight/ && npm install
````

## Using the module

To use this module, add it to the modules array in the `config/config.js` file:
````javascript
modules: [
{
	module: 'MMM-CaravanPiGasWeight',
	header: 'Füllstand Gasflasche',
	position: 'top_left', // This can be any of the regions.
	config: {
        	valueDir: "/home/pi/CaravanPi/values",
        	updateInterval: 100000, // milliseconds
        	weightUnit: " Gramm",
        	weightPrecision: 2,
            levelUnit: " %",
        	levelPrecision: 2,
        	showDate: true,
        	sensors: [
            	{
                	name: "Alu 6 kg",
                	file: "gasScale",
            	},
        	],
        	localeStr: 'de-DE',
        	style: "lines",
    	}
},

]
````

## Configuration options

The following properties can be configured:

<table width="100%">
	<thead>
		<tr>
			<th>Option</th>
			<th width="100%">Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>valueDir</code></td>
			<td><b>Optional</b></code> - The directory in which the values read by the sensors are stored.
				<br/>If not set, the default is: <code>/home/pi/CaravanPi/values</code></td>
		</tr>
		<tr>
			<td><code>updateInterval</code></td>
			<td><b>Optional</b></code> - The update interval in milliseconds.<br/>
				If not set, the default is: <code>300000</code> (5 minutes)</td>
		</tr>
		<tr>
			<td><code>weightUnit</code></td>
			<td><b>Optional</b></code> - Unit in which the weight are indicated. Default is <code>Gramm</code></td>
		</tr>
        <tr>
			<td><code>weightPrecision</code></td>
			<td><b>Optional</b></code> - Decimal places for weight values. Default is <code>2</code></td>
		</tr>
		<tr>
			<td><code>levelUnit</code></td>
			<td><b>Optional</b></code> - Unit in which the filling level are indicated. Default is <code>%</code></td>
		</tr>
        <tr>
			<td><code>levelPrecision</code></td>
			<td><b>Optional</b></code> - Decimal places for filling level values. Default is <code>2</code></td>
		</tr>
        <tr>
			<td><code>showDate</code></td>
			<td><b>Optional</b></code> - Decides whether the date/time at which the values were determined is displayed. Possible values: <code>true</code> or <code>false</code> Default is <code>true</code></td>
		</tr>
		<tr>
			<td><code>localeStr</code></td>
			<td><b>Optional</b></code> - String for country-specific formatting of numbers. Possible values: see <a href="https://tools.ietf.org/html/rfc5646">Tags for Identifying Languages</a> Default is <code>'de-DE'</code></td>
		</tr>
		<tr>
			<td><code>style</code></td>
			<td><b>Optional</b></code> - Decides in which style the values are displayed. Possible values: <code>lines</code>, <code>boxes</code> or <code>boxlines</code>Default is <code>'lines'</code></td>
		</tr>
		<tr>
			<td><code>sensors</code></td>
			<td><b>Required</b> - Add all your sensors that should appear in the MagicMirror. Each sensor must include the following properties:
				<table width="100%">
					<thead>
						<tr>
							<th>Option</th>
							<th width="100%">Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>name</code></td>
							<td>Name that is to be displayed for this sensor.</td>
						</tr>
						<tr>
							<td><code>file</code></td>
							<td>File name from which the values are to be read</td>
						</tr>
						</tbody>
				</table>
			</td>
		</tr>
	</tbody>
</table>
