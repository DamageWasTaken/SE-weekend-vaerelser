// Data Converter: https://shancarter.github.io/mr-data-converter/

//Declaring global time varibles
const d = new Date();
const checkTime = 23;

//Import the student data
console.log(data);
var studentList = data.map((x) => x)
console.log(studentList)

//VALUE TO CHANGE ALLOWED EXTRA AMOUNT IN EACH ROOM
const allowedExtraValue = 1;

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
    {room:12,sex:"f",space:3},
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
    {room:26,sex:"f",space:3},
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
    {room:39,sex:"f",space:3},
    {room:40,sex:"f",space:3},
    {room:41,sex:"m",space:3},
    {room:42,sex:"m",space:3},
    {room:43,sex:"f",space:3},
    {room:44,sex:"f",space:3},
    {room:45,sex:"m",space:3}
]

//List of all profiles to be rendered

/*var studentList = [
{number:133,name:"Adelina Høst Johnsen",img:"viggo-billeder/A/Adelina.jpg",room:26,choice:"NAN", sex:"f"},
{number:7,name:"Albert Damsgaard Grønnerup",img:"viggo-billeder/A/Albert.jpg",room:10,choice:"NAN", sex:"m"},
{number:81,name:"Alberte Holmgaard Grønfeldt",img:"viggo-billeder/A/Alberte.jpg",room:4,choice:"NAN", sex:"f"},
{number:14,name:"Alexander Damgård",img:"viggo-billeder/A/Alexander.jpg",room:16,choice:"NAN", sex:"m"},
{number:82,name:"Alma Frøhlich Hougaard",img:"viggo-billeder/A/Alma.jpg",room:12,choice:"NAN", sex:"f"},
{number:73,name:"Amalie Korfitz Nielsen",img:"viggo-billeder/A/Amalie.jpg",room:17,choice:"NAN", sex:"f"},
{number:97,name:"Andrea Bjørnskov Bergholt",img:"viggo-billeder/A/Andrea 1.jpg",room:14,choice:"NAN", sex:"f"},
{number:103,name:"Andrea Nørup Andersen",img:"viggo-billeder/A/Andrea 2.jpg",room:8,choice:"NAN", sex:"f"},
{number:139,name:"Angelina Christensen Lyberth",img:"viggo-billeder/A/Angelina.jpg",room:37,choice:"NAN", sex:"f"},
{number:41,name:"Anne Wilstrup Holst",img:"viggo-billeder/A/Anne.jpg",room:14,choice:"NAN", sex:"f"},
{number:44,name:"Anton Bissø Stausholm",img:"viggo-billeder/A/Anton 1.jpg",room:20,choice:"NAN", sex:"m"},
{number:65,name:"Anton Haukrog Møller",img:"viggo-billeder/A/Anton 2.jpg",room:6,choice:"NAN", sex:"m"},
{number:134,name:"Anton Hermansen",img:"viggo-billeder/A/Anton 3.jpg",room:41,choice:"NAN", sex:"m"},
{number:6,name:"Astrid Marie Kirkegaard",img:"viggo-billeder/A/Astrid 2.jpg",room:"1b",choice:"NAN", sex:"f"},
{number:15,name:"Axel Christian Skovgaard Nielsen",img:"viggo-billeder/A/Axel.jpg",room:36,choice:"NAN", sex:"m"},
{number:131,name:"Baylee Halfdan Søgård Fink",img:"viggo-billeder/B/Baylee.jpg",room:2,choice:"NAN", sex:"m"},
{number:27,name:"Benjamin Samuel Nielsen Nicolajsen",img:"viggo-billeder/B/Benjamin.jpg",room:35,choice:"NAN", sex:"m"},
{number:98,name:"Camilla Lehmann Jessen",img:"viggo-billeder/C/Camilla.jpg",room:34,choice:"NAN", sex:"f"},
{number:127,name:"Camille Staberg Simonsen",img:"viggo-billeder/C/Camille.jpg",room:30,choice:"NAN", sex:"f"},
{number:52,name:"Carolina Aagaard",img:"viggo-billeder/C/Carolina.jpg",room:4,choice:"NAN", sex:"f"},
{number:47,name:"Caroline Flintholm Juelsgaard",img:"viggo-billeder/C/Caroline 1.jpg",room:25,choice:"NAN", sex:"f"},
{number:45,name:"Caroline Sax Riggelsen",img:"viggo-billeder/C/Caroline 2.jpg",room:30,choice:"NAN", sex:"f"},
{number:60,name:"Cecilie Damsgaard Paulsen",img:"viggo-billeder/C/Cecilie 1.jpg",room:39,choice:"NAN", sex:"f"},
{number:108,name:"Cecilie Margrethe Christiansen",img:"viggo-billeder/C/Cecilie 3.jpg",room:26,choice:"NAN", sex:"f"},
{number:77,name:"Dicte Johanne Schultz",img:"viggo-billeder/D/Dicte.jpg",room:5,choice:"NAN", sex:"f"},
{number:136,name:"Ella Zwergius Moreno",img:"viggo-billeder/E/Ella.jpg",room:37,choice:"NAN", sex:"f"},
{number:3,name:"Emil Støttrup",img:"viggo-billeder/E/Emil.jpg",room:42,choice:"NAN", sex:"m"},
{number:113,name:"Emilie Christensen",img:"viggo-billeder/E/Emilie.jpg",room:9,choice:"NAN", sex:"f"},
{number:116,name:"Emma Lindberg Jensen",img:"viggo-billeder/E/Emma.jpg",room:5,choice:"NAN", sex:"f"},
{number:75,name:"Esben Petersen",img:"viggo-billeder/E/Esben.jpg",room:3,choice:"NAN", sex:"m"},
{number:21,name:"Eva Raahauge Muntenjon",img:"viggo-billeder/E/Eva.jpg",room:14,choice:"NAN", sex:"f"},
{number:96,name:"Evelina Spelmane",img:"viggo-billeder/E/Evelina.jpg",room:8,choice:"NAN", sex:"f"},
{number:78,name:"Faye Randris Rowlands",img:"viggo-billeder/F/Faye.jpg",room:38,choice:"NAN", sex:"f"},
{number:8,name:"Frederik Haugaard Brunsgaard",img:"viggo-billeder/F/Frederik 1.jpg",room:27,choice:"NAN", sex:"m"},
{number:18,name:"Frederik Højmark Pedersen",img:"viggo-billeder/F/Frederik 2.jpg",room:42,choice:"NAN", sex:"m"},
{number:111,name:"Frederik William Dirksen",img:"viggo-billeder/F/Frederik 3.jpg",room:45,choice:"NAN", sex:"m"},
{number:110,name:"Freja Michelle Andersen",img:"viggo-billeder/F/Freja.jpg",room:21,choice:"NAN", sex:"f"},
{number:61,name:"Frida Friis Thomsen",img:"viggo-billeder/F/Frida 1.jpg",room:17,choice:"NAN", sex:"f"},
{number:138,name:"Frida Peters Lassen",img:"viggo-billeder/F/Frida 2.jpg",room:43,choice:"NAN", sex:"f"},
{number:64,name:"Frida Søgaard Thomsen",img:"viggo-billeder/F/Frida 3.jpg",room:21,choice:"NAN", sex:"f"},
{number:63,name:"Gry Lindholm Tollgaard",img:"viggo-billeder/G/Gry.jpg",room:25,choice:"NAN", sex:"f"},
{number:20,name:"Gunna Rump Vejlø",img:"viggo-billeder/G/Gunna.jpg",room:37,choice:"NAN", sex:"f"},
{number:99,name:"Halfdan Jacobsen Kirkegaard",img:"viggo-billeder/H/Halfdan.jpg",room:10,choice:"NAN", sex:"m"},
{number:36,name:"Hannibal Ingeberg",img:"viggo-billeder/H/Hanibal.jpg",room:24,choice:"NAN", sex:"m"},
{number:67,name:"Harald Brøcker",img:"viggo-billeder/H/Harald.jpg",room:31,choice:"NAN", sex:"m"},
{number:56,name:"Hjalte Wittek Sørensen",img:"viggo-billeder/H/Hjalte.jpg",room:32,choice:"NAN", sex:"m"},
{number:34,name:"Hugo Qvist Tøpholm",img:"viggo-billeder/H/Hugo.jpg",room:11,choice:"NAN", sex:"m"},
{number:92,name:"Ingeborg Bruun Hinrichsen",img:"viggo-billeder/I/Ingeborg.jpg",room:8,choice:"NAN", sex:"f"},
{number:112,name:"Isabella Kirstine Neuberg Rasmussen",img:"viggo-billeder/I/Isabella.jpg",room:"1a",choice:"NAN", sex:"f"},
{number:76,name:"Jens Møller Martin",img:"viggo-billeder/J/Jens.jpg",room:3,choice:"NAN", sex:"m"},
{number:120,name:"Jeppe Holm Jensen",img:"viggo-billeder/J/Jeppe.jpg",room:19,choice:"NAN", sex:"m"},
{number:32,name:"Johan Lading Katballe",img:"viggo-billeder/J/Johan 1.jpg",room:7,choice:"NAN", sex:"m"},
{number:43,name:"Johan Stenkil Lajer",img:"viggo-billeder/J/Johan 2.jpg",room:15,choice:"NAN", sex:"m"},
{number:16,name:"Jonas Rotne",img:"viggo-billeder/J/Jonas 1.jpg",room:16,choice:"NAN", sex:"m"},
{number:128,name:"Jonas Staghøj Markussen",img:"viggo-billeder/J/Jonas 2.jpg",room:28,choice:"NAN", sex:"m"},
{number:88,name:"Julie Christensen Venø",img:"viggo-billeder/J/Julie 1.jpg",room:44,choice:"NAN", sex:"f"},
{number:54,name:"Julie Lykke Lolck",img:"viggo-billeder/J/Julie 2.jpg",room:40,choice:"NAN", sex:"f"},
{number:1,name:"Karla Kobberø",img:"viggo-billeder/K/Karla 1.jpg",room:33,choice:"NAN", sex:"f"},
{number:53,name:"Karla Weimar Schousen",img:"viggo-billeder/K/Karla 2.jpg",room:22,choice:"NAN", sex:"f"},
{number:69,name:"Karoline Pagaard Christensen",img:"viggo-billeder/K/Karoline.jpg",room:22,choice:"NAN", sex:"f"},
{number:93,name:"Katja Nygaard-Larsen",img:"viggo-billeder/K/Katja.jpg",room:18,choice:"NAN", sex:"f"},
{number:94,name:"Katrine Brylle",img:"viggo-billeder/K/Katrine.jpg",room:17,choice:"NAN", sex:"f"},
{number:124,name:"Kirstine Ammiztbøll Christensen",img:"viggo-billeder/K/Kirstine.jpg",room:29,choice:"NAN", sex:"f"},
{number:91,name:"Kristoffer Rehhoff-Nør",img:"viggo-billeder/K/Kristoffer.jpg",room:27,choice:"NAN", sex:"m"},
{number:68,name:"Laura Vinther Jepsen",img:"viggo-billeder/L/Laura.jpg",room:44,choice:"NAN", sex:"f"},
{number:72,name:"Lina Høft Homilius",img:"viggo-billeder/L/Lina.jpg",room:18,choice:"NAN", sex:"f"},
{number:105,name:"Liva Marie Mikel Schjelde",img:"viggo-billeder/L/Liva.jpg",room:4,choice:"NAN", sex:"f"},
{number:38,name:"Lucas Steele Sørensen",img:"viggo-billeder/L/Lucas 1.jpg",room:28,choice:"NAN", sex:"m"},
{number:37,name:"Lucas Wittrup Jensen",img:"viggo-billeder/L/Lucas 2.jpg",room:10,choice:"NAN", sex:"m"},
{number:101,name:"Lykke Pagaard",img:"viggo-billeder/L/Lykke.jpg",room:9,choice:"NAN", sex:"f"},
{number:58,name:"Magnus Beyer Bach Mortensen",img:"viggo-billeder/M/Magnus.jpg",room:23,choice:"NAN", sex:"m"},
{number:84,name:"Malte Mervild Greve",img:"viggo-billeder/M/Malte 1.jpg",room:28,choice:"NAN", sex:"m"},
{number:79,name:"Malthe Drud Vester Palle",img:"viggo-billeder/M/Malthe 2.jpg",room:6,choice:"NAN", sex:"m"},
{number:135,name:"Malthe Gustavussen",img:"viggo-billeder/M/Malthe 3.jpg",room:35,choice:"NAN", sex:"m"},
{number:22,name:"Marcus Thorup",img:"viggo-billeder/M/Marcus.jpg",room:45,choice:"NAN", sex:"m"},
{number:46,name:"Maria Løvlund Mandsberg",img:"viggo-billeder/M/Maria 1.jpg",room:29,choice:"NAN", sex:"f"},
{number:83,name:"Maria West Jørgensen",img:"viggo-billeder/M/Maria 2.jpg",room:40,choice:"NAN", sex:"f"},
{number:117,name:"Marie Hebsgaard Offersen",img:"viggo-billeder/M/Marie 3.jpg",room:34,choice:"NAN", sex:"f"},
{number:106,name:"Marius Ehlert Degn Larsen",img:"viggo-billeder/M/Marius 1.jpg",room:31,choice:"NAN", sex:"m"},
{number:87,name:"Marius Kjeld Finnerup",img:"viggo-billeder/M/Marius 2.jpg",room:23,choice:"NAN", sex:"m"},
{number:107,name:"Marius Lykke Hansen",img:"viggo-billeder/M/Marius 3.jpg",room:22,choice:"NAN", sex:"m"},
{number:40,name:"Mary Fischer Sloth",img:"viggo-billeder/M/Mary.jpg",room:18,choice:"NAN", sex:"f"},
{number:66,name:"Mathias Bach Sølvbjerg Dolleris",img:"viggo-billeder/M/Mathias.jpg",room:15,choice:"NAN", sex:"m"},
{number:85,name:"Mathilde Dræborg Evind",img:"viggo-billeder/M/Mathilde.jpg",room:5,choice:"NAN", sex:"f"},
{number:130,name:"Merle Toft",img:"viggo-billeder/M/Merle.jpg",room:40,choice:"NAN", sex:"f"},
{number:10,name:"Mette Kulby Rick",img:"viggo-billeder/M/Mette.jpg",room:44,choice:"NAN", sex:"f"},
{number:71,name:"Mille Sandholdt",img:"viggo-billeder/M/Mille 1.jpg",room:43,choice:"NAN", sex:"f"},
{number:25,name:"Mille Schultz Bach",img:"viggo-billeder/M/Mille 2.jpg",room:38,choice:"NAN", sex:"f"},
{number:129,name:"Mille Sophia Damsø",img:"viggo-billeder/M/Mille 3.jpg",room:43,choice:"NAN", sex:"f"},
{number:86,name:"Mina Skjoldby Foss",img:"viggo-billeder/M/Mina.jpg",room:30,choice:"NAN", sex:"f"},
{number:132,name:"Nagi Nishioka",img:"viggo-billeder/N/Nagi.jpg",room:19,choice:"NAN", sex:"m"},
{number:114,name:"Nanna Lerche Freudendal",img:"viggo-billeder/N/Nanna.jpg",room:39,choice:"NAN", sex:"f"},
{number:123,name:"Nellie Berg Pedersen",img:"viggo-billeder/N/Nellie.jpg",room:12,choice:"NAN", sex:"f"},
{number:42,name:"Noah Bue Pilgaard",img:"viggo-billeder/N/Noah 1.jpg",room:36,choice:"NAN", sex:"m"},
{number:12,name:"Noah Grøndahl Lassen",img:"viggo-billeder/N/Noah 2.jpg",room:15,choice:"NAN", sex:"m"},
{number:24,name:"Noah Aarhus Petersen",img:"viggo-billeder/N/Noah 3.jpg",room:41,choice:"NAN", sex:"m"},
{number:102,name:"Ole Carl Risak Schou",img:"viggo-billeder/O/Lego.jpg",room:20,choice:"NAN", sex:"m"},
{number:9,name:"Oliver Gaba Lylover",img:"viggo-billeder/O/Oliver 1.jpg",room:16,choice:"NAN", sex:"m"},
{number:51,name:"Oliver Scott Walters",img:"viggo-billeder/O/Oliver 2.jpg",room:27,choice:"NAN", sex:"m"},
{number:62,name:"Peter Bille Røhling",img:"viggo-billeder/P/Peter.jpg",room:6,choice:"NAN", sex:"m"},
{number:35,name:"Philip Hilstrøm Sørensen",img:"viggo-billeder/P/Philip.jpg",room:19,choice:"NAN", sex:"m"},
{number:80,name:"Rasmus Benjamin Jørgensen",img:"viggo-billeder/R/Rasmus 1.jpg",room:15,choice:"NAN", sex:"m"},
{number:31,name:"Rasmus Kirkeskov Hansen",img:"viggo-billeder/R/Rasmus 2.jpg",room:45,choice:"NAN", sex:"m"},
{number:11,name:"Rasmus Kyhn Boisen",img:"viggo-billeder/R/Rasmus 3.jpg",room:36,choice:"NAN", sex:"m"},
{number:89,name:"Rune Horsbøll Møller",img:"viggo-billeder/R/Rune.jpg",room:3,choice:"NAN", sex:"m"},
{number:90,name:"Sara Møller Risdahl Knudsen",img:"viggo-billeder/S/Sara.jpg",room:9,choice:"NAN", sex:"f"},
{number:4,name:"Sebastian Bisgaard",img:"viggo-billeder/S/Sebastian 1.jpg",room:24,choice:"NAN", sex:"m"},
{number:122,name:"Sebastian Skiby Esbjerg",img:"viggo-billeder/S/Sebastian 2.jpg",room:35,choice:"NAN", sex:"m"},
{number:115,name:"Sebastian Valdemar Sax Sielemann",img:"viggo-billeder/S/Sebastian 3.jpg",room:31,choice:"NAN", sex:"m"},
{number:50,name:"Silje Andrea Palmelund Lindemann",img:"viggo-billeder/S/Silje.jpg",room:33,choice:"NAN", sex:"f"},
{number:30,name:"Simon Wonsild Krogsgaard Andersen",img:"viggo-billeder/S/Simon.jpg",room:7,choice:"NAN", sex:"m"},
{number:95,name:"Sofie Fynbo Christoffersen",img:"viggo-billeder/S/Sofie.jpg",room:12,choice:"NAN", sex:"f"},
{number:49,name:"Sofus Czeloth Steenskov",img:"viggo-billeder/S/Sofus.jpg",room:42,choice:"NAN", sex:"m"},
{number:5,name:"Svend Nielsen Korsholm",img:"viggo-billeder/S/Svend.jpg",room:28,choice:"NAN", sex:"m"},
{number:109,name:"Tea Bendixen",img:"viggo-billeder/T/Tea.jpg",room:"1b",choice:"NAN", sex:"f"},
{number:17,name:"Thea Dalsgaard Kallesø",img:"viggo-billeder/T/Thea.jpg",room:33,choice:"NAN", sex:"f"},
{number:29,name:"Tobias Grønskov Hansen",img:"viggo-billeder/T/Tobias 1.jpg",room:24,choice:"NAN", sex:"m"},
{number:28,name:"Tobias Høgh Veis",img:"viggo-billeder/T/Tobias 2.jpg",room:2,choice:"NAN", sex:"m"},
{number:55,name:"Torbjørn Hornemann Nielsen",img:"viggo-billeder/T/Torbjørn.jpg",room:7,choice:"NAN", sex:"m"},
{number:19,name:"Tristian Alexander Hald",img:"viggo-billeder/T/Tristian.jpg",room:11,choice:"NAN", sex:"m"},
{number:33,name:"Troels Kragerup Lundin",img:"viggo-billeder/T/Troles.jpg",room:32,choice:"NAN", sex:"m"},
{number:2,name:"Victor Albert Christensen",img:"viggo-billeder/V/Victor.jpg",room:32,choice:"NAN", sex:"m"},
{number:121,name:"Victoria Roskvist",img:"viggo-billeder/V/Victoria.jpg",room:"1a",choice:"NAN", sex:"f"},
{number:48,name:"Vigga Burmeister Clausen",img:"viggo-billeder/V/Vigga.jpg",room:21,choice:"NAN", sex:"f"},
{number:39,name:"Vilma Tolstrup Melgaard",img:"viggo-billeder/V/Vilma.jpg",room:26,choice:"NAN", sex:"f"},
{number:13,name:"Zenia Karen Van Der Plas",img:"viggo-billeder/Z/Zenia.jpg",room:22,choice:"NAN", sex:"f"}
]*/

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
            //Define the dummy profile to be added the studentList array
            var profile = [{
                //Finds the details and adds them to the dummy profile
                number: studentList[namePosition].number,
                name: studentList[namePosition].name,
                img: studentList[namePosition].img,
                room: studentList[namePosition].room,
                choice: "eget vaerelse"
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
            //Removes and adds a class to be able to select person by group
            addTag(currentPerson, "Eget");
            removeTag(currentPerson, "Andet");
            removeTag(currentPerson, "Ikke-Valgt");
            
            //Call the data to be counted and close the popup.
            countData();
            closePopup();
            addPersonToRoom(studentList[namePosition].number, studentList[namePosition].room);
            updateDisplayedRoom("pers-" + namePosition, studentList[namePosition].room);
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
        roomLength = Object.keys(rooms[roomSlotPos]).length
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
                Object.assign(personToBeReplaced, {id: memberList[i]})
                //Stop the loop
                break
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
    updateDisplayedRoom("pers-" + namePos, room);
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
        for (var i = 13; i < 26; i++) {
            var minusI = i - 13;
            document.getElementById("btn-" + minusI).innerHTML = rooms[i].room;
            if (!checkRoomAvailability(i + 1)) {
                grayOutButton(minusI, true);
            } else {
                grayOutButton(minusI, false);
            }
            if (personInRoom(personSelected, minusI)) {
                grayOutButton(minusI, true);
            } else {
                grayOutButton(minusI, false);
            }
        }
    } else if (house == "Midgård") {
        selectedHouse = "Midgaard";
        for (var i = 0; i < 13; i++) {
            document.getElementById("btn-" + i ).innerHTML = rooms[i].room;
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
        for (var i = 26; i < 39; i++) {
            var minusI = i - 26;
            document.getElementById("btn-" + minusI).innerHTML = rooms[i].room;
            if (!checkRoomAvailability(i)) {
                grayOutButton(minusI, true);
            } else {
                grayOutButton(minusI, false);
            }
            if (personInRoom(personSelected, minusI)) {
                grayOutButton(minusI, true);
            } else {
                grayOutButton(minusI, false);
            }
        }
    } else if (house == "Valhal") {
        selectedHouse = "Valhal";
        //Removes the extra buttons because there are less rooms
        roomButtons.classList.toggle("small");
        smallButtons = true;
        for (var i = 39; i < 45; i++) {
            var minusI = i - 39;
            document.getElementById("btn-" + minusI).innerHTML = rooms[i].room;
            if (!checkRoomAvailability(i)) {
                grayOutButton(minusI, true);
            } else {
                grayOutButton(minusI, false);
            }
            if (personInRoom(personSelected, minusI)) {
                grayOutButton(minusI, true);
            } else {
                grayOutButton(minusI, false);
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

function addTag(element, tag) {
    if (!element.classList.contains(tag)) {
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