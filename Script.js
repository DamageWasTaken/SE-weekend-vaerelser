// Data Converter: https://shancarter.github.io/mr-data-converter/

//Declaring global varibles
const allowedExtraValue = 1;
var noChoise = 0;
var ownRoom = 0;
var otherRoom = 0;
var buttonsHidden = false;
var houseButtonsShown = false;
var roomButtonsShown = false;
var smallButtons = false;
var namePosition = 0;

//Declaring all houses & rooms
houseMidgaard = [
    {room:"1a",sex:"f",space:2},
    {room:"1b",sex:"f",space:2},
    {room:2,sex:"m",space:4},
    {room:3,sex:"m",space:3},
    {room:4,sex:"f",space:3},
    {room:5,sex:"f",space:3},
    {room:6,sex:"m",space:3},
    {room:7,sex:"m",space:3},
    {room:8,sex:"f",space:3},
    {room:9,sex:"f",space:3},
    {room:10,sex:"m",space:3},
    {room:11,sex:"m",space:3},
    {room:12,sex:"f",space:3}
]

houseAsgaard = [
    {room:14,sex:"f",space:3},
    {room:15,sex:"m",space:4},
    {room:16,sex:"m",space:3},
    {room:17,sex:"f",space:3},
    {room:18,sex:"f",space:3},
    {room:19,sex:"m",space:3},
    {room:20,sex:"m",space:3},
    {room:21,sex:"f",space:3},
    {room:22,sex:"f",space:3},
    {room:23,sex:"m",space:3},
    {room:24,sex:"m",space:3},
    {room:25,sex:"f",space:3},
    {room:26,sex:"f",space:3}
]

houseUdgaard = [
    {room:27,sex:"m",space:3},
    {room:28,sex:"m",space:4},
    {room:29,sex:"f",space:3},
    {room:30,sex:"f",space:3},
    {room:31,sex:"m",space:3},
    {room:32,sex:"m",space:3},
    {room:33,sex:"f",space:3},
    {room:34,sex:"f",space:3},
    {room:35,sex:"m",space:3},
    {room:36,sex:"m",space:3},
    {room:37,sex:"f",space:3},
    {room:38,sex:"f",space:3},
    {room:39,sex:"f",space:3}
]

houseValhal = [
    {room:40,sex:"f",space:3},
    {room:41,sex:"m",space:3},
    {room:42,sex:"m",space:3},
    {room:43,sex:"f",space:3},
    {room:44,sex:"f",space:3},
    {room:45,sex:"m",space:3}
]

//List of all profiles to be rendered
displayName = [
{number:133,name:"Adelina Høst Johnsen",img:"viggo-billeder/A/Adelina.jpg",room:26,choice:"ikke valgt"},
{number:7,name:"Albert Damsgaard Grønnerup",img:"viggo-billeder/A/Albert.jpg",room:10,choice:"ikke valgt"},
{number:81,name:"Alberte Holmgaard Grønfeldt",img:"viggo-billeder/A/Alberte.jpg",room:4,choice:"ikke valgt"},
{number:14,name:"Alexander Damgård",img:"viggo-billeder/A/Alexander.jpg",room:16,choice:"ikke valgt"},
{number:82,name:"Alma Frølich Hougaard",img:"viggo-billeder/A/Alma.jpg",room:12,choice:"ikke valgt"},
{number:73,name:"Amalie Kortfiz Nielsen",img:"viggo-billeder/A/Amalie.jpg",room:17,choice:"ikke valgt"},
{number:97,name:"Andrea Bjørnskov Bergholt",img:"viggo-billeder/A/Andrea.jpg",room:14,choice:"ikke valgt"},
{number:103,name:"Andrea Nørup Andersen",img:"viggo-billeder/A/Andrea.jpg",room:8,choice:"ikke valgt"},
{number:139,name:"Angelina Christensen Lyberth",img:"viggo-billeder/A/Angelina.jpg",room:37,choice:"ikke valgt"},
{number:41,name:"Anne Wilstrup Holst",img:"viggo-billeder/A/Anne.jpg",room:14,choice:"ikke valgt"},
{number:44,name:"Anton Bissø Stausholm",img:"viggo-billeder/A/Anton.jpg",room:20,choice:"ikke valgt"},
{number:65,name:"Anton Haukrog Møller",img:"viggo-billeder/A/Anton.jpg",room:6,choice:"ikke valgt"},
{number:134,name:"Anton Hermansen",img:"viggo-billeder/A/Anton.jpg",room:41,choice:"ikke valgt"},
{number:104,name:"Astrid Astrup Laursen",img:"viggo-billeder/A/Astrid.jpg",room:29,choice:"ikke valgt"},
{number:6,name:"Astrid Marie Kirkegaard",img:"viggo-billeder/A/Astrid.jpg",room:"1b",choice:"ikke valgt"},
{number:15,name:"Axel Christian Skovgaard Nielsen",img:"viggo-billeder/A/Axel.jpg",room:36,choice:"ikke valgt"},
{number:131,name:"Baylee Halfdan Søgård Fink",img:"viggo-billeder/B/Baylee.jpg",room:2,choice:"ikke valgt"},
{number:27,name:"Benjamin Samuel Nilsen Nicolajsen",img:"viggo-billeder/B/Benjamin.jpg",room:35,choice:"ikke valgt"},
{number:98,name:"Camilla Lehmann Jessen",img:"viggo-billeder/C/Camilla.jpg",room:34,choice:"ikke valgt"},
{number:127,name:"Camille Staberg Simonsen",img:"viggo-billeder/C/Camille.jpg",room:30,choice:"ikke valgt"},
{number:52,name:"Carolina Aagaard",img:"viggo-billeder/C/Carolina.jpg",room:4,choice:"ikke valgt"},
{number:47,name:"Caroline Flintholm Juelsgaard",img:"viggo-billeder/C/Caroline.jpg",room:25,choice:"ikke valgt"},
{number:45,name:"Caroline Sax Riggelsen",img:"viggo-billeder/C/Caroline.jpg",room:30,choice:"ikke valgt"},
{number:119,name:"Cecilia Manfeld-Ørtoft",img:"viggo-billeder/C/Cecilia.jpg",room:25,choice:"ikke valgt"},
{number:60,name:"Cecilie Damsgaard Paulsen",img:"viggo-billeder/C/Cecilie.jpg",room:39,choice:"ikke valgt"},
{number:57,name:"Cecilie Jamilya Stolborg Mendes",img:"viggo-billeder/C/Cecilie.jpg",room:34,choice:"ikke valgt"},
{number:108,name:"Cecilie Margrethe Christiansen",img:"viggo-billeder/C/Cecilie.jpg",room:26,choice:"ikke valgt"},
{number:77,name:"Dicte Johanne Schultz",img:"viggo-billeder/D/Dicte.jpg",room:5,choice:"ikke valgt"},
{number:136,name:"Ella Zwergius Moreno",img:"viggo-billeder/E/Ella.jpg",room:37,choice:"ikke valgt"},
{number:3,name:"Emil Støttrup",img:"viggo-billeder/E/Emil.jpg",room:42,choice:"ikke valgt"},
{number:113,name:"Emilie Christensen",img:"viggo-billeder/E/Emilie.jpg",room:9,choice:"ikke valgt"},
{number:126,name:"Emily Aviaya Zimmermann",img:"viggo-billeder/E/Emily.jpg",room:38,choice:"ikke valgt"},
{number:116,name:"Emma Lindberg Jensen",img:"viggo-billeder/E/Emma.jpg",room:5,choice:"ikke valgt"},
{number:75,name:"Esben Petersen",img:"viggo-billeder/E/Esben.jpg",room:3,choice:"ikke valgt"},
{number:21,name:"Eva Ragauge Muntenjon",img:"viggo-billeder/E/Eva.jpg",room:14,choice:"ikke valgt"},
{number:96,name:"Evelina Spelmane",img:"viggo-billeder/E/Evelina.jpg",room:8,choice:"ikke valgt"},
{number:78,name:"Faye Randris Rowlands",img:"viggo-billeder/F/Faye.jpg",room:38,choice:"ikke valgt"},
{number:8,name:"Frederik Haugaard Brunsgaard",img:"viggo-billeder/F/Frederik.jpg",room:27,choice:"ikke valgt"},
{number:18,name:"Frederik Højmark Pedersen",img:"viggo-billeder/F/Frederik.jpg",room:42,choice:"ikke valgt"},
{number:111,name:"Frederik William Dirksen",img:"viggo-billeder/F/Frederik.jpg",room:45,choice:"ikke valgt"},
{number:110,name:"Freja Michelle Andersen",img:"viggo-billeder/F/Freja.jpg",room:21,choice:"ikke valgt"},
{number:61,name:"Frida Friis Thomsen",img:"viggo-billeder/F/Frida.jpg",room:17,choice:"ikke valgt"},
{number:138,name:"Frida Peters Lassen",img:"viggo-billeder/F/Frida.jpg",room:43,choice:"ikke valgt"},
{number:64,name:"Frida Søgaard Thomsen",img:"viggo-billeder/F/Frida.jpg",room:21,choice:"ikke valgt"},
{number:63,name:"Gry Lindholm Tollgaard",img:"viggo-billeder/G/Gry.jpg",room:25,choice:"ikke valgt"},
{number:20,name:"Gunna Rump Vejlø",img:"viggo-billeder/G/Gunna.jpg",room:37,choice:"ikke valgt"},
{number:99,name:"Halfdan Jacobsen Kirkegaard",img:"viggo-billeder/H/Halfdan.jpg",room:10,choice:"ikke valgt"},
{number:36,name:"Hanibal Ingeberg",img:"viggo-billeder/H/Hanibal.jpg",room:24,choice:"ikke valgt"},
{number:67,name:"Harald Brøcker",img:"viggo-billeder/H/Harald.jpg",room:31,choice:"ikke valgt"},
{number:56,name:"Hjalte Wittek Sørensen",img:"viggo-billeder/H/Hjalte.jpg",room:32,choice:"ikke valgt"},
{number:34,name:"Hugo Qvist Tøpholm",img:"viggo-billeder/H/Hugo.jpg",room:11,choice:"ikke valgt"},
{number:92,name:"Ingeborg Brunn Hinrichsen",img:"viggo-billeder/I/Ingeborg.jpg",room:8,choice:"ikke valgt"},
{number:112,name:"Isabella Kirstine Neuberg Rasmussen",img:"viggo-billeder/I/Isabella.jpg",room:"1a",choice:"ikke valgt"},
{number:76,name:"Jens Møller Martin",img:"viggo-billeder/J/Jens.jpg",room:3,choice:"ikke valgt"},
{number:120,name:"Jeppe Holm Jensen",img:"viggo-billeder/J/Jeppe.jpg",room:19,choice:"ikke valgt"},
{number:32,name:"Johan Lading Katballe",img:"viggo-billeder/J/Johan.jpg",room:7,choice:"ikke valgt"},
{number:43,name:"Johan Stenkil Lajer",img:"viggo-billeder/J/Johan.jpg",room:15,choice:"ikke valgt"},
{number:16,name:"Jonas Rotne",img:"viggo-billeder/J/Jonas.jpg",room:16,choice:"ikke valgt"},
{number:128,name:"Jonas Staghøj Markussen",img:"viggo-billeder/J/Jonas.jpg",room:28,choice:"ikke valgt"},
{number:88,name:"Julie Christensen Venø",img:"viggo-billeder/J/Julie.jpg",room:44,choice:"ikke valgt"},
{number:54,name:"Julie Lykke Lolck",img:"viggo-billeder/J/Julie.jpg",room:40,choice:"ikke valgt"},
{number:26,name:"Justin Vesterlund",img:"viggo-billeder/J/Justin.jpg",room:23,choice:"ikke valgt"},
{number:1,name:"Karla Kobberø",img:"viggo-billeder/K/Karla.jpg",room:33,choice:"ikke valgt"},
{number:53,name:"Karla Weimar Schousen",img:"viggo-billeder/K/Karla.jpg",room:22,choice:"ikke valgt"},
{number:69,name:"Karoline Pagaard Christensen",img:"viggo-billeder/K/Karoline.jpg",room:22,choice:"ikke valgt"},
{number:93,name:"Katja Nygaard-Larsen",img:"viggo-billeder/K/Katja.jpg",room:18,choice:"ikke valgt"},
{number:94,name:"Katrine Brylle",img:"viggo-billeder/K/Katrine.jpg",room:17,choice:"ikke valgt"},
{number:124,name:"Kirstine Ammiztbøll Christensen",img:"viggo-billeder/K/Kirstine.jpg",room:29,choice:"ikke valgt"},
{number:70,name:"Knud Erik Mai Ding",img:"viggo-billeder/K/Knud.jpg",room:2,choice:"ikke valgt"},
{number:91,name:"Kristoffer Rehhoff-Nør",img:"viggo-billeder/K/Kristoffer.jpg",room:27,choice:"ikke valgt"},
{number:68,name:"Laura Vinther Jepsen",img:"viggo-billeder/L/Laura.jpg",room:44,choice:"ikke valgt"},
{number:72,name:"Lina Høft Homilius",img:"viggo-billeder/L/Lina.jpg",room:18,choice:"ikke valgt"},
{number:105,name:"Liva Marie Mikel Schjelde",img:"viggo-billeder/L/Liva.jpg",room:4,choice:"ikke valgt"},
{number:38,name:"Lucas Steele Sørensen",img:"viggo-billeder/L/Lucas.jpg",room:28,choice:"ikke valgt"},
{number:37,name:"Lucas Wittrup Jensen",img:"viggo-billeder/L/Lucas.jpg",room:10,choice:"ikke valgt"},
{number:101,name:"Lykke Pagaard",img:"viggo-billeder/L/Lykke.jpg",room:9,choice:"ikke valgt"},
{number:58,name:"Magnus Beyer Bach Mortensen",img:"viggo-billeder/M/Magnus.jpg",room:23,choice:"ikke valgt"},
{number:84,name:"Malthe Melvild Greve",img:"viggo-billeder/M/Malthe.jpg",room:28,choice:"ikke valgt"},
{number:79,name:"Malthe Drud Vester Palle",img:"viggo-billeder/M/Malthe.jpg",room:6,choice:"ikke valgt"},
{number:135,name:"Malthe Gustavussen",img:"viggo-billeder/M/Malthe.jpg",room:35,choice:"ikke valgt"},
{number:22,name:"Marcus Thorup",img:"viggo-billeder/M/Marcus.jpg",room:45,choice:"ikke valgt"},
{number:46,name:"Maria Løvlund Mandsberg",img:"viggo-billeder/M/Maria.jpg",room:29,choice:"ikke valgt"},
{number:83,name:"Maria West Jørgensen",img:"viggo-billeder/M/Maria.jpg",room:40,choice:"ikke valgt"},
{number:117,name:"Marie Hebsgaard Offersen",img:"viggo-billeder/M/Marie.jpg",room:34,choice:"ikke valgt"},
{number:106,name:"Marius Ehlert Degn Larsen",img:"viggo-billeder/M/Marius.jpg",room:31,choice:"ikke valgt"},
{number:87,name:"Marius Kjeld Finnerup",img:"viggo-billeder/M/Marius.jpg",room:23,choice:"ikke valgt"},
{number:107,name:"Marius Lykke Hansen",img:"viggo-billeder/M/Marius.jpg",room:22,choice:"ikke valgt"},
{number:40,name:"Mary Fischer Sloth",img:"viggo-billeder/M/Mary.jpg",room:18,choice:"ikke valgt"},
{number:66,name:"Mathias Bach Sølvberg Dolleris",img:"viggo-billeder/M/Mathias.jpg",room:15,choice:"ikke valgt"},
{number:85,name:"Mathilde Dræborg Evind",img:"viggo-billeder/M/Mathilde.jpg",room:5,choice:"ikke valgt"},
{number:130,name:"Merle Toft",img:"viggo-billeder/M/Merle.jpg",room:40,choice:"ikke valgt"},
{number:10,name:"Mette Kulby Rick",img:"viggo-billeder/M/Mette.jpg",room:44,choice:"ikke valgt"},
{number:71,name:"Mille Sandholdt",img:"viggo-billeder/M/Mille.jpg",room:43,choice:"ikke valgt"},
{number:25,name:"Mille Schultz Bach",img:"viggo-billeder/M/Mille.jpg",room:38,choice:"ikke valgt"},
{number:129,name:"Mille Sophia Damsø",img:"viggo-billeder/M/Mille.jpg",room:43,choice:"ikke valgt"},
{number:86,name:"Mina Skjoldby Foss",img:"viggo-billeder/M/Mina.jpg",room:30,choice:"ikke valgt"},
{number:132,name:"Nagi Nisioka",img:"viggo-billeder/N/Nagi.jpg",room:19,choice:"ikke valgt"},
{number:114,name:"Nanna Lerche Freudendal",img:"viggo-billeder/N/Nanna.jpg",room:39,choice:"ikke valgt"},
{number:123,name:"Nellie Berg Pedersen",img:"viggo-billeder/N/Nellie.jpg",room:12,choice:"ikke valgt"},
{number:42,name:"Noah Bue Pilgaard",img:"viggo-billeder/N/Noah.jpg",room:36,choice:"ikke valgt"},
{number:12,name:"Noah Grøndahl Lassen",img:"viggo-billeder/N/Noah.jpg",room:15,choice:"ikke valgt"},
{number:24,name:"Noah Aarhus Petersen",img:"viggo-billeder/N/Noah.jpg",room:41,choice:"ikke valgt"},
{number:102,name:"Ole Carl Risak Schou",img:"viggo-billeder/O/Ole.jpg",room:22,choice:"ikke valgt"},
{number:9,name:"Oliver Gaba Lylover",img:"viggo-billeder/O/Oliver.jpg",room:16,choice:"ikke valgt"},
{number:51,name:"Oliver Scott Walters",img:"viggo-billeder/O/Oliver.jpg",room:27,choice:"ikke valgt"},
{number:62,name:"Peter Bille Røhling",img:"viggo-billeder/P/Peter.jpg",room:6,choice:"ikke valgt"},
{number:35,name:"Philip Hilstrøm Sørensen",img:"viggo-billeder/P/Philip.jpg",room:19,choice:"ikke valgt"},
{number:80,name:"Rasmus Benjamin Jørgensen",img:"viggo-billeder/R/Rasmus.jpg",room:15,choice:"ikke valgt"},
{number:31,name:"Rasmus Kirkeskov Hansen",img:"viggo-billeder/R/Rasmus.jpg",room:45,choice:"ikke valgt"},
{number:11,name:"Rasmus Kyhn Boisen",img:"viggo-billeder/R/Rasmus.jpg",room:36,choice:"ikke valgt"},
{number:89,name:"Rune Horsbøll Møller",img:"viggo-billeder/R/Rune.jpg",room:3,choice:"ikke valgt"},
{number:90,name:"Sara Møller Risdahl Knudsen",img:"viggo-billeder/S/Sara.jpg",room:9,choice:"ikke valgt"},
{number:4,name:"Sebastian Bisgaard",img:"viggo-billeder/S/Sebastian.jpg",room:24,choice:"ikke valgt"},
{number:122,name:"Sebastian Skiby Esbjerg",img:"viggo-billeder/S/Sebastian.jpg",room:35,choice:"ikke valgt"},
{number:115,name:"Sebastian Valdemar Sax Sielemann",img:"viggo-billeder/S/Sebastian.jpg",room:31,choice:"ikke valgt"},
{number:50,name:"Silje Andrea Palmelund Lindemann",img:"viggo-billeder/S/Silje.jpg",room:33,choice:"ikke valgt"},
{number:30,name:"Simon Wonsild Krogsgaard Andersen",img:"viggo-billeder/S/Simon.jpg",room:7,choice:"ikke valgt"},
{number:95,name:"Sofie Fynbo Christoffersen",img:"viggo-billeder/S/Sofie.jpg",room:12,choice:"ikke valgt"},
{number:49,name:"Sofus Czeloth Steenskov",img:"viggo-billeder/S/Sofus.jpg",room:42,choice:"ikke valgt"},
{number:137,name:"Stine Louise Clausen",img:"viggo-billeder/S/Stine.jpg",room:39,choice:"ikke valgt"},
{number:5,name:"Svend Nilsen Korsholm",img:"viggo-billeder/S/Svend.jpg",room:28,choice:"ikke valgt"},
{number:109,name:"Tea Bendixen",img:"viggo-billeder/T/Tea.jpg",room:"1b",choice:"ikke valgt"},
{number:17,name:"Thea Dalsgaard Kallsø",img:"viggo-billeder/T/Thea.jpg",room:33,choice:"ikke valgt"},
{number:29,name:"Tobias Grønskov Hansen",img:"viggo-billeder/T/Tobias.jpg",room:24,choice:"ikke valgt"},
{number:28,name:"Tobias Høgh Veis",img:"viggo-billeder/T/Tobias.jpg",room:2,choice:"ikke valgt"},
{number:55,name:"Torbjørn Hornemann Nielsen",img:"viggo-billeder/T/Torbjørn.jpg",room:7,choice:"ikke valgt"},
{number:19,name:"Tristian Alexander Hald",img:"viggo-billeder/T/Tristian.jpg",room:11,choice:"ikke valgt"},
{number:33,name:"Troles Kragerup Lundin",img:"viggo-billeder/T/Troles.jpg",room:32,choice:"ikke valgt"},
{number:59,name:"Tue Storm Mathiasen",img:"viggo-billeder/T/Tue.jpg",room:2,choice:"ikke valgt"},
{number:2,name:"Victor Albert Christensen",img:"viggo-billeder/V/Victor.jpg",room:32,choice:"ikke valgt"},
{number:121,name:"Victoria Roskvist",img:"viggo-billeder/V/Victoria.jpg",room:"1a",choice:"ikke valgt"},
{number:48,name:"Vigga Burmeister Clausen",img:"viggo-billeder/V/Vigga.jpg",room:21,choice:"ikke valgt"},
{number:39,name:"Vilma Torsrup Melgaard",img:"viggo-billeder/V/Vilma.jpg",room:26,choice:"ikke valgt"},
{number:13,name:"Zenia Karen Van Der Plas",img:"viggo-billeder/Z/Zenia.jpg",room:22,choice:"ikke valgt"}
]

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
    document.getElementById("replaceableText").innerHTML = displayName[i].name;
    closeButtons();
}

//Closes the popup menu
function closePopup() {
    var popup = document.getElementById("popup");
    popup.classList.toggle("show");
    popup.classList.toggle("blur-bg");
    closeButtons();
}


//Checks if person selected own room or other room, if they selected own room - do prep, otherwise send to next menu
function selectorButton(place) {
    //Grabs the name from the person selected
    var nameText = document.getElementById("replaceableText")
    //Grabs the name text itself from the person selected
    var currentName = e => e.name === document.getElementById("replaceableText").textContent
    //Finds out what number in the array the person is
    namePosition = displayName.findIndex(currentName);
    //Finds out what ID to target
    var currentPerson = document.getElementById("pers-" + namePosition);
    //Finds the persons current room number
    var roomNumber = displayName[namePosition].room;
    //Defines webpage elements
    var mainButtons = document.getElementById("buttons-stage-1");
    var houseButtons = document.getElementById("buttons-stage-2");
    //If OwnRoom is selected prep the person to be added to the room array
    if (place == "Eget") {
        
        //Check if the selected room is available
        if (checkRoomAvailability(roomNumber) == true) {
            //Define the dummy profile to be added the displayName array
            var profile = [{
                //Finds the details and adds them to the dummy profile
                number: displayName[namePosition].number,
                name: displayName[namePosition].name,
                img: displayName[namePosition].img,
                room: displayName[namePosition].room,
                choice: "eget vaerelse"
            }]
            //Goes down the array finds the person in the array, deletes them, and inserts the dummy profile to the array
            profile.forEach(element => {
                const itemIndex = displayName.findIndex(o => o.number === element.number);
                if(itemIndex > -1) {
                    displayName[itemIndex] = element;
                } else {
                    displayName = displayName.push(element);
                }       
            });
            //Removes and adds a class to be able to select person by group
            currentPerson.classList.toggle("Ikke-Valgt");
            currentPerson.classList.toggle("Eget");
            //Call the data to be counted and close the popup.
            countData();
            closePopup();
        } else {
            console.log("!!!NO ROOM!!!")
        }
    } else {
        mainButtons.classList.toggle("hide");
        nameText.classList.toggle("hide");
        buttonsHidden = true;
        houseButtons.classList.toggle("show");
        houseButtonsShown = true;
    }
}

//Check if a room is available, if it is, return true
function checkRoomAvailability(room) {
    var roomAmount = 0;
    var roomPosition = 0;
    //Check what house - then find what room the person lives in
    if (room < 13 || room == "1a" || room == "1b") {
        //Find the room position in the array
        roomPosition = houseMidgaard.findIndex(e => e.room === room);
        //Find the amount of people in the room
        roomAmount = Object.keys(houseMidgaard[roomPosition]).length-3;
        //Find out how many people can be assaigned to the room, by taking the space value and adding the amount of extra people allowed
        var allowedAmount = houseMidgaard[roomPosition].space+allowedExtraValue;
    } else if (room < 27) {
        roomPosition = houseAsgaard.findIndex(e => e.room === room);
        roomAmount = Object.keys(houseAsgaard[roomPosition]).length-3;
        var allowedAmount = houseMidgaard[roomPosition].space+allowedExtraValue;
    } else if (room < 40) {
        roomPosition = houseUdgaard.findIndex(e => e.room === room);
        roomAmount = Object.keys(houseUdgaard[roomPosition]).length-3;
        var allowedAmount = houseMidgaard[roomPosition].space+allowedExtraValue;
    } else if (room < 46) {
        roomPosition = houseValhal.findIndex(e => e.room === room);
        roomAmount = Object.keys(houseValhal[roomPosition]).length-3;
        var allowedAmount = houseMidgaard[roomPosition].space+allowedExtraValue;
    }
    //Return value based on if there's room or not
    if (allowedAmount > roomAmount) {
        return true;
    } else {
        return false;
    }
}

//Opens up the house select menu
function selectHouse(house) {
    var houseButtons = document.getElementById("buttons-stage-2");
    var roomButtons = document.getElementById("buttons-stage-3");
    //Removes the house selects buttons & adds the room select buttons.
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
        for (var i = 0; i < houseAsgaard.length; i++) {
            document.getElementById("btn-" + i ).innerHTML = houseAsgaard[i].room;
        }
    } else if (house == "Midgård") {
        for (var i = 0; i < houseMidgaard.length; i++) {
            document.getElementById("btn-" + i ).innerHTML = houseMidgaard[i].room;
        }
    } else if (house == "Udgård") {
        for (var i = 0; i < houseUdgaard.length; i++) {
            document.getElementById("btn-" + i ).innerHTML = houseUdgaard[i].room;
        }
    } else if (house == "Valhal") {
        //Removes the extra buttons because there are less rooms
        roomButtons.classList.toggle("small");
        smallButtons = true;
        for (var i = 0; i < houseValhal.length; i++) {
            document.getElementById("btn-" + i ).innerHTML = houseValhal[i].room;
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
    var nameText = document.getElementById("replaceableText")
    var mainButtons = document.getElementById("buttons-stage-1");
    var houseButtons = document.getElementById("buttons-stage-2");
    var roomButtons = document.getElementById("buttons-stage-3");

    //Go down the list and check if something is in the default state, if not, return to default
    if (houseButtonsShown == true) {
        houseButtons.classList.toggle("show");
        houseButtonsShown = false;
    }
    if (roomButtonsShown == true) {
        roomButtons.classList.toggle("show");
        roomButtonsShown = false;
    }
    if (buttonsHidden == true) {
        mainButtons.classList.toggle("hide");
        nameText.classList.toggle("hide");
        buttonsHidden = false;
    }
    if (smallButtons == true) {
        roomButtons.classList.toggle("small");
        smallButtons = false;
    }
}

//Profiles are first loaded once the website and DOM is loaded to not conflict
window.onload = () => {
    //Call the function
    appendData(displayName)
    //Load all profiles named in "displayName"
    function appendData(displayName) {
        //Grabs the outer shell for where the profiles are to be loaded to
        var mainContainer = document.getElementById("container");
        //Loads each profle one by one, giving assets as well
        for (var i = 0; i < displayName.length; i++) {
            mainContainer.insertAdjacentHTML("beforeend",'<div class="image-container Ikke-Valgt ' + displayName[i].name.charAt(0) + '" id="pers-' + i + '" onclick="openPopup('+ i +')">' + '<img src="' + displayName[i].img + '" class="image"> <p class="name-text">' + displayName[i].name + '</p> </div>',);
        }
    }

    countData();
}

//Count the number of each value
function countData() {
    //Set count to 0
    noChoise = 0;
    ownRoom = 0;
    otherRoom = 0;
    //Count each type & add to value
    for (var i = 0; i < displayName.length; i++) {
        if (displayName[i].choice == "eget vaerelse") {
            ownRoom++;
        } else if (displayName[i].choice == "andet vaerelse") {
            otherRoom++;
        } else {
            noChoise++;
        }
    }
    //Call the values to be rendered to the website
    updateCount();
}