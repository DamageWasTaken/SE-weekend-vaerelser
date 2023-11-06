function selectGroup(group) {
    if (group == "Alle"){
        [].forEach.call(document.querySelectorAll('.image-container'), function (el) {
            el.style.display = 'inline';
        });
    } else {
        [].forEach.call(document.querySelectorAll('.image-container'), function (el) {
            el.style.display = 'none';
        });
        [].forEach.call(document.querySelectorAll(`.${group}`), function (el) {
            el.style.display = 'inline';
        });
    }
}

function openPopup(person) {
    var popup = document.getElementById("popup");
    popup.classList.toggle("show");
  }