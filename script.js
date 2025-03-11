document.addEventListener("DOMContentLoaded", () => {
    const countriesContainer = document.getElementById("countries-container");
    const searchInput = document.getElementById("search");
    const filterSelect = document.getElementById("filter");

    async function fetchCountries() {
        try {
            const response = await fetch("https://restcountries.com/v3.1/all");
            const countries = await response.json();
            displayCountries(countries);
        } catch (error) {
            console.error("Error fetching country data:", error);
        }
    }

    function displayCountries(countries) {
        countriesContainer.innerHTML = "";
        countries.forEach(country => {
            const countryCard = document.createElement("div");
            countryCard.classList.add("country-card");
            countryCard.innerHTML = `
                <img src="${country.flags.svg}" alt="Flag of ${country.name.common}">
                <h2>${country.name.common}</h2>
                <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                <p><strong>Region:</strong> ${country.region}</p>
                <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : "N/A"}</p>
            `;
            countriesContainer.appendChild(countryCard);
        });
    }

    function filterCountries() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedRegion = filterSelect.value;
        
        fetch("https://restcountries.com/v3.1/all")
            .then(response => response.json())
            .then(countries => {
                let filteredCountries = countries.filter(country =>
                    country.name.common.toLowerCase().includes(searchTerm)
                );
                
                if (selectedRegion) {
                    filteredCountries = filteredCountries.filter(country => country.region === selectedRegion);
                }
                
                displayCountries(filteredCountries);
            })
            .catch(error => console.error("Error filtering countries:", error));
    }

    searchInput.addEventListener("input", filterCountries);
    filterSelect.addEventListener("change", filterCountries);
    
    fetchCountries();
});
