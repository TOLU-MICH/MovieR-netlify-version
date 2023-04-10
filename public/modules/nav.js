// myFunction(), nav(), collaps();

/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function myFunction() {
  document.querySelector(".icon").addEventListener("click", () => {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  });
}

function nav() {
  document
    .querySelector(".bar-container")
    .addEventListener("click", function () {
      this.classList.toggle("change");
    });
}

// for opening and collapsing the footer
function collaps() {
  const collapsibles = document.querySelectorAll(".collapsible");
  collapsibles.forEach((item) =>
    item.addEventListener("click", () =>
      this.classList.toggle("collapsible--expanded")
    )
  );
}
