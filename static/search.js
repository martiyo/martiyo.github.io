document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.querySelector("input[type='text']");
  const resultsContainer = document.createElement("div");
  searchInput.parentNode.appendChild(resultsContainer);

  fetch("archive.html")
    .then((response) => response.text())
    .then((html) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      // Seleccionar fechas y títulos
      const postDates = [...doc.querySelectorAll(".post-date")];
      const postTitles = [...doc.querySelectorAll(".post-title a")];

      searchInput.addEventListener("input", function () {
        const query = this.value.toLowerCase().trim();
        resultsContainer.innerHTML = "";

        if (query === "") {
          // Mostrar un mensaje cuando no hay búsqueda activa
          resultsContainer.innerHTML = "<div class='no-results'></div>";
          return;
        }
        let resultsFound = false;

        postTitles.forEach((postTitle, index) => {
          const titleText = postTitle.textContent.toLowerCase();
          if (titleText.includes(query)) {
            resultsFound = true;
            const postDate =
              postDates[index]?.textContent || "Fecha desconocida";

            // Crear el resultado para cada coincidencia
            const result = document.createElement("div");
            result.innerHTML = `
              <div class="search-result">
                   <div class="result-date">${postDate}</div>
                   <div class="result-title">
                          <a href="${postTitle.href}">${postTitle.textContent}</a>
                   </div>
              </div>
                        `;
            resultsContainer.appendChild(result);
          }
        });
        if (!resultsFound) {
          // Mostrar mensaje si no hay coincidencias
          resultsContainer.innerHTML =
            "<div class='no-results'>No se encontraron resultados</div>";
        }
      });
    })
    .catch((err) => console.error("Error fetching archive.html:", err));
});
