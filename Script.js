console.log("Script Loaded");
[].forEach.call(document.querySelectorAll('.image-list'), function (el) {
    el.style.visibility = 'collapse';
});
console.log("Passed")
function selectGroup(group) {
    if (group == "Alle"){
        [].forEach.call(document.querySelectorAll('.image'), function (el) {
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