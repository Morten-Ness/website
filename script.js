// Load the CSV file and parse it using PapaParse
Papa.parse("data.csv", {
    download: true,
    header: true,  // Treat the first row as headers
    complete: function(results) {
        // Call the function to create the chart after data is loaded
        createChart(results.data);
    }
});

