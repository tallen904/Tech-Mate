$(document).ready(function() {
  $(".tech").animate(
    {
      left: 5
    },
    500
  );

  $(".mate").animate(
    {
      right: 0
    },
    1000
  );

  $(document).on("click", ".post-btn", function() {
    renderPostPage();
  });
});

function renderPostPage() {
  $(".all-content").empty();
  $("body").css("background-image", "none");
  insertNavBar();
  const formHolder = $('<div class="form-holder">');
  $(".all-content").append(formHolder);
}

function insertNavBar() {
  const navBar = `<nav class="navbar navbar-default">
        <div class="container-fluid">
            <div class="navbar-header">
                <div class="header-text">
                    <h class="tech-2">TECH</h>
                    <h class="mate-2">MATE</h>
                </div>
                <div class="header-links">
                    <a href="#">Home</a>
                    <a href="#">Show Your Skills</a>
                </div>
            </div>
        </div>
    </nav>`;
  $(".all-content").append(navBar);
}
