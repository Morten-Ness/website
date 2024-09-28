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
    // Extract labels and data points from the CSV, ensuring both arrays have the same length
    const labels = data.map(row => row.Month).filter(label => label);  // Filter out any undefined labels
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
            labels: labels,  // x-axis labels
            datasets: [{
                data: salesData,  // y-axis data points
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                legend: {
                  display: false
                        }
                    },
            scales: {
                x: {
                    beginAtZero: true
                },
                y: {
                    min: 0,  // Set the minimum value
                    max: 100,  // Set the maximum value
                    beginAtZero: true
                }
            }
        }
    });
}
