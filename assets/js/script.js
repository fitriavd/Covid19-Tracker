// Ini adalah API KEY saya
const apiKey = '0b7811941cmshd3750d66c90468ap1ce889jsn7befddc848e9';

// Fungsi untuk mengisi data "Last Updated"
function updateLastUpdated(lastUpdate) {
  const lastUpdateDateElement = document.getElementById('lastUpdateDate');
  lastUpdateDateElement.textContent = lastUpdate;
}

// Fungsi untuk menampilkan error message dalam bentuk popup
function showErrorPopup(message) {
  const errorPopup = document.getElementById('errorPopup');
  const errorMessage = document.getElementById('errorMessage');
  errorPopup.style.display = 'block';
  errorMessage.textContent = message;
}

// Fungsi untuk menyembunyikan popup error message
function hideErrorPopup() {
  const errorPopup = document.getElementById('errorPopup');
  errorPopup.style.display = 'none';
}

// Fungsi untuk mengambil data COVID-19 berdasarkan negara
function fetchData(country) {
  const apiUrl = `https://covid-193.p.rapidapi.com/statistics?country=${country}`;

  fetch(apiUrl, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'covid-193.p.rapidapi.com',
      'X-RapidAPI-Key': apiKey,
    },
  })
    .then(response => response.json())
    .then(data => {
      // Cek apakah data ditemukan
      if (data.response && data.response.length > 0) {
        const statistics = data.response[0];

        // Mengambil elemen-elemen HTML yang akan ditampilkan
        const activeCasesElement = document.getElementById('activeCases');
        const newCasesElement = document.getElementById('newCases');
        const recoveredCasesElement = document.getElementById('recoveredCases');
        const totalCasesElement = document.getElementById('totalCases');
        const totalDeathsElement = document.getElementById('totalDeaths');
        const totalTestsElement = document.getElementById('totalTests');

        // Menampilkan data di halaman HTML atau "-" jika data kosong
        activeCasesElement.textContent = statistics.cases.active || '-';
        newCasesElement.textContent = statistics.cases.new || '-';
        recoveredCasesElement.textContent = statistics.cases.recovered || '-';
        totalCasesElement.textContent = statistics.cases.total || '-';
        totalDeathsElement.textContent = statistics.deaths.total || '-';
        totalTestsElement.textContent = statistics.tests.total || '-';

        // Mengambil data tanggal terbaru
        const lastUpdate = statistics.day;
        updateLastUpdated(lastUpdate);
      } else {
        showErrorPopup('Data tidak ditemukan untuk negara ini. Silakan coba lagi dengan negara lain.');
      }
    })
    .catch(error => {
      console.error('Terjadi kesalahan:', error);
      showErrorPopup('Terjadi kesalahan saat mengambil data. Silakan coba lagi nanti.');
    });
}

// Panggil fungsi fetchData saat melakukan pencarian
const searchForm = document.getElementById('search-bar');
const countryInput = document.getElementById('countryInput');

searchForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const country = countryInput.value;
  fetchData(country);
});

// Menutup popup error message saat tombol "Tutup" diklik
const closeErrorPopupButton = document.getElementById('closeErrorPopup');
closeErrorPopupButton.addEventListener('click', hideErrorPopup);
