// Data Converter: https://shancarter.github.io/mr-data-converter/

//Declaring global time varibles
const d = new Date();
const checkTime = 23;

//Import the student data
var studentList = data.map((x) => x)

//VALUE TO CHANGE ALLOWED EXTRA AMOUNT IN EACH ROOM
const allowedExtraValue = 2;

//General variables
var noChoise = 0;
var ownRoom = 0;
var otherRoom = 0;
var buttonsHidden = false;
var houseButtonsShown = false;
var roomButtonsShown = false;
var smallButtons = false;
var namePosition = 0;
var roomAmount = 0;
var allowedAmount = 0;
var roomPosition = 0;
var selectedHouse = "";
var personSelected = 0;
var runLock = false;
var checkList = [];

//Declaring all houses & rooms
var rooms = [
    {room:"1a",sex:"x",space:2},
    {room:"1b",sex:"x",space:2},
    {room:2,sex:"x",space:4},
    {room:3,sex:"x",space:3},
    {room:4,sex:"x",space:3},
    {room:5,sex:"x",space:3},
    {room:6,sex:"x",space:3},
    {room:7,sex:"x",space:3},
    {room:8,sex:"x",space:3},
    {room:9,sex:"x",space:3},
    {room:10,sex:"x",space:3},
    {room:11,sex:"x",space:3},
    {room:12,sex:"x",space:3},
    {room:14,sex:"x",space:3},
    {room:15,sex:"x",space:4},
    {room:16,sex:"x",space:3},
    {room:17,sex:"x",space:3},
    {room:18,sex:"x",space:3},
    {room:19,sex:"x",space:3},
    {room:20,sex:"x",space:3},
    {room:21,sex:"x",space:3},
    {room:22,sex:"x",space:3},
    {room:23,sex:"x",space:3},
    {room:24,sex:"x",space:3},
    {room:25,sex:"x",space:3},
    {room:26,sex:"x",space:3},
    {room:27,sex:"x",space:3},
    {room:28,sex:"x",space:4},
    {room:29,sex:"x",space:3},
    {room:30,sex:"x",space:3},
    {room:31,sex:"x",space:3},
    {room:32,sex:"x",space:3},
    {room:33,sex:"x",space:3},
    {room:34,sex:"x",space:3},
    {room:35,sex:"x",space:3},
    {room:36,sex:"x",space:3},
    {room:37,sex:"x",space:3},
    {room:38,sex:"x",space:3},
    {room:39,sex:"x",space:3},
    {room:40,sex:"x",space:3},
    {room:41,sex:"x",space:3},
    {room:42,sex:"x",space:3},
    {room:43,sex:"x",space:3},
    {room:44,sex:"x",space:3},
    {room:45,sex:"x",space:3}
]

//Converts the rooms to the correct sex, remains x if no-one is assaigned to the room
for (let i = 0; i < rooms.length; i++) {
    var _i = i;
    if (i > 12) {
        _i = i+1;
    }
    //Allowing for manual adjustment of the room
    if (rooms[i].sex === 'x'){
        if (i === 0) {
            var index = studentList.findIndex(e => e.room  === "1a");
        } else if (i === 1) {
            var index = studentList.findIndex(e => e.room  === '1b');
        } else {
            var index = studentList.findIndex(e => e.room  === _i);
        }
        if (index !== -1) {
            var _sex = studentList[index].sex;
            rooms[i].sex = _sex;
        }
    }
}

window.addEventListener("keydown", checkKeyPressed, false);

function checkKeyPressed(evt) {
    if (evt.keyCode === 69) {
        showAlert("!!! Triggered Sort Event !!!");
        returnPeople();
    }
    if (evt.keyCode === 80) {
        openPrintPopup();
        generateList();
        print();
    }
    if (evt.keyCode === 27) {
        closePrintPopup();
    }
    if (evt.keyCode === 82) {
        generateList();
    }
}

//Shortens name to a string less than 25
function shortenName(name) {
    for (var i = 0; i < 2; i++) {
        var splitName = "";
        if (name.length > 20) {
            var nameArr = name.split(" ");
            nameArr.splice(1, 1);
            nameArr.forEach((e) => {
                splitName += e + " ";
            });
            name = splitName;
        } else {
            return name;
        }
        
    }
    return name;
}

//Return a string that is used to generate the printable list
function printRoom(room) {
    var index = rooms.findIndex(e => e.room  === room);
    var length = Object.keys(rooms[index]).length - 3;
    var string = "";
    if (length <= 0) {
        return "";
    }
    for (var i = 0; i < length; i++) {
        var slot = "Slot" + (i + 1)
        var localRoom = rooms[index];
        var name = studentList[studentList.findIndex(e => e.number  === localRoom[slot])].name;      
        name = shortenName(name);
        string += localRoom[slot] + " | " + name
        if (length > 1 && i < (length - 1)) {
            string += " <br> "
        }
    }
    return string;
}

//Generate the room array showcase
function generateList() {
    var tableMidgaard = document.getElementById("generated-table-1");
	var tableAsgaard = document.getElementById("generated-table-2");
	var tableUdgaard = document.getElementById("generated-table-3");
	var tableValhal = document.getElementById("generated-table-4");
    if (runLock) {
        tableMidgaard.innerHTML = '';
        tableAsgaard.innerHTML = '';
        tableUdgaard.innerHTML = '';
        tableValhal.innerHTML = '';
    }
    runLock = true;
    //-------
    tableMidgaard.insertAdjacentHTML("beforeend",'<div class="table-part"> <div class="header"> <b>Room 1A</b> </div> <div class="generated-text">' + printRoom("1a") + '</div> <div class="header"> <b>Room 1B</b> </div> <div class="generated-text">' + printRoom("1b") + '</div> </div>',);
    for (var i = 0; i < 11 ; i++) {
        tableMidgaard.insertAdjacentHTML("beforeend",'<div class="table-part"> <div class="header"> <b>Room ' + (i+2) + '</b> </div> <div class="generated-text">' + printRoom(i+2) + '</div> </div>',);
    }
    //-------
    for (var i = 0; i < 13 ; i++) {
        tableAsgaard.insertAdjacentHTML("beforeend",'<div class="table-part"> <div class="header"> <b>Room ' + (i+14) + '</b> </div> <div class="generated-text">' + printRoom(i+14) + '</div> </div>',);
    }
    tableAsgaard.insertAdjacentHTML("beforeend",'<div class="table-part"> <div class="blank"></div> </div>',);
    //-------
    for (var i = 0; i < 13 ; i++) {
        tableUdgaard.insertAdjacentHTML("beforeend",'<div class="table-part"> <div class="header"> <b>Room ' + (i + 27) + '</b> </div> <div class="generated-text">' + printRoom(i+27) + '</div> </div>',);
    }
    tableUdgaard.insertAdjacentHTML("beforeend",'<div class="table-part"> <div class="blank"></div> </div>',);
    //-------
    for (var i = 0; i < 6 ; i++) {
        tableValhal.insertAdjacentHTML("beforeend",'<div class="table-part"> <div class="header"> <b>Room ' + (i+40) + '</b> </div> <div class="generated-text">' + printRoom(i+40) + '</div> </div>',);
    }
}

//Opens the popup menu
function openPrintPopup() {
    var popup = document.getElementById("print-popup");
    var body = document.getElementById("container");
    addTag(popup, "show");
    addTag(body, "print");
}

//Closes the popup menu
function closePrintPopup() {
    var popup = document.getElementById("print-popup");
    var body = document.getElementById("container");
    removeTag(popup, "show");
    removeTag(body, "print");
}

//Make the top group selector work
function selectGroup(group) {
    if (group == "Alle"){
        //If all is selected show all images/profiles
        [].forEach.call(document.querySelectorAll('.image-container'), function (el) {
            el.style.display = 'flex';
        });
    } else {
        //Otherwise hide all images/profiles, and un-hide all images in a certain letter group
        [].forEach.call(document.querySelectorAll('.image-container'), function (el) {
            el.style.display = 'none';
        });
        [].forEach.call(document.querySelectorAll(`.${group}`), function (el) {
            el.style.display = 'flex';
        });
    }
}

//Opens the popup menu
function openPopup(i) {
    var popup = document.getElementById("popup");
    popup.classList.toggle("show");
    popup.classList.toggle("blur-bg");
    document.getElementById("replaceableText").innerHTML = studentList[i].name;
    document.getElementById("replaceableImage").src = studentList[i].img;
    closeButtons();
}

//Closes the popup menu
function closePopup() {
    var popup = document.getElementById("popup");
    popup.classList.toggle("show");
    popup.classList.toggle("blur-bg");
    closeButtons();
}

//Returns to the previous menu
function returnBack() {
    var switchT = houseButtonsShown;
    //Close the menu and open it again to "return" to the first part
    closePopup();
    openPopup(namePosition);
    //Check if the menu was in part 3, if so return to part 2
    if (!switchT) {
        selectorButton('Andet');
    }
}

//Shows the top alert
function showAlert(alertMessage, param) {
    //Grab the elements needed
    var alert = document.getElementById("alert-container");
    var alertContent = document.getElementById("alert-content");
    var alertEffect = document.getElementById("top-alert");
    //Check if we just want to close the alert
    if (param == "Close") {
        alert.style.height = "0";
        alertContent.style.height = "0";
        alertEffect.style.height = "0";
        return;
    } else {
        //Activate the effect
        document.getElementById("top-alert").classList.toggle("active")
        //Set the message in the alert to the specified text
        document.getElementById("alertText").innerHTML = alertMessage;
        //Open the alert
        alert.style.height = "45px";
        alertContent.style.height = "43px";
        alertEffect.style.height = "45px";
        //After 2s close the alert
        setTimeout(function() {
            alert.style.height = "0";
            alertContent.style.height = "0";
            alertEffect.style.height = "0";
            //Stop the effect
            document.getElementById("top-alert").classList.toggle("active")
        }, 2000)
    }
    
}

//Checks if person selected own room or other room, if they selected own room - do prep, otherwise send to next menu
function selectorButton(place) {
    //Grabs the name and image from the person selected
    var nameText = document.getElementById("replaceableText");
    var image = document.getElementById("replaceableImage");
    var header = document.getElementById("header");
    //Grabs the name text itself from the person selected
    var currentName = e => e.name === document.getElementById("replaceableText").textContent;
    //Finds out what number in the array the person is
    namePosition = studentList.findIndex(currentName);
    //Finds out what ID to target
    var currentPerson = document.getElementById("pers-" + namePosition);
    //Finds the persons current room number
    var roomNumber = studentList[namePosition].room;
    //Finds the persons id number
    var personNumber = studentList[namePosition].number;
    //Defines webpage elements
    var mainButtons = document.getElementById("buttons-stage-1");
    var houseButtons = document.getElementById("buttons-stage-2");
    //If OwnRoom is selected prep the person to be added to the room array
    if (place == "Eget") {
        //NEEDS TO BE REDESIGNED
        //Check if the selected room is available
        if (checkRoomAvailability(roomNumber) == true) {
            //Update the persons choice 
            studentList[namePosition].choice = 'eget vaerelse';

            //Removes and adds a class to be able to select person by group
            addTag(currentPerson, "Eget");
            removeTag(currentPerson, "Andet");
            removeTag(currentPerson, "Ikke-Valgt");
            
            //Call the data to be counted and close the popup.
            countData();
            closePopup();
            addPersonToRoom(studentList[namePosition].number, studentList[namePosition].room);
            //updateDisplayedRoom("pers-" + namePosition, studentList[namePosition].room);
        } else {
            relocate(personNumber, roomNumber, "", true)
            closePopup();
        }
    } else {
        //Hide all the previous elements
        mainButtons.classList.toggle("hide");
        nameText.classList.toggle("hide");
        image.classList.toggle("hide");
        //Unhide all the new buttons
        header.classList.toggle("show");
        houseButtons.classList.toggle("show");
        //Switchstate True
        buttonsHidden = true;
        houseButtonsShown = true;
        //Sets the person selected
        personSelected = studentList[namePosition].number;
        //Updates the header text for the popup
        document.getElementById("replaceableTextHeader").innerHTML = "Vælg fløj";
    }
}

//Relocates someone based on some parameters
function relocate(person, targetLocation, previousLocation, forceRelocate) {
    if (forceRelocate === true) {
        //Declare variables
        var roomLength;
        var roomSlotPos;
        var currentRoom;
        var memberList;
        var previousRoom;
        var personToBeReplaced = {};

        //Find out what index position the room is
        roomSlotPos = rooms.findIndex(e => e.room === targetLocation);
        //Find out the length of the room
        roomLength = Object.keys(rooms[roomSlotPos]).length;
        //Find out who is in the room
        memberList = Object.assign({}, rooms[roomSlotPos]);
        //Grab the room from the array
        currentRoom = rooms[roomSlotPos];

        //Delete the decriptors from the room copy
        delete memberList.room;
        delete memberList.sex;
        delete memberList.space;
        //Set the memberlist to the values of the room so that the slots are removed.
        memberList = Object.values(memberList);
        for (var i = 0; i < roomLength; i++) {
            //Check if their an original member of the room. If they are store the name and break the loop
            if (!originalMember(memberList[i], targetLocation)) {
                //Grab the person and place them into an object
                Object.assign(personToBeReplaced, {id: memberList[i]});
                //Stop the loop
                break;
            }
        }
        //Find the persons own room and add it to the object
        Object.assign(personToBeReplaced, {ownRoom: studentList[studentList.findIndex(e => e.number === personToBeReplaced.id)].room})
        //Remove a person
        removePersonFromRoom(personToBeReplaced.id, currentRoom);
        //Add people to their respective rooms.
        addPersonToRoom(personToBeReplaced.id, personToBeReplaced.ownRoom);
        addPersonToRoom(person, targetLocation);
    } else {
        if (!checkRoomAvailability(targetLocation)) {
            return;
        }

        roomSlotPos = rooms.findIndex(e => e.room === previousLocation);
        previousRoom = rooms[roomSlotPos];

        removePersonFromRoom(person, previousRoom);
        addPersonToRoom(person, targetLocation, true);
    }
}

//Checks if a person is an orginal member of a room
function originalMember(person, room) {
    //Get their index position
    personPosition = studentList.findIndex(e => e.number === person);
    //Check if the room entered is equal to their original room
    if (room === studentList[personPosition].room) {
        return true;
    } else {
        return false;
    }
}

//Check if a room is available, if it is, return true
function checkRoomAvailability(room) {
    //Find the room position in the array
    roomPosition = rooms.findIndex(e => e.room === room);
    //Find the amount of people in the room
    roomAmount = Object.keys(rooms[roomPosition]).length-3;
    //Find out how many people can be assaigned to the room, by taking the space value and adding the amount of extra people allowed
    allowedAmount = rooms[roomPosition].space+allowedExtraValue;

    //Return value based on if there's room or not
    if (allowedAmount > roomAmount) {
        return true;
    } else {
        return false;
    }
}

//Checks if a person is in a specific room or just in a room
function personInRoom(id, room) {
    //Check if the room param is specified
    if (room == null || (typeof room === "string" && room.trim().length === 0)) {
        //If it is check all houses for the person
        for (var i = 0; i < rooms.length; i++) {
            var roomPos = i;
            var roomContent = rooms[roomPos];
            if (Object.values(roomContent).includes(id, 1)) {
                return roomContent;
            }
        }

        return false;
    } else {
        var roomObj = e => e.room === room;
        var roomPos = 0;
        var roomContent;

        if (room === 0) {
                room = "1a";
            } else if (room ==1) {
                room = "1b";
            }
            roomPos = rooms.findIndex(roomObj);
            roomContent = rooms[roomPos];

        try {
            return Object.values(roomContent).includes(id, 1);
        } catch(err) {
            return false;
        }
    }
}

//Adds a person to the room specified
function addPersonToRoom(person, room, bypass) {
    //Check if the person is in a room, if so remove them from their previous room.
    if (personInRoom(person) !== false && bypass !== true) {
        relocate(person, room, studentList[studentList.findIndex(e => e.number === person)].room, false);
        return;
    }

    //Set the room position to the index of the room
        roomPosition = rooms.findIndex(e => e.room === room);
        //Grab the current profile of the room
        var currentProfile = Object.assign({}, rooms[roomPosition]);
        //Find out what slot the person should be added to
        var slotPos = "Slot" + (Object.keys(rooms[roomPosition]).length - 2);
        //Define the object that should be added
        var addedContent = {
            [slotPos]:person
        }
        //Add the new object to the profile
        Object.assign(currentProfile, addedContent);
        
        //Incase the object in a array
        var profile = [];
        profile.push(currentProfile);

        //Add the profile to the house array
        profile.forEach(element => {
            const itemIndex = rooms.findIndex(o => o.room === element.room);
            if(itemIndex > -1) {
                rooms[itemIndex] = element;
            } else {
                rooms = rooms.push(element);
            }
        });

        var namePos = studentList.findIndex(e => e.number === person);

        //Update the persons profile
        if (studentList[namePos].room === room) {
            studentList[namePos].choice = "eget vaerelse";
            console.log('Own');
        } else {
            studentList[namePos].choice = "andet vaerelse";
            console.log('Other');
        }

        updateDisplayedRoom("pers-" + namePos, room);
        countData();
}

//Removes a person from a room !!! Requires the room object as the param "room"
function removePersonFromRoom(person, room) {
    //Set the room number so we can check for it
    var roomNumber = room.room;
    //Set a variable that is used later
    var minusVal = 0;
    //Create a temp object thats set to the current room
    var currentRoom = Object.assign({}, room);
    //Create a empty object for the new room to be sorted into
    var newRoom = {};
    //Assaign the discriptors to the new roo,
    newRoom["room"] = currentRoom.room;
    newRoom["sex"] = currentRoom.sex;
    newRoom["space"] = currentRoom.space;
    //Delete them from the temp room so that they don't interfere
    delete currentRoom.room;
    delete currentRoom.sex;
    delete currentRoom.space;
    //Set a variable to the length of the room
    var lengthOfRoom = Object.keys(currentRoom).length;
    //If there's only one person in the room then don't run the loop
    if (lengthOfRoom > 1) {
        //For each of the elements in the temp room
        for (var i = 0; i < lengthOfRoom; i++) {
            //Set the slot they are in depending on the loop status
            var slotNumber = "Slot" + (i + 1);
            //Set the slot they should be in depending on if there's been a person removed
            var slot = "Slot" + (i + 1 - minusVal);
            //Check if the person is the person we should remove
            if (currentRoom[slotNumber] !== person) {
                //If they're not just add them to the new room
                newRoom[slot] = currentRoom[slotNumber];
            } else {
                //If they are we don't add them to the list and say that the slots should be rolled back 1
                minusVal++;
            }
        }
    }
    //Create an array to put the object into
    var profile = [];
    //Put the object into the array
    profile.push(newRoom);

    //Standard code to add object to array / replace existing object in array
    profile.forEach(element => {
        const itemIndex = rooms.findIndex(o => o.room === element.room);
        if(itemIndex > -1) {
            rooms[itemIndex] = element;
        } else {
            rooms = rooms.push(element);
        }
    });

}

//Function to check if the person specified is the same sex as the room
function checkSex(personId, room) {
    var sex = studentList[studentList.findIndex(e => e.number === personId)].sex;
    var roomSex = rooms[rooms.findIndex(e => e.room === room)].sex
    if (sex == roomSex) {
        return true;
    } else {
        return false;
    }
}

//Func for adding pers to the selected room based on the button
function selectRoom(setRoom) {
    //Grabs the name text itself from the person selected
    var currentName = e => e.name === document.getElementById("replaceableText").textContent;
    //Finds out what number in the array the person is
    namePosition = studentList.findIndex(currentName);
    //Finds the persons id
    var id = studentList[namePosition].number
    //Finds out what ID to target
    var currentPerson = document.getElementById("pers-" + namePosition);
    if (selectedHouse == "Midgaard") {
        //Correct the value so that the rooms match
        if (setRoom == 0) {
            setRoom = "1a";
        } else if (setRoom == 1) {
            setRoom = "1b";
        }
        if (checkRoomAvailability(setRoom) == true) {
            if (!checkSex(id, setRoom)) {
                closePopup();
                showAlert("Du må ikke sove på dette værelse");
                return
            }
            addPersonToRoom(personSelected, setRoom);
            updateDisplayedRoom("pers-" + namePosition, setRoom);
        } else {
            closePopup();
            showAlert("Valgt værelse er fuldt");
            return false;
        }
    } else if (selectedHouse == "Asgaard") {
        if (checkRoomAvailability(setRoom + 14) == true) {
            if (!checkSex(id, setRoom + 14)) {
                closePopup();
                showAlert("Du må ikke sove på dette værelse");
                return
            }
            addPersonToRoom(personSelected, setRoom + 14);
            updateDisplayedRoom("pers-" + namePosition, setRoom + 14);
        } else {
            closePopup();
            showAlert("Valgt værelse er fuldt");
            return false;
        }
    } else if (selectedHouse == "Udgaard") {
        if (checkRoomAvailability(setRoom + 27) == true) {
            if (!checkSex(id, setRoom + 27)) {
                closePopup();
                showAlert("Du må ikke sove på dette værelse");
                return
            }
            addPersonToRoom(personSelected, setRoom + 27);
            updateDisplayedRoom("pers-" + namePosition, setRoom + 27);
        } else {
            closePopup();
            showAlert("Valgt værelse er fuldt");
            return false;
        }
    } else if (selectedHouse == "Valhal") {
        if (checkRoomAvailability(setRoom + 40) == true) {
            if (!checkSex(id, setRoom + 40)) {
                closePopup();
                showAlert("Du må ikke sove på dette værelse");
                return
            }
            addPersonToRoom(personSelected, setRoom + 40);
            updateDisplayedRoom("pers-" + namePosition, setRoom + 40);
        } else {
            closePopup();
            showAlert("Valgt værelse er fuldt");
            return false;
        }
    }
    //Define the dummy profile to be added the studentList array
    var profile = [{
        //Finds the details and adds them to the dummy profile
        number: studentList[namePosition].number,
        name: studentList[namePosition].name,
        img: studentList[namePosition].img,
        room: studentList[namePosition].room,
        choice: "andet vaerelse"
    }]
    //Goes down the array finds the person in the array, deletes them, and inserts the dummy profile to the array
    profile.forEach(element => {
        const itemIndex = studentList.findIndex(o => o.number === element.number);
        if(itemIndex > -1) {
            studentList[itemIndex] = element;
        } else {
            studentList = studentList.push(element);
        }  
    });
    addTag(currentPerson, "Andet");
    removeTag(currentPerson, "Eget");
    removeTag(currentPerson, "Ikke-Valgt");
    closePopup();
    countData();
}

//Check if the button should be grayed out, and does so if needed.
function grayOutButton(buttonNumber, house, _pers) {
    var button = document.getElementById("btn-" + buttonNumber );
    var state = false;
    var room = 0;
    console.log(_pers);
    switch (house) {
        case 'Midgaard':
            room = buttonNumber;
            if (buttonNumber == 0) {
                room = '1a';
            } else if (buttonNumber == 1) {
                room = '1b';
            }
            break;

        case 'Asgaard':
            room = buttonNumber + 14;
            break;

        case 'Udgaard':
            room = buttonNumber + 27;
            break;

        case 'Valhal':
            room = buttonNumber + 40;
            break;
    }

    if (!checkRoomAvailability(room)) {
        state = true;
    }
    if (!checkSex(_pers, room)) {
        state = true;
    }
    if (personInRoom(_pers, room)) {
        state = true;
    }

    switch (state) {
        case true:
            addTag(button,'not-available');
            break;

        case false:
            removeTag(button,'not-available');
            break;
    }
    /*var button = document.getElementById("btn-" + buttonNumber );
    if (param && !button.classList.contains("not-available")) {
        button.classList.toggle("not-available");
    } else if (!param && button.classList.contains("not-available")) {
        button.classList.toggle("not-available");
    }*/
}

//Opens up the house select menu
function selectHouse(house) {
    var houseButtons = document.getElementById("buttons-stage-2");
    var roomButtons = document.getElementById("buttons-stage-3");
    //Removes the house selects buttons & adds the room select buttons.
    //Change the popup header text
    document.getElementById("replaceableTextHeader").innerHTML = house + " - Værelse";
    houseButtons.classList.toggle("show");
    houseButtonsShown = false;
    roomButtons.classList.toggle("show");
    roomButtonsShown = true;
    //Makes sure that the extra buttons are added as well
    [].forEach.call(document.querySelectorAll(`.extra-btn`), function (el) {
        el.style.display = 'inline';
    });
    //Chekcs what house is selected and adds the room numbers to the buttons
    if (house == "Asgård") {
        selectedHouse = "Asgaard";
        for (var i = 13; i < 26; i++) {
            var minusI = i - 13;
            document.getElementById("btn-" + minusI).innerHTML = rooms[i].room;
            grayOutButton(minusI, 'Asgaard', personSelected);
        }
    } else if (house == "Midgård") {
        selectedHouse = "Midgaard";
        for (var i = 0; i < 13; i++) {
            document.getElementById("btn-" + i ).innerHTML = rooms[i].room;
            grayOutButton(i, 'Midgaard', personSelected);
        }
    } else if (house == "Udgård") {
        selectedHouse = "Udgaard";
        for (var i = 26; i < 39; i++) {
            var minusI = i - 26;
            document.getElementById("btn-" + minusI).innerHTML = rooms[i].room;
            grayOutButton(minusI, 'Udgaard', personSelected);
        }
    } else if (house == "Valhal") {
        selectedHouse = "Valhal";
        //Removes the extra buttons because there are less rooms
        roomButtons.classList.toggle("small");
        smallButtons = true;
        for (var i = 39; i < 45; i++) {
            var minusI = i - 39;
            document.getElementById("btn-" + minusI).innerHTML = rooms[i].room;
            grayOutButton(minusI, 'Valhal', personSelected);
        }
        [].forEach.call(document.querySelectorAll(`.extra-btn`), function (el) {
            el.style.display = 'none';
        });
    }
}

//Send the values to the HTMl page
function updateCount() {
    document.getElementById("eget-vaerelse-number").innerHTML = ownRoom;
    document.getElementById("andet-vaerelse-number").innerHTML = otherRoom;
    document.getElementById("ikke-valgt-number").innerHTML = noChoise;
}

//Make sure all the buttons are closed and returned to default
function closeButtons() {
    //Define the elements that are to be used
    var nameText = document.getElementById("replaceableText");
    var image = document.getElementById("replaceableImage");
    var mainButtons = document.getElementById("buttons-stage-1");
    var houseButtons = document.getElementById("buttons-stage-2");
    var roomButtons = document.getElementById("buttons-stage-3");
    var header = document.getElementById("header");

    //Go down the list and check if something is in the default state, if not, return to default
    if (houseButtonsShown == true) {
        houseButtons.classList.toggle("show");
        header.classList.toggle("show")
        houseButtonsShown = false;
    }
    if (roomButtonsShown == true) {
        roomButtons.classList.toggle("show");
        header.classList.toggle("show")
        roomButtonsShown = false;
    }
    if (buttonsHidden == true) {
        mainButtons.classList.toggle("hide");
        nameText.classList.toggle("hide");
        image.classList.toggle("hide");
        buttonsHidden = false;
    }
    if (smallButtons == true) {
        roomButtons.classList.toggle("small");
        smallButtons = false;
    }
}

//Function to remove a present tag
function removeTag(element, tag) {
    if (element.classList.contains(tag)) {
        element.classList.toggle(tag);
    }
}

//Function to add a tag
function addTag(element, tag) {
    if (!element.classList.contains(tag)) {
        element.classList.toggle(tag);
    }
}

//Updates the displayed room is a person changes room
function updateDisplayedRoom(personId, room) {
    var parentElement = document.getElementById(personId);
    var childElement = parentElement.children[2];
    var replaceText = childElement.children[1];
    replaceText.innerHTML = room;
    if (room === studentList[personId.split('-')[1]].room) {
        removeTag(parentElement, "Ikke-Valgt");
        removeTag(parentElement, "Andet");
        addTag(parentElement, "Eget");
    } else {
        removeTag(parentElement, "Ikke-Valgt");
        removeTag(parentElement, "Eget");
        addTag(parentElement, "Andet");
    }
}

//Send everyone back to their original room if they're not allready in a room
function returnPeople() {
    for (var i = 0; i < studentList.length; i++) {
        if (studentList[i].choice === "ikke valgt") {
            //Define the variables needed
            var person = studentList[i].number;
            var personId = "pers-" + i;
            var room = studentList[i].room;
            var currentPerson = document.getElementById("pers-" + i);
            
            studentList[i].choice = "eget vaerelse";
            updateDisplayedRoom(personId, room);
            addPersonToRoom(person, room, false);
            addTag(currentPerson, "Eget");
            removeTag(currentPerson, "Andet");
            removeTag(currentPerson, "Ikke-Valgt");
        } else if (studentList[i].choice === "andet vaerelse") {
            console.log('Here');
        }
    }
    countData();
}

//Function loads all the profiles once the sourcefile is selected
function loadDOM() {
    hideInput();
    for (var i = 0; i < weekendList.length; i++) {
        var index = studentList.findIndex(e => e.name  === weekendList[i]);
        checkList.push(index);
        var testObejct = studentList[index];
        testObejct.choice = "ikke valgt";
    }
    //Call the function
    appendData(studentList)
    //Load all profiles named in "studentList"
    function appendData(studentList) {
        //Grabs the outer shell for where the profiles are to be loaded to
        var mainContainer = document.getElementById("container");
        //Loads each profle one by one, giving assets as well
        for (var i = 0; i < studentList.length; i++) {
            if (checkList.includes(i)) {
                mainContainer.insertAdjacentHTML("beforeend",'<div class="image-container Ikke-Valgt ' + studentList[i].name.charAt(0) + '" id="pers-' + i + '" onclick="openPopup('+ i +')">' + '<img src="' + studentList[i].img + '" class="image"> <p class="name-text">' + studentList[i].name + '</p> <div class="room-overlay"><p class="overlay-text overlay-static-text">Værelse</p> <p class="overlay-text overlay-replace-text">xx</p></div> </div>',);
            } else {
                mainContainer.insertAdjacentHTML("beforeend",'<div class="image-container DONT-SHOW Ikke-Valgt ' + studentList[i].name.charAt(0) + '" id="pers-' + i + '" onclick="openPopup('+ i +')">' + '<img src="' + studentList[i].img + '" class="image"> <p class="name-text">' + studentList[i].name + '</p> <div class="room-overlay"><p class="overlay-text overlay-static-text">Værelse</p> <p class="overlay-text overlay-replace-text">xx</p></div> </div>',);
            }
        }
    }
    //Count the data
    countData();
    //Close the alert once the window is loaded
    showAlert(" ", "Close");
    //Set a interval that checks the time every minute
    var minute = 1000*60;
    setInterval(() => {
        if (checkHour()) {
            returnPeople();
            clearInterval();
        }
    }, minute);
}

function checkHour() {
    var hour = d.getHours();
    if (hour === checkTime) {
        return true;
    } else {
        return false;
    }
}

//Count the number of each value
function countData() {
    //Set count to 0
    noChoise = 0;
    ownRoom = 0;
    otherRoom = 0;
    //Count each type & add to value
    for (var i = 0; i < studentList.length; i++) {
        if (studentList[i].choice == "eget vaerelse") {
            ownRoom++;
        } else if (studentList[i].choice == "andet vaerelse") {
            otherRoom++;
        } else if (studentList[i].choice == "ikke valgt") {
            noChoise++;
        }
    }
    //Call the values to be rendered to the website
    updateCount();
}

var weekendList = [];

//Closes the file select menu
function hideInput() {
    var input = document.getElementById("file-input");
    addTag(input, "hide");
}

//Make sure that you get a warning before leaveing the page.
window.onbeforeunload = function(event) {
    event.preventDefault();
    return event.returnValue = "Are you sure you want to leave the page?";
}


//Load the weekend file
function previewFile() {
    var [file] = document.querySelector("input[type=file]").files;
    const reader = new FileReader();

    reader.addEventListener("load", () => {
        //Set the result
        var res = reader.result;
        //Set the delta of how often we need to remove parts of the array.
        var delta = 2;
        //Split the result
        const splitArray = res.split(/(?:\r?\n|(?:;))/gim); // |(?:;)
        //Remove the first 4 items of the array
        splitArray.splice(0,4);
        //Loop through the array where we delete every nth (delta) of the array
        for (var i = delta; i < splitArray.length; i += delta) {
            splitArray.splice(i,1);
        }
        //Loop though the array were we join every 2 parts of the array.
        for (var i = 0; i < splitArray.length; i += delta) {
            var cacheArray = [splitArray[i],splitArray[i+1]];
            weekendList.push(cacheArray.join(' '));
        }
        //Run the function to load the rest of the DOM
        loadDOM();
        },
        false,
    );

    if (file) {
        reader.readAsText(file);
    }
}