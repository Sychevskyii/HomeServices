// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";

const blogItems = document.querySelector(".blog__items");
let data;
let startItem = 0;
let endItem = 3;

if (blogItems) {
  loadBlogItems();
}

async function loadBlogItems() {
  const response = await fetch("files/blog.json", {
    method: "GET",
  });
  if (response.ok) {
    const responseResult = await response.json();
    data = responseResult;
    initBlog(data, startItem, endItem);
  } else {
    alert("Error!");
  }
}

function initBlog(data, startItem, endItem) {
  const dataPart = data.items.slice(startItem, endItem);

  dataPart.forEach((item) => {
    buildblogItem(item);
  });
  hideViewMore();
}

function buildblogItem(item) {
  let blogItemTemplate = ``;

  blogItemTemplate += `<article data-id="${item.id}" class="blog__item item-blog">`;

  item.img
    ? (blogItemTemplate += `<a href="${item.url}" class="item-blog__image">
  <img src="${item.img}" alt="Image" class="ibg">
</a>`)
    : null;

  blogItemTemplate += `<div class="item-blog__date">${item.date}</div>`;

  blogItemTemplate += `<h4 class="item-blog__title">
    <a href="${item.url}" class="item-blog__link-title"
      >${item.title}</a
    >
  </h4>`;

  item.text
    ? (blogItemTemplate += `<div class="item-blog__text text">
  ${item.text}
  </div>`)
    : null;

  if (item.tags) {
    blogItemTemplate += `<div class="item-blog__tags">`;

    for (const tag in item.tags) {
      blogItemTemplate += `<a href="${item.tags[tag]}" class="item-blog__tag">${tag}</a>`;
    }

    blogItemTemplate += `</div>`;
  }

  blogItemTemplate += `</article>`;

  blogItems.insertAdjacentHTML("beforeend", blogItemTemplate);
}

document.addEventListener("click", onShowAllCards);

function hideViewMore() {
  const dataItemsLength = data.items.length;
  const currentItems = document.querySelectorAll(".item-blog").length;
  const viewMore = document.querySelector(".blog__view-more");
  currentItems < dataItemsLength
    ? (viewMore.hidden = false)
    : (viewMore.hidden = true);
}

function onShowAllCards(e) {
  const targetElement = e.target;

  startItem = document.querySelectorAll(".item-blog").length;
  endItem = startItem + 3;

  if (targetElement.closest(".blog__view-more")) {
    initBlog(data, startItem, endItem);
    e.preventDefault();
  }
}
