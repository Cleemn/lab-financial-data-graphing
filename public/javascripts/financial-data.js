const apiUrl = 'http://api.coindesk.com/v1/bpi/historical/close.json';
// ?start=<VALUE>&end=<VALUE></VALUE>

const printTheChart = stockData => {
    const dailyData = stockData.bpi;
    const stockDates = Object.keys(dailyData);
    const stockValues = Object.values(dailyData);
    
    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: stockDates,
            datasets: [{
                label: 'Data',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: stockValues
            }]
        },

        // Configuration options go here
        options: {}
    });
};

const dateUpdate = () => {
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;

    const newUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`;
    axios
        .get(newUrl)
        .then(response => {
            console.log(response.data);
            printTheChart(response.data);
        })
        .catch(err => {
            console.log('Error while getting the data', err);
        })
}

document.querySelector('#start-date').addEventListener('change', dateUpdate);
document.querySelector('#end-date').addEventListener('change', dateUpdate);