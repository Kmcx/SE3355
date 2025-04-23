const weatherAPI = "https://run.mocky.io/v3/9e7ce6a8-7e6f-4472-b516-919128b37d59";
const newsAPI = "https://run.mocky.io/v3/a3eb932f-2764-4f55-b041-95861e0a023b";
const currencyAPI = "https://run.mocky.io/v3/f256148d-9968-4d8f-b763-49d25d687b93";

function closeAd(id) {
  document.getElementById(id).style.display = "none";
}

let currentSlide = 0;
let totalSlides = 0;

function moveSlide(direction) {
  currentSlide += direction;
  if (currentSlide < 0) currentSlide = totalSlides - 1;
  if (currentSlide >= totalSlides) currentSlide = 0;
  updateSlider();
}

function updateSlider() {
  const wrapper = document.getElementById("sliderWrapper");
  wrapper.style.transform = `translateX(-${currentSlide * 100}%)`;

  
  const allDots = document.querySelectorAll(".slider-dots .dot");
  allDots.forEach((dot, idx) => {
    dot.classList.toggle("active", idx === currentSlide);
  });
}

setInterval(() => moveSlide(1), 5000);

fetch(newsAPI)
  .then(res => res.json())
  .then(data => {
    const wrapper = document.getElementById("sliderWrapper");
    wrapper.innerHTML = "";
    totalSlides = data.length;

    data.forEach((item, index) => {
      const div = document.createElement("div");
      div.classList.add("slide");

      const title = item?.title || "Başlık yok";
      const summary = item?.summary || "Özet yok";
      const image = item.image && item.image.startsWith("http") ? item.image : "https://via.placeholder.com/600x300?text=Resim+Yok";

      div.innerHTML = `
        <div class="slide-container">
          <img class="slide-image" src="${image}" alt="${title}" onerror="this.src='https://via.placeholder.com/600x300?text=Yok';">
          <div class="slide-overlay">
            <h3>${title}</h3>
            <p>${summary}</p>
          </div>
        </div>
      `;

      wrapper.appendChild(div);
    });


    const dotContainer = document.getElementById("sliderDots");
    dotContainer.innerHTML = "";

    data.forEach((_, index) => {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      if (index === 0) dot.classList.add("active");
      dot.addEventListener("click", () => {
        currentSlide = index;
        updateSlider();
      });
      dotContainer.appendChild(dot);
    });

    updateSlider();
  });

  fetch(currencyAPI)
  .then(res => res.json())
  .then(data => {
    const bar = document.getElementById("currencyBar");
    if (!bar) return;
    bar.innerHTML = "";

    data.forEach(item => {
      const span = document.createElement("span");
      span.innerHTML = `${item.name} ${item.value} <span class="${item.direction}">${item.change}</span>`;
      bar.appendChild(span);
    });
  });

  fetch(weatherAPI)
  .then(res => res.json())
  .then(data => {
    const weatherDays = document.getElementById("weatherDays");
    weatherDays.innerHTML = "";

    data.forEach(day => {
      const div = document.createElement("div");
      div.innerHTML = `
        <strong>${day?.day || "-"}</strong><br>
        ${day?.temp ?? "?"}°C<br>
        <small>${day?.condition || ""}</small>
      `;
      weatherDays.appendChild(div);
    });
  });

fetch(financeAPI)
  .then(res => res.json())
  .then(data => {
    const submenu = document.getElementById("finance-submenu");
    data.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      submenu.appendChild(li);
    });
  });
