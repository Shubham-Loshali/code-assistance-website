'use strict';

/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * toggle navbar
 */

const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const navToggler = document.querySelector("[data-nav-toggler]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  navToggler.classList.toggle("active");
}

addEventOnElem(navToggler, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  navToggler.classList.remove("active");
}

addEventOnElem(navbarLinks, "click", closeNavbar);



/**
 * header active
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});



/**
 * download modal
 */

const downloadModal = document.querySelector("[data-download-modal]");
const downloadTriggers = document.querySelectorAll("[data-download-trigger]");
const modalOverlay = document.querySelector("[data-modal-overlay]");
const modalClose = document.querySelector("[data-modal-close]");

// Open modal
const openDownloadModal = function () {
  downloadModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

// Close modal
const closeDownloadModal = function () {
  downloadModal.classList.remove("active");
  document.body.style.overflow = "auto";
}

// Add event listeners
addEventOnElem(downloadTriggers, "click", function (e) {
  e.preventDefault();
  openDownloadModal();
});

addEventOnElem(modalOverlay, "click", closeDownloadModal);
addEventOnElem(modalClose, "click", closeDownloadModal);

// Close modal on Escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && downloadModal.classList.contains("active")) {
    closeDownloadModal();
  }
});



/**
 * download functionality
 */

// Download links configuration
const downloadLinks = {
  web: "https://chrome.google.com/webstore", // Replace with actual web extension link
  vscode: "https://marketplace.visualstudio.com/items?itemName=klka.klka-assistant", // Your VS Code extension
  android: "./downloads/code-assistant.apk" // Replace with actual APK file path
};

// Handle download buttons
const downloadWebBtn = document.querySelector("[data-download-web]");
const downloadVscodeBtn = document.querySelector("[data-download-vscode]");
const downloadAndroidBtn = document.querySelector("[data-download-android]");

if (downloadWebBtn) {
  downloadWebBtn.addEventListener("click", function () {
    window.open(downloadLinks.web, "_blank");
    closeDownloadModal();
  });
}

if (downloadVscodeBtn) {
  downloadVscodeBtn.addEventListener("click", function () {
    window.open(downloadLinks.vscode, "_blank");
    closeDownloadModal();
  });
}

if (downloadAndroidBtn) {
  downloadAndroidBtn.addEventListener("click", function () {
    // Create a temporary link element for APK download
    const link = document.createElement("a");
    link.href = downloadLinks.android;
    link.download = "code-assistant.apk";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    closeDownloadModal();
  });
}