document.addEventListener("DOMContentLoaded", () => {
  const carousels = document.querySelectorAll(".carousel-container");

  carousels.forEach((carousel) => {
    const track = carousel.querySelector(".carousel-track");
    const prevButton = carousel.querySelector(".custom-carousel-control.prev");
    const nextButton = carousel.querySelector(".custom-carousel-control.next");

    if (track && prevButton && nextButton) {
      const cardWidth = track.querySelector(".card").offsetWidth + 10;
      const updateButtons = () => {
        const scrollLeft = track.scrollLeft;
        const maxScrollLeft = track.scrollWidth - track.clientWidth;
        prevButton.disabled = scrollLeft <= 0;
        nextButton.disabled = scrollLeft >= maxScrollLeft - 1;
      };

      prevButton.addEventListener("click", () => {
        track.scrollBy({ left: -cardWidth, behavior: "smooth" });
        setTimeout(updateButtons, 400);
      });

      nextButton.addEventListener("click", () => {
        track.scrollBy({ left: cardWidth, behavior: "smooth" });
        setTimeout(updateButtons, 400);
      });

      track.addEventListener("scroll", updateButtons);

      updateButtons();
    }
  });

  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");
  const bookTitles = document.querySelectorAll(".book-title");
  const cards = document.querySelectorAll(".card");

  const scrollToBook = () => {
    const query = searchInput.value.toLowerCase();
    let found = false;

    bookTitles.forEach((title, index) => {
      const bookTitle = title.textContent.toLowerCase();

      if (bookTitle.includes(query) && !found) {
        const card = cards[index];
        card.scrollIntoView({ behavior: "smooth", block: "center" });
        found = true;
      }
    });
  };

  searchButton.addEventListener("click", scrollToBook);

  searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      scrollToBook();
    }
  });
});
