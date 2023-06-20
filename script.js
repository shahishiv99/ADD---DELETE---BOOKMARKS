const modal = document.getElementById("modal");
const modalShow = document.getElementById("show-modal");
const modalClose = document.getElementById("close-modal");
const bookmarkForm = document.getElementById("bookmark-form");
const websiteNameEl = document.getElementById("website-name");
const bookmarkContainer = document.getElementById("bookmark-container");
const websiteUrlEl = document.getElementById("website-url");

let toggleModal = false;
let bookmarks = [];

function showAndCloseModal() {
  if (!toggleModal) {
    modal.classList.add("show-modal");
    websiteNameEl.focus();
    toggleModal = true;
  } else {
    modal.classList.remove("show-modal");
    toggleModal = false;
  }
}

function clickOutSidefromModal(e) {
  if (e.target === modal) {
    modal.classList.remove("show-modal");
    toggleModal = false;
  }
}

// Events

modalShow.addEventListener("click", showAndCloseModal);
modalClose.addEventListener("click", showAndCloseModal);
window.addEventListener("click", clickOutSidefromModal);

// Validate Function

function Validate(websiteName, websiteUrl) {
  const expression =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g;
  const regex = new RegExp(expression);
  if (!websiteName || !websiteUrl) {
    alert("Please submit value for both fields");
    return false;
  }
  if (!websiteUrl.match(regex)) {
    alert("Please provide valid Url");
    return false;
  }
  return true;
}

function buildBookmarks() {
  // Delete Bookmarks
  bookmarkContainer.textContent = "";
  bookmarks.forEach((bookmark) => {
    const { name, url } = bookmark;
    console.log(name, url);
    // Create html for items
    const item = document.createElement("div");
    item.classList.add("item");
    const closeIcon = document.createElement("i");
    closeIcon.classList.add("fa", "fa-close");
    closeIcon.setAttribute("title", "Delete Bookmark");
    closeIcon.setAttribute("onclick", `deleteBookmark('${url}')`);
    const linkInfo = document.createElement("div");
    linkInfo.classList.add("name");
    const favicon = document.createElement("img");
    favicon.setAttribute(
      "src",
      `https://s2.googleusercontent.com/s2/favicons?domain=${url}`
    );
    favicon.setAttribute("alt", "Favicon");
    const link = document.createElement("a");
    link.setAttribute("href", `${url}`);
    link.setAttribute("target", "_blank");
    link.textContent = name;
    // Append to Bookmark Container
    linkInfo.append(favicon, link);
    item.append(closeIcon, linkInfo);
    bookmarkContainer.appendChild(item);
  });
}

// Fetch Bookmark

function fetchBookmarks() {
  if (localStorage.getItem("bookmarks")) {
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    console.log("hekk1o");
  } else {
    bookmarks = [
      {
        name: "ShahiShiv",
        url: "https://google.com",
      },
    ];
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    console.log("hek2ko");
  }
  buildBookmarks();
  console.log("hek3ko");
}

// Delete BookMarks
function deleteBookmark(url) {
  bookmarks.forEach((bookmark, i) => {
    if (bookmark.url === url) {
      bookmarks.splice(i, 1);
    }
  });
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  fetchBookmarks();
}

function storBookmark(e) {
  e.preventDefault();
  const websiteName = websiteNameEl.value;
  let websiteUrl = websiteUrlEl.value;
  if (!websiteUrl.includes("https://", "https://")) {
    websiteUrl = `https://${websiteUrl}`;
  }
  if (!Validate(websiteName, websiteUrl)) {
    return false;
  }
  const bookmark = {
    name: websiteName,
    url: websiteUrl,
  };
  bookmarks.push(bookmark);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  fetchBookmarks();
  bookmarkForm.reset();
  websiteNameEl.focus();
}
bookmarkForm.addEventListener("submit", storBookmark);

// on Load

fetchBookmarks();
