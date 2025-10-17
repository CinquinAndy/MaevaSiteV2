window.onscroll = function () {
  document.getElementById("blocksite").classList.remove("block-site");
};

window.onresize = function () {
  changementTailleFenetre();
};

window.onload = function () {
  changementTailleFenetre();
};

function changementTailleFenetre() {
  let block_site = document.getElementById("blocksite");
  if (document.body.clientWidth >= 768) {
    block_site.classList.add("block-site");
  } else if (document.body.clientWidth < 768) {
    block_site.classList.remove("block-site");
  }
}
