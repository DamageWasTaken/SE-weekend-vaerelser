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
var roomAmount = 0;
var allowedAmount = 0;
var roomPosition = 0;
var selectedHouse = "";
var personSelected = 0;

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
{number:97,name:"Andrea Bjørnskov Bergholt",img:"viggo-billeder/A/Andrea 1.jpg",room:14,choice:"ikke valgt"},
{number:103,name:"Andrea Nørup Andersen",img:"viggo-billeder/A/Andrea 2.jpg",room:8,choice:"ikke valgt"},
{number:139,name:"Angelina Christensen Lyberth",img:"viggo-billeder/A/Angelina.jpg",room:37,choice:"ikke valgt"},
{number:41,name:"Anne Wilstrup Holst",img:"viggo-billeder/A/Anne.jpg",room:14,choice:"ikke valgt"},
{number:44,name:"Anton Bissø Stausholm",img:"viggo-billeder/A/Anton 1.jpg",room:20,choice:"ikke valgt"},
{number:65,name:"Anton Haukrog Møller",img:"viggo-billeder/A/Anton 2.jpg",room:6,choice:"ikke valgt"},
{number:134,name:"Anton Hermansen",img:"viggo-billeder/A/Anton 3.jpg",room:41,choice:"ikke valgt"},
{number:104,name:"Astrid Astrup Laursen",img:"viggo-billeder/A/Astrid 1.jpg",room:29,choice:"ikke valgt"},
{number:6,name:"Astrid Marie Kirkegaard",img:"viggo-billeder/A/Astrid 2.jpg",room:"1b",choice:"ikke valgt"},
{number:15,name:"Axel Christian Skovgaard Nielsen",img:"viggo-billeder/A/Axel.jpg",room:36,choice:"ikke valgt"},
{number:131,name:"Baylee Halfdan Søgård Fink",img:"viggo-billeder/B/Baylee.jpg",room:2,choice:"ikke valgt"},
{number:27,name:"Benjamin Samuel Nilsen Nicolajsen",img:"viggo-billeder/B/Benjamin.jpg",room:35,choice:"ikke valgt"},
{number:98,name:"Camilla Lehmann Jessen",img:"viggo-billeder/C/Camilla.jpg",room:34,choice:"ikke valgt"},
{number:127,name:"Camille Staberg Simonsen",img:"viggo-billeder/C/Camille.jpg",room:30,choice:"ikke valgt"},
{number:52,name:"Carolina Aagaard",img:"viggo-billeder/C/Carolina.jpg",room:4,choice:"ikke valgt"},
{number:47,name:"Caroline Flintholm Juelsgaard",img:"viggo-billeder/C/Caroline 1.jpg",room:25,choice:"ikke valgt"},
{number:45,name:"Caroline Sax Riggelsen",img:"viggo-billeder/C/Caroline 2.jpg",room:30,choice:"ikke valgt"},
{number:119,name:"Cecilia Manfeld-Ørtoft",img:"viggo-billeder/C/Cecilia.svg",room:25,choice:"ikke valgt"},
{number:60,name:"Cecilie Damsgaard Paulsen",img:"viggo-billeder/C/Cecilie 1.jpg",room:39,choice:"ikke valgt"},
{number:57,name:"Cecilie Jamilya Stolborg Mendes",img:"viggo-billeder/C/Cecilie 2.jpg",room:34,choice:"ikke valgt"},
{number:108,name:"Cecilie Margrethe Christiansen",img:"viggo-billeder/C/Cecilie 3.jpg",room:26,choice:"ikke valgt"},
{number:77,name:"Dicte Johanne Schultz",img:"viggo-billeder/D/Dicte.jpg",room:5,choice:"ikke valgt"},
{number:136,name:"Ella Zwergius Moreno",img:"viggo-billeder/E/Ella.jpg",room:37,choice:"ikke valgt"},
{number:3,name:"Emil Støttrup",img:"viggo-billeder/E/Emil.jpg",room:42,choice:"ikke valgt"},
{number:113,name:"Emilie Christensen",img:"viggo-billeder/E/Emilie.jpg",room:9,choice:"ikke valgt"},
{number:126,name:"Emily Aviaya Zimmermann",img:"viggo-billeder/E/Emily.svg",room:38,choice:"ikke valgt"},
{number:116,name:"Emma Lindberg Jensen",img:"viggo-billeder/E/Emma.jpg",room:5,choice:"ikke valgt"},
{number:75,name:"Esben Petersen",img:"viggo-billeder/E/Esben.jpg",room:3,choice:"ikke valgt"},
{number:21,name:"Eva Ragauge Muntenjon",img:"viggo-billeder/E/Eva.jpg",room:14,choice:"ikke valgt"},
{number:96,name:"Evelina Spelmane",img:"viggo-billeder/E/Evelina.jpg",room:8,choice:"ikke valgt"},
{number:78,name:"Faye Randris Rowlands",img:"viggo-billeder/F/Faye.jpg",room:38,choice:"ikke valgt"},
{number:8,name:"Frederik Haugaard Brunsgaard",img:"viggo-billeder/F/Frederik 1.jpg",room:27,choice:"ikke valgt"},
{number:18,name:"Frederik Højmark Pedersen",img:"viggo-billeder/F/Frederik 2.jpg",room:42,choice:"ikke valgt"},
{number:111,name:"Frederik William Dirksen",img:"viggo-billeder/F/Frederik 3.jpg",room:45,choice:"ikke valgt"},
{number:110,name:"Freja Michelle Andersen",img:"viggo-billeder/F/Freja.jpg",room:21,choice:"ikke valgt"},
{number:61,name:"Frida Friis Thomsen",img:"viggo-billeder/F/Frida 1.jpg",room:17,choice:"ikke valgt"},
{number:138,name:"Frida Peters Lassen",img:"viggo-billeder/F/Frida 2.jpg",room:43,choice:"ikke valgt"},
{number:64,name:"Frida Søgaard Thomsen",img:"viggo-billeder/F/Frida 3.jpg",room:21,choice:"ikke valgt"},
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
{number:32,name:"Johan Lading Katballe",img:"viggo-billeder/J/Johan 1.jpg",room:7,choice:"ikke valgt"},
{number:43,name:"Johan Stenkil Lajer",img:"viggo-billeder/J/Johan 2.jpg",room:15,choice:"ikke valgt"},
{number:16,name:"Jonas Rotne",img:"viggo-billeder/J/Jonas 1.jpg",room:16,choice:"ikke valgt"},
{number:128,name:"Jonas Staghøj Markussen",img:"viggo-billeder/J/Jonas 2.jpg",room:28,choice:"ikke valgt"},
{number:88,name:"Julie Christensen Venø",img:"viggo-billeder/J/Julie 1.jpg",room:44,choice:"ikke valgt"},
{number:54,name:"Julie Lykke Lolck",img:"viggo-billeder/J/Julie 2.jpg",room:40,choice:"ikke valgt"},
{number:26,name:"Justin Vesterlund",img:"viggo-billeder/J/Justin.jpg",room:23,choice:"ikke valgt"},
{number:1,name:"Karla Kobberø",img:"viggo-billeder/K/Karla 1.jpg",room:33,choice:"ikke valgt"},
{number:53,name:"Karla Weimar Schousen",img:"viggo-billeder/K/Karla 2.jpg",room:22,choice:"ikke valgt"},
{number:69,name:"Karoline Pagaard Christensen",img:"viggo-billeder/K/Karoline.jpg",room:22,choice:"ikke valgt"},
{number:93,name:"Katja Nygaard-Larsen",img:"viggo-billeder/K/Katja.jpg",room:18,choice:"ikke valgt"},
{number:94,name:"Katrine Brylle",img:"viggo-billeder/K/Katrine.jpg",room:17,choice:"ikke valgt"},
{number:124,name:"Kirstine Ammiztbøll Christensen",img:"viggo-billeder/K/Kirstine.jpg",room:29,choice:"ikke valgt"},
{number:70,name:"Knud Erik Mai Ding",img:"viggo-billeder/K/Knud.jpg",room:2,choice:"ikke valgt"},
{number:91,name:"Kristoffer Rehhoff-Nør",img:"viggo-billeder/K/Kristoffer.jpg",room:27,choice:"ikke valgt"},
{number:68,name:"Laura Vinther Jepsen",img:"viggo-billeder/L/Laura.jpg",room:44,choice:"ikke valgt"},
{number:72,name:"Lina Høft Homilius",img:"viggo-billeder/L/Lina.jpg",room:18,choice:"ikke valgt"},
{number:105,name:"Liva Marie Mikel Schjelde",img:"viggo-billeder/L/Liva.jpg",room:4,choice:"ikke valgt"},
{number:38,name:"Lucas Steele Sørensen",img:"viggo-billeder/L/Lucas 1.jpg",room:28,choice:"ikke valgt"},
{number:37,name:"Lucas Wittrup Jensen",img:"viggo-billeder/L/Lucas 2.jpg",room:10,choice:"ikke valgt"},
{number:101,name:"Lykke Pagaard",img:"viggo-billeder/L/Lykke.jpg",room:9,choice:"ikke valgt"},
{number:58,name:"Magnus Beyer Bach Mortensen",img:"viggo-billeder/M/Magnus.jpg",room:23,choice:"ikke valgt"},
{number:84,name:"Malthe Melvild Greve",img:"viggo-billeder/M/Malte 1.jpg",room:28,choice:"ikke valgt"},
{number:79,name:"Malthe Drud Vester Palle",img:"viggo-billeder/M/Malthe 2.jpg",room:6,choice:"ikke valgt"},
{number:135,name:"Malthe Gustavussen",img:"viggo-billeder/M/Malthe 3.jpg",room:35,choice:"ikke valgt"},
{number:22,name:"Marcus Thorup",img:"viggo-billeder/M/Marcus.jpg",room:45,choice:"ikke valgt"},
{number:46,name:"Maria Løvlund Mandsberg",img:"viggo-billeder/M/Maria 1.jpg",room:29,choice:"ikke valgt"},
{number:83,name:"Maria West Jørgensen",img:"viggo-billeder/M/Maria 2.jpg",room:40,choice:"ikke valgt"},
{number:117,name:"Marie Hebsgaard Offersen",img:"viggo-billeder/M/Marie 3.jpg",room:34,choice:"ikke valgt"},
{number:106,name:"Marius Ehlert Degn Larsen",img:"viggo-billeder/M/Marius 1.jpg",room:31,choice:"ikke valgt"},
{number:87,name:"Marius Kjeld Finnerup",img:"viggo-billeder/M/Marius 2.jpg",room:23,choice:"ikke valgt"},
{number:107,name:"Marius Lykke Hansen",img:"viggo-billeder/M/Marius 3.jpg",room:22,choice:"ikke valgt"},
{number:40,name:"Mary Fischer Sloth",img:"viggo-billeder/M/Mary.jpg",room:18,choice:"ikke valgt"},
{number:66,name:"Mathias Bach Sølvberg Dolleris",img:"viggo-billeder/M/Mathias.jpg",room:15,choice:"ikke valgt"},
{number:85,name:"Mathilde Dræborg Evind",img:"viggo-billeder/M/Mathilde.jpg",room:5,choice:"ikke valgt"},
{number:130,name:"Merle Toft",img:"viggo-billeder/M/Merle.jpg",room:40,choice:"ikke valgt"},
{number:10,name:"Mette Kulby Rick",img:"viggo-billeder/M/Mette.jpg",room:44,choice:"ikke valgt"},
{number:71,name:"Mille Sandholdt",img:"viggo-billeder/M/Mille 1.jpg",room:43,choice:"ikke valgt"},
{number:25,name:"Mille Schultz Bach",img:"viggo-billeder/M/Mille 2.jpg",room:38,choice:"ikke valgt"},
{number:129,name:"Mille Sophia Damsø",img:"viggo-billeder/M/Mille 3.jpg",room:43,choice:"ikke valgt"},
{number:86,name:"Mina Skjoldby Foss",img:"viggo-billeder/M/Mina.jpg",room:30,choice:"ikke valgt"},
{number:132,name:"Nagi Nisioka",img:"viggo-billeder/N/Nagi.jpg",room:19,choice:"ikke valgt"},
{number:114,name:"Nanna Lerche Freudendal",img:"viggo-billeder/N/Nanna.jpg",room:39,choice:"ikke valgt"},
{number:123,name:"Nellie Berg Pedersen",img:"viggo-billeder/N/Nellie.jpg",room:12,choice:"ikke valgt"},
{number:42,name:"Noah Bue Pilgaard",img:"viggo-billeder/N/Noah 1.jpg",room:36,choice:"ikke valgt"},
{number:12,name:"Noah Grøndahl Lassen",img:"viggo-billeder/N/Noah 2.jpg",room:15,choice:"ikke valgt"},
{number:24,name:"Noah Aarhus Petersen",img:"viggo-billeder/N/Noah 3.jpg",room:41,choice:"ikke valgt"},
{number:102,name:"Ole Carl Risak Schou",img:"viggo-billeder/O/Lego.jpg",room:22,choice:"ikke valgt"},
{number:9,name:"Oliver Gaba Lylover",img:"viggo-billeder/O/Oliver 1.jpg",room:16,choice:"ikke valgt"},
{number:51,name:"Oliver Scott Walters",img:"viggo-billeder/O/Oliver 2.jpg",room:27,choice:"ikke valgt"},
{number:62,name:"Peter Bille Røhling",img:"viggo-billeder/P/Peter.jpg",room:6,choice:"ikke valgt"},
{number:35,name:"Philip Hilstrøm Sørensen",img:"viggo-billeder/P/Philip.jpg",room:19,choice:"ikke valgt"},
{number:80,name:"Rasmus Benjamin Jørgensen",img:"viggo-billeder/R/Rasmus 1.jpg",room:15,choice:"ikke valgt"},
{number:31,name:"Rasmus Kirkeskov Hansen",img:"viggo-billeder/R/Rasmus 2.jpg",room:45,choice:"ikke valgt"},
{number:11,name:"Rasmus Kyhn Boisen",img:"viggo-billeder/R/Rasmus 3.jpg",room:36,choice:"ikke valgt"},
{number:89,name:"Rune Horsbøll Møller",img:"viggo-billeder/R/Rune.jpg",room:3,choice:"ikke valgt"},
{number:90,name:"Sara Møller Risdahl Knudsen",img:"viggo-billeder/S/Sara.jpg",room:9,choice:"ikke valgt"},
{number:4,name:"Sebastian Bisgaard",img:"viggo-billeder/S/Sebastian 1.jpg",room:24,choice:"ikke valgt"},
{number:122,name:"Sebastian Skiby Esbjerg",img:"viggo-billeder/S/Sebastian 2.jpg",room:35,choice:"ikke valgt"},
{number:115,name:"Sebastian Valdemar Sax Sielemann",img:"viggo-billeder/S/Sebastian 3.jpg",room:31,choice:"ikke valgt"},
{number:50,name:"Silje Andrea Palmelund Lindemann",img:"viggo-billeder/S/Silje.jpg",room:33,choice:"ikke valgt"},
{number:30,name:"Simon Wonsild Krogsgaard Andersen",img:"viggo-billeder/S/Simon.jpg",room:7,choice:"ikke valgt"},
{number:95,name:"Sofie Fynbo Christoffersen",img:"viggo-billeder/S/Sofie.jpg",room:12,choice:"ikke valgt"},
{number:49,name:"Sofus Czeloth Steenskov",img:"viggo-billeder/S/Sofus.jpg",room:42,choice:"ikke valgt"},
{number:137,name:"Stine Louise Clausen",img:"viggo-billeder/S/Stine.jpg",room:39,choice:"ikke valgt"},
{number:5,name:"Svend Nilsen Korsholm",img:"viggo-billeder/S/Svend.jpg",room:28,choice:"ikke valgt"},
{number:109,name:"Tea Bendixen",img:"viggo-billeder/T/Tea.jpg",room:"1b",choice:"ikke valgt"},
{number:17,name:"Thea Dalsgaard Kallsø",img:"viggo-billeder/T/Thea.jpg",room:33,choice:"ikke valgt"},
{number:29,name:"Tobias Grønskov Hansen",img:"viggo-billeder/T/Tobias 1.jpg",room:24,choice:"ikke valgt"},
{number:28,name:"Tobias Høgh Veis",img:"viggo-billeder/T/Tobias 2.jpg",room:2,choice:"ikke valgt"},
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
    document.getElementById("replaceableImage").src = displayName[i].img;
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
    namePosition = displayName.findIndex(currentName);
    //Finds out what ID to target
    var currentPerson = document.getElementById("pers-" + namePosition);
    //Finds the persons current room number
    var roomNumber = displayName[namePosition].room;
    //Finds the persons id number
    var personNumber = displayName[namePosition].number;
    //Defines webpage elements
    var mainButtons = document.getElementById("buttons-stage-1");
    var houseButtons = document.getElementById("buttons-stage-2");
    //If OwnRoom is selected prep the person to be added to the room array
    if (place == "Eget") {
        //NEEDS TO BE REDESIGNED
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
            removeTag(currentPerson, "Andet");
            //
            
            //Call the data to be counted and close the popup.
            countData();
            closePopup();
            addPersonToRoom(displayName[namePosition].number, displayName[namePosition].room);
            updateDisplayedRoom("pers-" + namePosition, displayName[namePosition].room);
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
        personSelected = displayName[namePosition].number;
        //Updates the header text for the popup
        document.getElementById("replaceableTextHeader").innerHTML = "Vælg fløj";
    }
}

//Relocates someone based on some parameters
function relocate(person, targetLocation, previousLocation, forceRelocate) {
    if (forceRelocate === true) {
        var roomLength;
        var roomSlotPos;
        var currentRoom;
        var memberList;
        var personToBeReplaced = {};
        if (targetLocation < 13 || targetLocation == "1a" || targetLocation == "1b") {
            roomSlotPos = houseMidgaard.findIndex(e => e.room === targetLocation);
            roomLength = Object.keys(houseMidgaard[roomSlotPos]).length
            memberList = Object.assign({}, houseMidgaard[roomSlotPos]);
            currentRoom = houseMidgaard[roomSlotPos];
        } else if (targetLocation < 27) {
            roomSlotPos = houseAsgaard.findIndex(e => e.room === targetLocation);
            roomLength = Object.keys(houseAsgaard[roomSlotPos]).length
            memberList = Object.assign({}, houseAsgaard[roomSlotPos]);
            currentRoom = houseAsgaard[roomSlotPos];
        } else if (targetLocation < 40) {
            roomSlotPos = houseUdgaard.findIndex(e => e.room === targetLocation);
            roomLength = Object.keys(houseUdgaard[roomSlotPos]).length
            memberList = Object.assign({}, houseUdgaard[roomSlotPos]);
            currentRoom = houseUdgaard[roomSlotPos];
        } else if (targetLocation < 46) {
            roomSlotPos = houseValhal.findIndex(e => e.room === targetLocation);
            roomLength = Object.keys(houseValhal[roomSlotPos]).length
            memberList = Object.assign({}, houseValhal[roomSlotPos]);
            currentRoom = houseValhal[roomSlotPos];
        }
        delete memberList.room;
        delete memberList.sex;
        delete memberList.space;
        memberList = Object.values(memberList);
        for (var i = 0; i < roomLength; i++) {
            //Check if their an original member of the room. If they are store the name and break the loop
            if (!originalMember(memberList[i], targetLocation)) {
                Object.assign(personToBeReplaced, {id: memberList[i]})
                break
            }
        }
        Object.assign(personToBeReplaced, {ownRoom: displayName[displayName.findIndex(e => e.number === personToBeReplaced.id)].room})
        removePersonFromRoom(personToBeReplaced.id, currentRoom);
        addPersonToRoom(personToBeReplaced.id, personToBeReplaced.ownRoom);
        addPersonToRoom(person, targetLocation);
    } else {
        if (!checkRoomAvailability(targetLocation)) {
            return;
        }
        if (previousLocation < 13 || previousLocation == "1a" || previousLocation == "1b") {
            roomSlotPos = houseMidgaard.findIndex(e => e.room === previousLocation);
            previousRoom = houseMidgaard[roomSlotPos];
        } else if (previousLocation < 27) {
            roomSlotPos = houseAsgaard.findIndex(e => e.room === previousLocation);
            previousRoom = houseAsgaard[roomSlotPos];
        } else if (previousLocation < 40) {
            roomSlotPos = houseUdgaard.findIndex(e => e.room === targetLocation);
            previousRoom = houseUdgaard[roomSlotPos];
        } else if (previousLocation < 46) {
            roomSlotPos = houseValhal.findIndex(e => e.room === targetLocation);
            previousRoom = houseValhal[roomSlotPos];
        }
        removePersonFromRoom(person, previousRoom);
        addPersonToRoom(person, targetLocation);
    }
}

//Checks if a person is an orginal member of a room
function originalMember(person, room) {
    //Get their index position
    personPosition = displayName.findIndex(e => e.number === person);
    //Check if the room entered is equal to their original room
    if (room === displayName[personPosition].room) {
        return true;
    } else {
        return false;
    }
}

//Check if a room is available, if it is, return true
function checkRoomAvailability(room) {
    //Check what house - then find what room the person lives in
    if (room < 13 || room == "1a" || room == "1b") {
        //Find the room position in the array
        roomPosition = houseMidgaard.findIndex(e => e.room === room);
        //Find the amount of people in the room
        roomAmount = Object.keys(houseMidgaard[roomPosition]).length-3;
        //Find out how many people can be assaigned to the room, by taking the space value and adding the amount of extra people allowed
        allowedAmount = houseMidgaard[roomPosition].space+allowedExtraValue;
    } else if (room < 27) {
        //Repeat the same for the other houses
        roomPosition = houseAsgaard.findIndex(e => e.room === room);
        roomAmount = Object.keys(houseAsgaard[roomPosition]).length-3;
        allowedAmount = houseMidgaard[roomPosition].space+allowedExtraValue;
    } else if (room < 40) {
        //Repeat the same for the other houses
        roomPosition = houseUdgaard.findIndex(e => e.room === room);
        roomAmount = Object.keys(houseUdgaard[roomPosition]).length-3;
        allowedAmount = houseMidgaard[roomPosition].space+allowedExtraValue;
    } else if (room < 46) {
        //Repeat the same for the other houses
        roomPosition = houseValhal.findIndex(e => e.room === room);
        roomAmount = Object.keys(houseValhal[roomPosition]).length-3;
        allowedAmount = houseMidgaard[roomPosition].space+allowedExtraValue;
    }
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
        for (var i = 0; i < houseMidgaard.length; i++) {
            var roomPos = i;
            var roomContent = houseMidgaard[roomPos];
            if (Object.values(roomContent).includes(id, 1)) {
                return roomContent;
            }
        }
        for (var i = 0; i < houseAsgaard.length; i++) {
            var roomPos = i;
            var roomContent = houseAsgaard[roomPos];
            if (Object.values(roomContent).includes(id, 1)) {
                return roomContent;
            }
        }
        for (var i = 0; i < houseUdgaard.length; i++) {
            var roomPos = i;
            var roomContent = houseUdgaard[roomPos];
            if (Object.values(roomContent).includes(id, 1)) {
                return roomContent;
            }
        }
        for (var i = 0; i < houseValhal.length; i++) {
            var roomPos = i;
            var roomContent = houseValhal[roomPos];
            if (Object.values(roomContent).includes(id, 1)) {
                return roomContent;
            }
        }
        return false;
    } else {
        var roomObj = e => e.room === room;
        var roomPos = 0;
        var roomContent;
        if (room < 13 || room == "1a" || room == "1b") {
            if (room === 0) {
                room = "1a";
            } else if (room ==1) {
                room = "1b";
            }
            roomPos = houseMidgaard.findIndex(roomObj);
            roomContent = houseMidgaard[roomPos];
        } else if (room < 27) {
            roomPos = houseAsgaard.findIndex(roomObj);
            roomContent = houseAsgaard[roomPos];
        } else if (room < 40) {
            roomPos = houseUdgaard.findIndex(roomObj);
            roomContent = houseUdgaard[roomPos];
        } else if (room < 46) {
            roomPos = houseValhal.findIndex(roomObj);
            roomContent = houseValhal[roomPos];
        }
        try {
            return Object.values(roomContent).includes(id, 1);
        } catch(err) {
            return false;
        }
    }
}

//Adds a person to the room specified
function addPersonToRoom(person, room) {
    //Check if the person is in a room, if so remove them from their previous room.
    if (personInRoom(person) !== false) {
        relocate(person, room, displayName[displayName.findIndex(e => e.number === personToBeReplaced.id)], false);
        return;
    }
    //Check what house to add to
    if (room < 13 || room == "1a" || room == "1b") {
        //Set the room position to the index of the room
        roomPosition = houseMidgaard.findIndex(e => e.room === room);
        //Grab the current profile of the room
        var currentProfile = Object.assign({}, houseMidgaard[roomPosition]);
        //Find out what slot the person should be added to
        var slotPos = "Slot" + (Object.keys(houseMidgaard[roomPosition]).length - 2);
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
            const itemIndex = houseMidgaard.findIndex(o => o.room === element.room);
            if(itemIndex > -1) {
                houseMidgaard[itemIndex] = element;
            } else {
                houseMidgaard = houseMidgaard.push(element);
            }
        });
    } else if (room < 27) {
        //Repeat same code for the other houses
        roomPosition = houseAsgaard.findIndex(e => e.room === room);
        var currentProfile = houseAsgaard[roomPosition];
        var slotPos = "Slot" + (Object.keys(houseAsgaard[roomPosition]).length - 2);
        var addedContent = {
            [slotPos]:person
        }
        Object.assign(currentProfile, addedContent);
        
        var profile = [];
        profile.push(currentProfile);

        profile.forEach(element => {
            const itemIndex = houseAsgaard.findIndex(o => o.room === element.room);
            if(itemIndex > -1) {
                houseAsgaard[itemIndex] = element;
            } else {
                houseAsgaard = houseAsgaard.push(element);
            }
        });
    } else if (room < 40) {
        //Repeat same code for the other houses
        roomPosition = houseUdgaard.findIndex(e => e.room === room);
        var currentProfile = houseUdgaard[roomPosition];
        var slotPos = "Slot" + (Object.keys(houseUdgaard[roomPosition]).length - 2);
        var addedContent = {
            [slotPos]:person
        }
        Object.assign(currentProfile, addedContent);
        
        var profile = [];
        profile.push(currentProfile);

        profile.forEach(element => {
            const itemIndex = houseUdgaard.findIndex(o => o.room === element.room);
            if(itemIndex > -1) {
                houseUdgaard[itemIndex] = element;
            } else {
                houseUdgaard = houseUdgaard.push(element);
            }
        });
    } else if (room < 46) {
        //Repeat same code for the other houses
        roomPosition = houseValhal.findIndex(e => e.room === room);
        var currentProfile = houseValhal[roomPosition];
        var slotPos = "Slot" + (Object.keys(houseValhal[roomPosition]).length - 2);
        var addedContent = {
            [slotPos]:person
        }
        Object.assign(currentProfile, addedContent);
        
        var profile = [];
        profile.push(currentProfile);

        profile.forEach(element => {
            const itemIndex = houseValhal.findIndex(o => o.room === element.room);
            if(itemIndex > -1) {
                houseValhal[itemIndex] = element;
            } else {
                houseValhal = houseValhal.push(element);
            }
        });
    }
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
            var slot = "slot" + (i + 1 - minusVal);
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

    //Add the room to the correct house
    if (roomNumber < 13 || roomNumber == "1a" || roomNumber == "1b") {
        //Standard code to add object to array / replace existing object in array
        profile.forEach(element => {
            const itemIndex = houseMidgaard.findIndex(o => o.room === element.room);
            if(itemIndex > -1) {
                houseMidgaard[itemIndex] = element;
            } else {
                houseMidgaard = houseMidgaard.push(element);
            }
        });
    } else if (roomNumber < 27) {
        //Standard code to add object to array / replace existing object in array
        profile.forEach(element => {
            const itemIndex = houseAsgaard.findIndex(o => o.room === element.room);
            if(itemIndex > -1) {
                houseAsgaard[itemIndex] = element;
            } else {
                houseAsgaard = houseAsgaard.push(element);
            }
        });
    } else if (roomNumber < 40) {
        //Standard code to add object to array / replace existing object in array
        profile.forEach(element => {
            const itemIndex = houseUdgaard.findIndex(o => o.room === element.room);
            if(itemIndex > -1) {
                houseUdgaard[itemIndex] = element;
            } else {
                houseUdgaard = houseUdgaard.push(element);
            }
        });
    } else if (roomNumber < 46) {
        //Standard code to add object to array / replace existing object in array
        profile.forEach(element => {
            const itemIndex = houseValhal.findIndex(o => o.room === element.room);
            if(itemIndex > -1) {
                houseValhal[itemIndex] = element;
            } else {
                houseValhal = houseValhal.push(element);
            }
        });
    }
}

function selectRoom(setRoom) {
    //Grabs the name text itself from the person selected
    var currentName = e => e.name === document.getElementById("replaceableText").textContent;
    //Finds out what number in the array the person is
    namePosition = displayName.findIndex(currentName);
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
            addPersonToRoom(personSelected, setRoom);
            updateDisplayedRoom("pers-" + namePosition, setRoom);
        } else {
            closePopup();
            showAlert("Valgt værelse er fuldt");
            return false;
        }
    } else if (selectedHouse == "Asgaard") {
        if (checkRoomAvailability(setRoom + 14) == true) {
            addPersonToRoom(personSelected, setRoom + 14);
            updateDisplayedRoom("pers-" + namePosition, setRoom + 14);
        } else {
            closePopup();
            showAlert("Valgt værelse er fuldt");
            return false;
        }
    } else if (selectedHouse == "Udgaard") {
        if (checkRoomAvailability(setRoom + 27) == true) {
            addPersonToRoom(personSelected, setRoom + 27);
            updateDisplayedRoom("pers-" + namePosition, setRoom + 27);
        } else {
            closePopup();
            showAlert("Valgt værelse er fuldt");
            return false;
        }
    } else if (selectedHouse == "Valhal") {
        if (checkRoomAvailability(setRoom + 40) == true) {
            addPersonToRoom(personSelected, setRoom + 40);
            updateDisplayedRoom("pers-" + namePosition, setRoom + 40);
        } else {
            closePopup();
            showAlert("Valgt værelse er fuldt");
            return false;
        }
    }
    //Define the dummy profile to be added the displayName array
    var profile = [{
        //Finds the details and adds them to the dummy profile
        number: displayName[namePosition].number,
        name: displayName[namePosition].name,
        img: displayName[namePosition].img,
        room: displayName[namePosition].room,
        choice: "andet vaerelse"
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
    currentPerson.classList.toggle("Ikke-Valgt");
    currentPerson.classList.toggle("Andet");
    removeTag(currentPerson, "Eget");
    closePopup();
    countData();
}

//Grays out the room button
function grayOutButton(buttonNumber, param) {
    var button = document.getElementById("btn-" + buttonNumber )
    if (param && !button.classList.contains("not-available")) {
        button.classList.toggle("not-available");
    } else if (!param && button.classList.contains("not-available")) {
        button.classList.toggle("not-available");
    }
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
        for (var i = 0; i < houseAsgaard.length; i++) {
            document.getElementById("btn-" + i ).innerHTML = houseAsgaard[i].room;
            //Check if the room is full, if so change the color.
            if (!checkRoomAvailability(i + 14)) {
                grayOutButton(i, true);
            } else {
                grayOutButton(i, false);
            }
            //Check if the person is already assaigned to the room.
            if (personInRoom(personSelected, i + 14)) {
                grayOutButton(i, true);
            } else {
                grayOutButton(i, false);
            }
        }
    } else if (house == "Midgård") {
        selectedHouse = "Midgaard";
        for (var i = 0; i < houseMidgaard.length; i++) {
            document.getElementById("btn-" + i ).innerHTML = houseMidgaard[i].room;
            if (i == 0) {
                var n = "1a";
            } else if (i == 1) {
                var n = "1b";
            } else {
                var n = i;
            }
            if (!checkRoomAvailability(n)) {
                grayOutButton(i, true);
            } else {
                grayOutButton(i, false);
            }
            if (personInRoom(personSelected, i)) {
                grayOutButton(i, true);
            } else {
                grayOutButton(i, false);
            }
        }
    } else if (house == "Udgård") {
        selectedHouse = "Udgaard";
        for (var i = 0; i < houseUdgaard.length; i++) {
            document.getElementById("btn-" + i ).innerHTML = houseUdgaard[i].room;
            if (!checkRoomAvailability(i + 27)) {
                grayOutButton(i, true);
            } else {
                grayOutButton(i, false);
            }
            if (personInRoom(personSelected, i + 27)) {
                grayOutButton(i, true);
            } else {
                grayOutButton(i, false);
            }
        }
    } else if (house == "Valhal") {
        selectedHouse = "Valhal";
        //Removes the extra buttons because there are less rooms
        roomButtons.classList.toggle("small");
        smallButtons = true;
        for (var i = 0; i < houseValhal.length; i++) {
            document.getElementById("btn-" + i ).innerHTML = houseValhal[i].room;
            if (!checkRoomAvailability(i + 40)) {
                grayOutButton(i, true);
            } else {
                grayOutButton(i, false);
            }
            if (personInRoom(personSelected, i + 40)) {
                grayOutButton(i, true);
            } else {
                grayOutButton(i, false);
            }
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

//
function updateDisplayedRoom(personId, room) {
    var parentElement = document.getElementById(personId);
    var childElement = parentElement.children[2];
    var replaceText = childElement.children[1];
    replaceText.innerHTML = room;
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
            mainContainer.insertAdjacentHTML("beforeend",'<div class="image-container Ikke-Valgt ' + displayName[i].name.charAt(0) + '" id="pers-' + i + '" onclick="openPopup('+ i +')">' + '<img src="' + displayName[i].img + '" class="image"> <p class="name-text">' + displayName[i].name + '</p> <div class="room-overlay"><p class="overlay-text overlay-static-text">Værelse</p> <p class="overlay-text overlay-replace-text">xx</p></div> </div>',);
        }
    }
    //Count the data
    countData();
    //Close the alert once the window is loaded
    showAlert(" ", "Close");

    addPersonToRoom()
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