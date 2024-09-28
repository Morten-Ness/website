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
    const labels = data.map(row => row.Month);  // Use the 'Month' column as labels
    const salesData = data.map(row => parseInt(row.Sales));  // Use the 'Sales' column as data

    // Get the canvas element
    const ctx = document.getElementById('myChart').getContext('2d');

    // Create a new chart
    const myChart = new Chart(ctx, {
        type: 'bar',  // Change to 'line' or any other chart type if needed
        data: {
            labels: labels,  // x-axis labels
            datasets: [{
                label: 'Sales Data',
                data: salesData,  // y-axis data points
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
