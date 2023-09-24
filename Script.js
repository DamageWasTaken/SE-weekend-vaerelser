console.log("Script Loaded");
[].forEach.call(document.querySelectorAll(`.container`), function (el) {
    el.style.visibility = 'collapse';
});

function selectGroup(group) {
    if (group == "Alle"){
        [].forEach.call(document.querySelectorAll(`.image`), function (el) {
            el.style.visibility = 'visible';
        });
    } else {
        [].forEach.call(document.querySelectorAll('.image'), function (el) {
            el.style.visibility = 'collapse';
        });
        console.log(group);

        [].forEach.call(document.querySelectorAll(`.${group}`), function (el) {
            el.style.visibility = 'visible';
        });
    }
}