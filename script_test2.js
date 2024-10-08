// Load the CSV file and parse it using PapaParse
Papa.parse("data.csv", {
    download: true,
    header: true,  // Treat the first row as headers
    complete: function(results) {
        // Call the function to create the chart after data is loaded
        createChart(results.data);
    }
});

// Function to create a chart with the parsed CSV data
function createChart(data) {
    // Extract labels and data points from the CSV
    const labels = data.map(row => new Date(row.Month));  // Parse dates using the Date object
    const salesData = data.map(row => parseInt(row.Sales)).filter(value => !isNaN(value));  // Remove invalid numbers

    // Check the length of labels and data
    if (labels.length !== salesData.length) {
        console.error("Labels and data length mismatch. Please check your data source.");
        return;
    }

    // Get the canvas element
    const ctx = document.getElementById('myChart').getContext('2d');

    // Create the chart
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Sales',  // Name of the dataset
                data: salesData,  // y-axis data points
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false  // Hides the legend box
                }
            },
            scales: {
                x: {
                    type: 'time',  // Set x-axis to be a time scale
                    time: {
                        unit: 'month'  // Choose time unit based on data granularity (e.g., 'day', 'month', 'year')
                    },
                    title: {
                        display: true,
                        text: 'Month'
                    }
                },
                y: {
                    min: 0,  // Set the minimum value
                    max: 100,  // Set the maximum value
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Sales'
                    }
                }
            }
        }
    });
}
