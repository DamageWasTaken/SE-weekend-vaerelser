console.log("Script Loaded");
function selectGroup(group) {
    if (group == "Alle"){
        [].forEach.call(document.querySelectorAll('.image'), function (el) {
            el.style.display = 'inline';
        });
    } else {
        [].forEach.call(document.querySelectorAll('.image'), function (el) {
            el.style.display = 'none';
        });
        console.log(group);

        [].forEach.call(document.querySelectorAll(`.${group}`), function (el) {
            el.style.display = 'inline';
        });
    }
}