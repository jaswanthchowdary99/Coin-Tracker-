// script.js

const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';
const tableBody = document.querySelector('.table-body');
const searchBar = document.getElementById('search-bar');
const sortByMarketCapBtn = document.querySelectorAll('#btn')[0];
const sortByPercentageBtn = document.querySelectorAll('#btn')[1];

let coinData = [];

function renderTable(data) {
    tableBody.innerHTML = '';
    data.forEach(items => {
        let price_change_24h = parseFloat(items.price_change_24h).toFixed(2);
        const row = document.createElement('tr');
        row.innerHTML =  `
        <td>
            <div class="coin-img">
                <img src="${items.image}" alt="" style="width: 45px; height: 45px" />
                <div class="coin-name">${items.name}</div>
            </div>
        </td>
        <td>${items.symbol.toUpperCase()}</td>
        <td>${items.current_price}</td>
        <td>${items.total_volume}</td>
        <td class="percentage_change">${price_change_24h}%</td>
        <td>Mkr Cap: ${items.market_cap}</td>
    `;
        tableBody.appendChild(row);

        const dataPercentage = row.querySelector('.percentage_change');
        if (items.price_change_24h < 0) {
            dataPercentage.style.color = "red";
        } else {
            dataPercentage.style.color = "green";
        }
    });
}

// Fetch data using .then
function fetchDataWithThen() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            coinData = data;
            renderTable(coinData);
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Fetch data using async/await
async function fetchDataWithAsync() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        coinData = data;
        renderTable(coinData);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Search functionality
function searchFunction(){
    const query = searchBar.value.toLowerCase();
    const filteredData = coinData.filter(coin =>
        coin.name.toLowerCase().includes(query) || coin.symbol.toLowerCase().includes(query)
    );
    renderTable(filteredData);
}

// Sort by market cap
function marketcapChange(){
    const sortedData = [...coinData].sort((a, b) => b.market_cap - a.market_cap);
    renderTable(sortedData);
}

// Sort by percentage change
function percentageChange(){
    const sortedData = [...coinData].sort((a, b) => b.price_change_24h - a.price_change_24h);
    renderTable(sortedData);
}

fetchDataWithThen(); 
// fetchDataWithAsync();