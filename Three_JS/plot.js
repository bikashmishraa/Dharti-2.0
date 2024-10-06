import wixData from 'wix-data';
import { fetch } from 'wix-fetch';

// Fetch the CSV data
fetch("https://raw.githubusercontent.com/bikashmishraa/Dharti-2.0/refs/heads/master/src/assets/recentClApp.csv")
    .then(response => response.text())
    .then(data => {
        const rows = data.split('\n').map(row => row.split(','));
        const headers = rows[0];
        const csvData = rows.slice(1).map(row => {
            return headers.reduce((obj, header, index) => {
                obj[header.trim()] = row[index].trim();
                return obj;
            }, {});
        });

        // Sort data by 'Close approach date in UTC'
        csvData.sort((a, b) => new Date(a['Close approach date in UTC']) - new Date(b['Close approach date in UTC']));

        // Prepare data for Plotly
        const objectDesignations = csvData.map(obj => obj['Object designation']);
        const missDistances = csvData.map(obj => parseFloat(obj['Miss distance in km']));
        const relativeVelocities = csvData.map(obj => parseFloat(obj['Relative\nvelocity in km/s']));
        const diameters = csvData.map(obj => parseFloat(obj['Diameter in m']));
        const closeApproachDates = csvData.map(obj => obj['Close approach date in UTC']);

        // Create the Plotly line plot
        const trace1 = {
            x: objectDesignations,
            y: missDistances,
            type: 'scatter',
            mode: 'lines+markers',
            name: 'Miss Distance in km',
            text: closeApproachDates.map(date => `Date: ${date}`),
            hoverinfo: 'text+y',
        };

        const data = [trace1];

        const layout = {
            title: 'Line Plot of Object vs Miss Distance and Relative Velocity',
            xaxis: {
                title: 'Object Designation',
                tickangle: 45
            },
            yaxis: {
                title: 'Values',
            }
        };

        Plotly.newPlot('myDiv', data, layout);
    })
    .catch(error => console.error(error));
