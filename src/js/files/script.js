// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";

const blogItems = document.querySelector(".blog__items");

if (blogItems) {
  loadBlogItems();
}

async function loadBlogItems() {
  const response = await fetch("files/blog.json", {
    method: "GET",
  });
  if (response.ok) {
    const responseResult = await response.json();
    initBlog(responseResult);
  } else {
    alert("Error!");
  }
}

function initBlog(data) {
  for (let index = 0; index < 3; index += 1) {
    const item = data.items[index];
    buildblogItem(item);
  }
}

function buildblogItem(item) {
  let blogItemTemplate = ``;

  blogItemTemplate += `<article class="blog__item item-blog">`;

  item.image
    ? (blogItemTemplate += `<a href="#" class="item-blog__image">
  <img src="${item.img}" alt="Image" class="ibg">
</a>`)
    : null;

  blogItemTemplate += `</article>`;

  blogItemTemplate = `
    
    <div class="item-blog__date">${item.date}</div>
    <h4 class="item-blog__title">
      <a href="#" class="item-blog__link-title"
        >${item.title}</a
      >
    </h4>
    <div class="item-blog__text text">
    ${item.text}
    </div>
    <div class="item-blog__tags">
      <a href="#" class="item-blog__tag">Plumbing</a>
      <a href="#" class="item-blog__tag">Architecture</a>
      <a href="#" class="item-blog__tag">Maintenance</a>
    </div>`;
}
