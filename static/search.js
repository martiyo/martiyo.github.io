document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector("input[placeholder='Search...']");
  const resultsDiv = document.createElement("div");
  searchInput.parentNode.appendChild(resultsDiv);

  // Cargar el archivo archive.html
  fetch("archive.html")
    .then((response) => response.text())
    .then((html) => {
      // Crear un DOM para analizar el contenido de archive.html
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const postDates = Array.from(doc.querySelectorAll(".post-date"));
      const postTitles = Array.from(doc.querySelectorAll(".post-title a"));

      // Agregar evento al campo de búsqueda
      searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        resultsDiv.innerHTML = ""; // Limpiar resultados previos

        if (query.length > 2) {
          // Filtrar resultados
          const results = postTitles.filter((title, index) => {
            const date = postDates[index].textContent.toLowerCase();
            return (
              title.textContent.toLowerCase().includes(query) ||
              date.includes(query)
            );
          });

          // Mostrar resultados
          results.forEach((result, index) => {
            const date = postDates[index].textContent;
            const resultItem = document.createElement("div");
            resultItem.innerHTML = `
              <div class="search-result">
                <div class="search-date">${date}</div>
                <div class="search-title"><a href="${result.href}">${result.textContent}</a></div>
              </div>`;
            resultsDiv.appendChild(resultItem);
          });
        }
      });
    })
    .catch((error) => console.error("Error loading archive:", error));
});
