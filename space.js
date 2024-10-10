document.getElementById('btnBuscar').addEventListener('click', function() {
    const elemento = document.getElementById('inputBuscar').value;
    if (elemento) {
        searchImages(elemento);
        document.getElementById('inputBuscar').value = '';
    }
});

function searchImages (elemento) {
    const url = `https://images-api.nasa.gov/search?q=${elemento}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const items = data.collection.items;
            displayImages(items);
        })
        .catch(error =>console.error("Error fetching data:", error));
}

function displayImages (items) {
    const contenedor = document.getElementById('contenedor');
    contenedor.innerHTML = ' ';

    items.forEach(item => {
        const imgSrc = item.links ? item.links[0].href : 'https://via.placeholder.com/150';
        const title = item.data[0].title;
        const description = item.data[0].description;
        const date = item.data[0].date_created;
    
        const card = ` 
        <div class="col-md-4 mb-4">
          <div class="card shadow-sm">
            <img src="${imgSrc}" class="card-img-top" style="height:200px; object-fit: cover;" alt="${title}">
            <div class="card-body">
              <h5 class="card-title">${title}</h5>
              <p class="card-text">${description}</p>
              <p class="card-text"><small class="text-muted">Fecha: ${date}</small></p>
            </div>
          </div>
        </div>
      `;

      contenedor.innerHTML += card; // agrego la tarjeta al contenedor
    });
}