```javascript
/* =========================================
   PIYUSH PURU PORTFOLIO V2
========================================= */


/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuBtn = document.getElementById("menuBtn");
const navigation = document.getElementById("navigation");


if (menuBtn && navigation) {

  menuBtn.addEventListener("click", () => {

    const isOpen =
      navigation.classList.toggle("open");

    menuBtn.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

  });


  document
    .querySelectorAll(".navigation a")
    .forEach((link) => {

      link.addEventListener("click", () => {

        navigation.classList.remove("open");

        menuBtn.setAttribute(
          "aria-expanded",
          "false"
        );

      });

    });

}


/* =========================================
   DARK / LIGHT MODE
========================================= */

const themeBtn =
  document.getElementById("themeBtn");


const savedTheme =
  localStorage.getItem("portfolio-theme");


if (savedTheme === "light") {

  document.body.classList.add("light");

  themeBtn.textContent = "☾";

}


if (themeBtn) {

  themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light");


    const isLight =
      document.body.classList.contains("light");


    themeBtn.textContent =
      isLight ? "☾" : "☼";


    localStorage.setItem(
      "portfolio-theme",
      isLight ? "light" : "dark"
    );

  });

}


/* =========================================
   TYPING EFFECT
========================================= */

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
      characterIndex ===
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


    if (characterIndex === 0) {

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


/* =========================================
   SCROLL REVEAL
========================================= */

const revealObserver =
  new IntersectionObserver(

    (entries) => {

      entries.forEach((entry) => {

        if (
          entry.isIntersecting
        ) {

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


document
  .querySelectorAll(".reveal")
  .forEach((element) => {

    revealObserver.observe(element);

  });


/* =========================================
   SKILL FILTERS
========================================= */

const filters =
  document.querySelectorAll(".filter");


const skillCards =
  document.querySelectorAll(".skill-card");


filters.forEach((filter) => {

  filter.addEventListener(
    "click",
    () => {

      filters.forEach((button) => {

        button.classList.remove(
          "active"
        );

      });


      filter.classList.add(
        "active"
      );


      const selected =
        filter.dataset.filter;


      skillCards.forEach((card) => {

        const category =
          card.dataset.category;


        if (
          selected === "all" ||
          category === selected
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

    }
  );

});


/* =========================================
   GITHUB API
========================================= */

async function loadGitHubStats() {

  const repoCount =
    document.getElementById("repoCount");

  const followerCount =
    document.getElementById(
      "followerCount"
    );

  const followingCount =
    document.getElementById(
      "followingCount"
    );


  try {

    const response =
      await fetch(
        "https://api.github.com/users/piyush5904"
      );


    if (!response.ok) {

      throw new Error(
        "GitHub request failed"
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
      "GitHub stats unavailable:",
      error
    );


    repoCount.textContent = "—";

    followerCount.textContent = "—";

    followingCount.textContent = "—";

  }

}


loadGitHubStats();


/* =========================================
   CURRENT YEAR
========================================= */

const year =
  document.getElementById("year");


if (year) {

  year.textContent =
    new Date().getFullYear();

}


/* =========================================
   ACTIVE NAVIGATION
========================================= */

const sections =
  document.querySelectorAll(
    "section[id]"
  );


const navItems =
  document.querySelectorAll(
    ".navigation a"
  );


const sectionObserver =
  new IntersectionObserver(

    (entries) => {

      entries.forEach((entry) => {

        if (
          entry.isIntersecting
        ) {

          navItems.forEach((link) => {

            link.classList.remove(
              "active"
            );

          });


          const activeLink =
            document.querySelector(
              `.navigation a[href="#${entry.target.id}"]`
            );


          if (activeLink) {

            activeLink.classList.add(
              "active"
            );

          }

        }

      });

    },

    {
      threshold: 0.45
    }

  );


sections.forEach((section) => {

  sectionObserver.observe(section);

});


/* =========================================
   SMOOTH SCROLL
========================================= */

document
  .querySelectorAll(
    'a[href^="#"]'
  )
  .forEach((anchor) => {

    anchor.addEventListener(
      "click",
      (event) => {

        const id =
          anchor.getAttribute("href");


        const target =
          document.querySelector(id);


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


/* =========================================
   MOUSE PARALLAX FOR HERO CARD
========================================= */

const heroCard =
  document.querySelector(
    ".hero-card"
  );


if (
  heroCard &&
  window.matchMedia(
    "(pointer: fine)"
  ).matches
) {

  heroCard.addEventListener(
    "mousemove",
    (event) => {

      const rect =
        heroCard.getBoundingClientRect();


      const x =
        event.clientX -
        rect.left;


      const y =
        event.clientY -
        rect.top;


      const rotateX =
        ((y / rect.height) - 0.5) * -5;


      const rotateY =
        ((x / rect.width) - 0.5) * 5;


      heroCard.style.transform =
        `perspective(900px)
         rotateX(${rotateX}deg)
         rotateY(${rotateY}deg)
         translateY(-4px)`;

    }
  );


  heroCard.addEventListener(
    "mouseleave",
    () => {

      heroCard.style.transform =
        "";

    }
  );

}
```
