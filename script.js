/* =========================================================
   PIYUSH PURU PORTFOLIO
   Complete JavaScript
========================================================= */


/* =========================================================
   MOBILE MENU
========================================================= */

const menuButton =
  document.getElementById("menuButton");

const nav =
  document.getElementById("nav");


if (menuButton && nav) {

  menuButton.addEventListener("click", () => {

    const opened =
      nav.classList.toggle("open");

    menuButton.setAttribute(
      "aria-expanded",
      opened ? "true" : "false"
    );

  });


  document
    .querySelectorAll(".nav a")
    .forEach((link) => {

      link.addEventListener("click", () => {

        nav.classList.remove("open");

        menuButton.setAttribute(
          "aria-expanded",
          "false"
        );

      });

    });

}


/* =========================================================
   THEME SWITCHER
========================================================= */

const themeButton =
  document.getElementById("themeButton");


const savedTheme =
  localStorage.getItem(
    "piyush-portfolio-theme"
  );


if (savedTheme === "light") {

  document.body.classList.add("light");

  if (themeButton) {
    themeButton.textContent = "☾";
  }

}


if (themeButton) {

  themeButton.addEventListener("click", () => {

    document.body.classList.toggle("light");


    const lightMode =
      document.body.classList.contains("light");


    themeButton.textContent =
      lightMode ? "☾" : "☀";


    localStorage.setItem(
      "piyush-portfolio-theme",
      lightMode
        ? "light"
        : "dark"
    );

  });

}


/* =========================================================
   TYPING ANIMATION
========================================================= */

const typingText =
  document.getElementById("typingText");


const roles = [

  "Full-Stack Developer",

  "MERN Stack Developer",

  "Java Developer",

  "Machine Learning Enthusiast",

  "Researcher"

];


let roleIndex = 0;

let characterIndex = 0;

let deleting = false;


function typeRole() {

  if (!typingText) {
    return;
  }


  const currentRole =
    roles[roleIndex];


  if (!deleting) {

    characterIndex++;


    typingText.textContent =
      currentRole.substring(
        0,
        characterIndex
      );


    if (
      characterIndex >=
      currentRole.length
    ) {

      deleting = true;

      setTimeout(
        typeRole,
        1600
      );

      return;

    }

  } else {

    characterIndex--;


    typingText.textContent =
      currentRole.substring(
        0,
        characterIndex
      );


    if (characterIndex <= 0) {

      characterIndex = 0;

      deleting = false;

      roleIndex =
        (roleIndex + 1) %
        roles.length;

    }

  }


  setTimeout(
    typeRole,
    deleting ? 45 : 80
  );

}


typeRole();


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
  document.querySelectorAll(
    ".reveal"
  );


if ("IntersectionObserver" in window) {

  const revealObserver =
    new IntersectionObserver(

      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              "visible"
            );

            revealObserver.unobserve(
              entry.target
            );

          }

        });

      },

      {
        threshold: 0.12
      }

    );


  revealElements.forEach((element) => {

    revealObserver.observe(element);

  });

} else {

  revealElements.forEach((element) => {

    element.classList.add(
      "visible"
    );

  });

}


/* =========================================================
   SKILL FILTER
========================================================= */

const filterButtons =
  document.querySelectorAll(
    ".filter-button"
  );


const skillCards =
  document.querySelectorAll(
    ".skill-card"
  );


filterButtons.forEach((button) => {

  button.addEventListener("click", () => {

    filterButtons.forEach((item) => {

      item.classList.remove(
        "active"
      );

    });


    button.classList.add(
      "active"
    );


    const selectedCategory =
      button.dataset.filter;


    skillCards.forEach((card) => {

      const category =
        card.dataset.category;


      if (
        selectedCategory === "all" ||
        category === selectedCategory
      ) {

        card.classList.remove(
          "hidden"
        );

      } else {

        card.classList.add(
          "hidden"
        );

      }

    });

  });

});


/* =========================================================
   GITHUB STATS
========================================================= */

async function loadGitHubStats() {

  const repoCount =
    document.getElementById(
      "repoCount"
    );

  const followerCount =
    document.getElementById(
      "followerCount"
    );

  const followingCount =
    document.getElementById(
      "followingCount"
    );


  if (
    !repoCount ||
    !followerCount ||
    !followingCount
  ) {

    return;

  }


  try {

    const response =
      await fetch(
        "https://api.github.com/users/piyush5904",
        {
          headers: {
            "Accept":
              "application/vnd.github+json"
          }
        }
      );


    if (!response.ok) {

      throw new Error(
        "GitHub API request failed"
      );

    }


    const data =
      await response.json();


    repoCount.textContent =
      data.public_repos ?? "—";


    followerCount.textContent =
      data.followers ?? "—";


    followingCount.textContent =
      data.following ?? "—";


  } catch (error) {

    console.warn(
      "Unable to load GitHub statistics.",
      error
    );


    repoCount.textContent = "—";

    followerCount.textContent = "—";

    followingCount.textContent = "—";

  }

}


loadGitHubStats();


/* =========================================================
   FOOTER YEAR
========================================================= */

const yearElement =
  document.getElementById("year");


if (yearElement) {

  yearElement.textContent =
    new Date().getFullYear();

}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const pageSections =
  document.querySelectorAll(
    "main section[id]"
  );


const navigationLinks =
  document.querySelectorAll(
    ".nav a"
  );


if (
  "IntersectionObserver" in window
) {

  const sectionObserver =
    new IntersectionObserver(

      (entries) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) {
            return;
          }


          navigationLinks.forEach((link) => {

            link.classList.remove(
              "active"
            );

          });


          const matchingLink =
            document.querySelector(
              `.nav a[href="#${entry.target.id}"]`
            );


          if (matchingLink) {

            matchingLink.classList.add(
              "active"
            );

          }

        });

      },

      {
        threshold: 0.35
      }

    );


  pageSections.forEach((section) => {

    sectionObserver.observe(section);

  });

}


/* =========================================================
   SMOOTH SCROLL
========================================================= */

document
  .querySelectorAll(
    'a[href^="#"]'
  )
  .forEach((link) => {

    link.addEventListener(
      "click",
      (event) => {

        const targetId =
          link.getAttribute("href");


        if (
          !targetId ||
          targetId === "#"
        ) {

          return;

        }


        const target =
          document.querySelector(
            targetId
          );


        if (!target) {

          return;

        }


        event.preventDefault();


        target.scrollIntoView({

          behavior: "smooth",

          block: "start"

        });

      }
    );

  });


/* =========================================================
   HERO TERMINAL PARALLAX
========================================================= */

const terminal =
  document.querySelector(
    ".terminal-wrapper"
  );


const finePointer =
  window.matchMedia(
    "(pointer: fine)"
  );


if (
  terminal &&
  finePointer.matches
) {

  terminal.addEventListener(
    "mousemove",
    (event) => {

      const rectangle =
        terminal.getBoundingClientRect();


      const x =
        event.clientX -
        rectangle.left;


      const y =
        event.clientY -
        rectangle.top;


      const rotateY =
        ((x / rectangle.width) - 0.5) * 4;


      const rotateX =
        ((y / rectangle.height) - 0.5) * -4;


      terminal.style.transform =
        `perspective(900px)
         rotateX(${rotateX}deg)
         rotateY(${rotateY}deg)
         translateY(-4px)`;

    }
  );


  terminal.addEventListener(
    "mouseleave",
    () => {

      terminal.style.transform = "";

    }
  );

}


/* =========================================================
   HEADER BACKGROUND ON SCROLL
========================================================= */

const header =
  document.getElementById(
    "header"
  );


function updateHeader() {

  if (!header) {
    return;
  }


  if (window.scrollY > 30) {

    header.classList.add(
      "scrolled"
    );

  } else {

    header.classList.remove(
      "scrolled"
    );

  }

}


window.addEventListener(
  "scroll",
  updateHeader,
  {
    passive: true
  }
);


updateHeader();


/* =========================================================
   ESCAPE KEY CLOSES MOBILE MENU
========================================================= */

document.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === "Escape" &&
      nav &&
      menuButton
    ) {

      nav.classList.remove(
        "open"
      );

      menuButton.setAttribute(
        "aria-expanded",
        "false"
      );

    }

  }
);
