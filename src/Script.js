// Data Converter: https://shancarter.github.io/mr-data-converter/


const SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.photos.readonly';
const CLIENT_ID = '294879549763-08fuvah7r95vd0sbbgrrcnqnsg7ju19u.apps.googleusercontent.com';
const API_KEY = 'AIzaSyBv_uj-7bG-NUu4APg7rr8-OqBl0-mhCh0';
const APP_ID = 'weekend-vaerelser';
//const imageFolderID = '1Whad-PIWB3BS6jLh09pBycS3ocQxVGcM';
var tokenClient;
var accessToken = null;
var pickerInited = false;
var gisInited = false;
var data = [];
var pickerRawData;
var dataReady = false;
var sameFile = false;

var imageFiles;

// ** Functions for ensuring that all apis are loaded
//Callback after api.js is loaded
function gapiLoaded() {
    gapi.load('client:picker', initializePicker);
}

//Callback after Google Identity Services are loaded
function gisLoaded() {
    tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: '', // defined later
    });
    gisInited = true;
}

//Callback after the API client is loaded. Loads the discovery doc to initialize the API.
async function initializePicker() {
    await gapi.client.load('https://www.googleapis.com/discovery/v1/apis/drive/v3/rest');
    pickerInited = true;
}
// **

//Gets the user to allow Google OAuth2 so we can get an access token
function authenticateGoogleOAuth() {
    tokenClient.callback = async (response) => {
        if (response.error !== undefined) {
            throw (response);
        }
        accessToken = response.access_token;
        var tempObject = {value: accessToken, timestamp: new Date().getTime()};
        localStorage.setItem('accesstoken', JSON.stringify(tempObject));
        console.info('Downloading data, this may take a minute');
        findFile();
    };

    if (accessToken === null) {
        // Prompt the user to select a Google Account and ask for consent to share their data
        tokenClient.requestAccessToken({prompt: 'consent'});
    } else {
        // Skip display of account chooser and consent dialog for an existing session.
        tokenClient.requestAccessToken({prompt: ''});
    }
}

//lists all the images in the viggo-bileder folder on google drive
function listImages() {
    gapi.client.drive.files.list({
        q: "name='viggo-billeder' and mimeType='application/vnd.google-apps.folder'",
        fields: 'files(id, name)',
        supportsAllDrives: true,
        includeItemsFromAllDrives: true
    }).then(function(response) {
        const folders = response.result.files
        if (folders.length > 0) {
            //Get the ID of the folder and then list the files in that folder
            const folderId = folders[0].id;
            gapi.client.drive.files.list({
                q: `'${folderId}' in parents and mimeType contains 'image/'`,
                fields: "nextPageToken, files(id, name, mimeType, thumbnailLink)",
                pageSize: 150,
                supportsAllDrives: true,
                includeItemsFromAllDrives: true
            }).then((response) => {
                //Get the files ID and send it over to be downloaded
                const filesResponse = response.result.files;
                if (filesResponse.length > 0) {
                    var files = response.result.files;
                    if (!files || files.length <= 0) {
                        console.warn('No files found.');
                        return;
                    }
                    imageFiles = files;
                    rateLimitProcessImages(data, 10 );
                    /*for (var i = 0; i < data.length; i++) {
                        data[i].img = getPicture(data[i].img);
                    }
                    console.info('Images are ready.');
                    dataReady = true;
                    */
                } else {
                    console.warn('File not found');
                }
            });
        } else {
            console.warn('Folder not found');
        }
    });
}

function rateLimitProcessImages(files, delay) {
    let i = 0;

    function processImage() {
        if (i >= files.length) {
            console.info('Images are ready.');
            dataReady = true;
            return;
        }

        files[i].img = getPicture(files[i].img);
        i++;

        setTimeout(processImage, delay);  // Add a delay between each image processing
    }

    processImage();
}

//Create and render a Picker object for searching images.
function createPicker() {
    if (!accessToken) {
        console.warn('No accessToken found, make sure to authenticate with Google OAuth. The popup window may be block.');
        return;
    }
    const view = new google.picker.DocsView(google.picker.ViewId.DOCS);
    //Only allow .csv files
    //view.setMimeTypes('text/csv');
    view.setMimeTypes("text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    view.setMode(google.picker.DocsViewMode.LIST);
    view.setParent('1fKT0WxXiN2hh3UexlJvgNROmbVtSigwe'); //The folder ID of 'weekend-filer'
    const picker = new google.picker.PickerBuilder()
        .setDeveloperKey(API_KEY)
        .setAppId(APP_ID)
        .setOAuthToken(accessToken)
        .addView(view)
        .addView(new google.picker.DocsUploadView())
        .setCallback(pickerCallback)
        .build();
    picker.setVisible(true);
}

//Callback function for when a user selects a file in the picker
async function pickerCallback(data) {
    if (data.action === google.picker.Action.PICKED) {
        const document = data[google.picker.Response.DOCUMENTS][0];
        const fileId = document[google.picker.Document.ID];
        localStorage.setItem('pickedFile',JSON.stringify(document[google.picker.Document.NAME]));
        if (fileId == localStorage.getItem('previousFile')) {
            sameFile = true;
        } else {
            //If a different file is selected compared to last time, clear prevoius data.
            localStorage.removeItem('rooms');
            localStorage.removeItem('choices');
            localStorage.removeItem('tempUsers')
            localStorage.setItem('previousFile',fileId);
        }
        if (document.mimeType !== 'text/csv') {
            const fileData = await downloadFileAsBinary(fileId);
            if (fileData) {
                handleData(fileData, document.mimeType);
            } else {
                console.error("Failed to fetch file data.");
            }
        } else {
            const res = await gapi.client.drive.files.get({
                'fileId': fileId,
                'alt': 'media',
            });
            handleData(res.body, 'text/csv');
        }
    }
}

async function downloadFileAsBinary(fileId) {
    const response = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
        headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (response.ok) {
        // Return the response as an ArrayBuffer for binary data compatibility
        return await response.arrayBuffer().then(buffer => {return buffer});
    } else {
        console.error("Error fetching file:", response.statusText);
        return null;
    }
}

//Handles the weekend file data and splits it to an array with objects
//Default handle method / mimeType is text/csv
function handleData(data, mimeType) {
    pickerRawData = data;
    switch (mimeType) {
        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
            const workbook = XLSX.read(new Uint8Array(data), { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const csvData = XLSX.utils.sheet_to_csv(workbook.Sheets[sheetName]);

            handleData(csvData, 'text/csv');
            break;
            
        default:
            var delta = 2;
            //Split the result
            var splitArray = data.split(/(?:\r?\n|(?:,)|(?:;))/gim); // |(?:;)
            //Remove the first 4 items of the array
            splitArray.splice(0,4);
            //Loop through the array where we delete every nth (delta) of the array
            
            for (var i = delta; i < splitArray.length; i += delta) {
                splitArray.splice(i,1);
            }
            for (var i = 0; i < splitArray.length; i += delta) {
                var cacheArray = [splitArray[i],splitArray[i+1]];
                weekendList.push(cacheArray.join(' '));
            }
            break;
    }
    loadDOM();
}


//Findes the Data.txt file in the config folder on Google drive
function findFile() {
    //List the files in the config folder
    gapi.client.drive.files.list({
        q: "name='config' and mimeType='application/vnd.google-apps.folder'",
        fields: 'files(id, name)',
        supportsAllDrives: true,
        includeItemsFromAllDrives: true
    }).then((response) => {
        //Check if the folder is found
        const folders = response.result.files;
        if (folders.length > 0) {
            //Get the ID of the folder and then list the files in that folder that have the name Data.txt
            const folderId = folders[0].id;
            gapi.client.drive.files.list({
                q: `'${folderId}' in parents and name='Data.txt'`,
                fields: 'files(id, name)',
                supportsAllDrives: true,
                includeItemsFromAllDrives: true
            }).then((response) => {
                //Get the files ID and send it over to be downloaded
                const files = response.result.files;
                if (files.length > 0) {
                    const fileId = files[0].id;
                    downloadFile(fileId);
                } else {
                    console.warn('File not found');
                }
            });
        } else {
            console.warn('Folder not found');
        }
    });
}

//Downloads the data file we need
function downloadFile(fileId) {
    gapi.client.drive.files.get({
        'fileId': fileId,
        'alt': 'media'
    }).then((response) => {
        const fileContent = response.body;
        //Split the huge text chunk into smaller strings.
        const temp = fileContent.toString().split('[')[1].toString().split(']')[0].toString().split(','); //
        //Combine the text together and parse them into objects.
        for (var i = 0; i < temp.length; i += 6) {    
          var cacheArray = [temp[i],temp[i+1],temp[i+2],temp[i+3],temp[i+4],temp[i+5]];
          if (i > 0) {
            cacheArray[0] = cacheArray[0].slice(2);
          }
          data.push(JSON.parse(cacheArray.join(',')));
        }
        console.info('Data is ready.')

        // After the data is ready ...
        showAlert('Vælg venlist weekend filen', 'Stick')
        distributeRooms();
        listImages();
    });
}

async function printAndUpload() {
    // Convert content to PDF
    const content = document.getElementById('print-popup');
    const options = {
        margin:       0.5,
        filename:     `${localStorage.getItem('pickedFile').split('.csv')[0]} - ${new Date().toLocaleDateString()}.pdf`,
        image:        { type: 'jpeg', quality: 0.98},
        html2canvas:  {scale:10, width:1100, height:800},
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'landscape' }
    };
    
    // Generate PDF and wait until it's fully ready
    const pdf = await html2pdf().set(options).from(content).toPdf().get('pdf');
       
    // Get the PDF data as a Blob
    const pdfBlob = pdf.output('blob');
    
    // Upload PDF to Google Drive
    uploadToDrive(pdfBlob);
}

function uploadToDrive(file) {
    const driveId = '0AAM7277rxTw5Uk9PVA';
    const folderId = '1IXtvCMYd4GFkNSu3rm2tWqDvq2_1XnEG';

    const metadata = {
        'name': `${localStorage.getItem('pickedFile').split('.csv')[0]} - ${new Date().toLocaleDateString()}.pdf`,
        'mimeType': 'application/pdf',
        'parents': folderId ? [folderId] : [],
    };

    const form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    form.append('file', file);

    fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&supportsAllDrives=true', {
        method: 'POST',
        headers: new Headers({ 'Authorization': 'Bearer ' + gapi.auth.getToken().access_token }),
        body: form
    })
    .then((res) => res.json())
    .then((data) => {
        console.info('File:'+ data.name +' uploaded successfully:');
        showAlert('Weekendliste Uploaded');
        finishPrinting();
    })
    .catch((error) => console.error('Error uploading file:', error));
  }

//Config Variables (Default values):
//checkTime
var deadLine = [22,45];
//allowedRoomAmount
var allowedExtraValue = 2;
//returnToHomeTimeout
var timeoutTime = 2;
//saveTemporaryUsers
var saveTempUsers = true;
//temporaryUserTimeout
var tempUserTimout = 48;

//Global variables:

var temporaryUsers = [];
var previousAlert = 'none';
var expandableElements;
var home;
var checkList = [];
var weekendList = [];
var backgroundImages = [
    'images/BG-1.jpg',
    'images/BG-2.jpg',
    'images/BG-3.jpg',
    'images/BG-4.jpg'
];
var bgImg = 'url(' + backgroundImages[Math.floor(Math.random() * backgroundImages.length)] + ')';


//Declaring all houses & rooms
var houses = [
];

//
var rooms = [
]

//Handling the config file
function handleConfig() {
    if (config.length > 0) {
        for (let i = 0; i < config.length; i++) {
            switch (Object.keys(config[i])[0]) {
                case 'checkTime':
                    deadLine = Object.values(config[i])[0];
                    break;
            
                case 'allowedRoomAmount':
                    allowedExtraValue = Object.values(config[i])[0];
                    break;

                case 'returnToHomeTimeout':
                    timeoutTime = Object.values(config[i])[0];
                    break;

                case 'saveTemporaryUsers':
                    saveTempUsers = Object.values(config[i])[0];
                    break;

                case 'temporaryUserTimeout':
                    tempUserTimout = Object.values(config[i])[0];
                    break;
            }
        }
    }
    if (houseLayout.length > 0 && roomLayout.length > 0) {
        for (let i = 0; i < houseLayout.length; i++) {
            houses.push({house:Object.values(houseLayout[i])[1], amountOfRooms:Object.values(houseLayout[i])[0], houseNumber:Object.values(houseLayout[i])[2], layout:Object.values(houseLayout[i])[3], members:[]});
        }
        //
        for (var i = 0; i < roomLayout.length; i++) {
            var roomNumber = roomLayout[i].roomNumber;
            var roomCapacity = roomLayout[i].capacity;
            var roomHouseGroup = roomLayout[i].houseGroup;

            if (String(roomNumber).includes('-')) {
                var startNumber = Number(roomNumber.split('-')[0]);
                var endNumber = Number(roomNumber.split('-')[1]);
                for (let x = 0; x < (endNumber-startNumber + 1); x++) {
                    rooms.push({room:startNumber + x,sex:"x",space:roomCapacity,houseGroup:roomHouseGroup});
                }
            } else {
                rooms.push({room:roomNumber,sex:"x",space:roomCapacity,houseGroup:roomHouseGroup});
            }
        }
        console.info('Config file loaded.');
    } else {
        console.error('No room or house layout, please check if the Config file is correct.');
        showAlert("CONFIG ERROR", 'Stick');
        return;
    }
    /*
    if (roomConfig.length > 0) {
        for (let i = 0; i < roomConfig.length; i++) {
            var slot = rooms.findIndex(x => x.room === roomConfig[i][0]);
            switch (roomConfig[i][1]) {
                case 'roomSpace':
                    rooms[slot].space = roomConfig[i][2];
                    break;
            
                case 'roomGender':
                    rooms[slot].sex = roomConfig[i][2];
                    break;
            }    
        }
    }
    */
}

function handleRoomLayout() {
    for (let i = 0; i < houses.length; i++) {
        var houseIndex = houses.findIndex(e => e.houseNumber === i+1);
        document.getElementById('house-button-' + i).innerText = houses[houseIndex].house;
        removeTag(document.getElementById('house-button-' + i), 'DONT-SHOW');
    }
    console.info('Room config loaded');
}

handleConfig();

//Converts the rooms to the correct sex, remains x if no-one is assaigned to the room
function distributeRooms() {
    for (let i = 0; i < rooms.length; i++) {
        var _i = i;
        if (i > 12) {
            _i = i+1;
        }
        //Allowing for manual adjustment of the room
        if (rooms[i].sex === 'x'){
            if (i === 0) {
                var index = data.findIndex(e => e.room  === "1a");
            } else if (i === 1) {
                var index = data.findIndex(e => e.room  === '1b');
            } else {
                var index = data.findIndex(e => e.room  === _i);
            }
            if (index !== -1) {
                var _sex = data[index].sex;
                rooms[i].sex = _sex;
            }
        }
    }
    console.info('Room gender distributed.')
}

window.addEventListener("keydown", checkKeyPressed, false);

document.addEventListener('touchmove', function (event) {
    if (('scale' in event) && event.scale !== 1) { event.preventDefault(); }
  }, false);

function checkKeyPressed(evt) {
    if (evt.keyCode === 69 && evt.altKey) {
        returnPeople(); // e
    }
    if (evt.keyCode === 80 && evt.altKey) {
        readyToPrint(); // p
    }
    if (evt.keyCode === 27) {
        closePrintPopup(); // esc
    }
    if (evt.keyCode === 76 && evt.altKey) {
        console.log(rooms); // l
        console.log(data);
        console.log(temporaryUsers);
    }
    if (evt.keyCode === 72 && evt.altKey) {
        helpMenu(); // h
    }
    if (evt.keyCode === 74 && evt.altKey) {
        updateStoredData(); // j
    }
    if (evt.keyCode === 67 && evt.altKey) {
        configMenu(); // c
    }
    if (evt.keyCode === 88 && evt.altKey) {
        localStorage.removeItem('previousFile'); // x
    }
}

function readyToPrint() {
    var bottomNav = document.getElementById('bottom-navigation');
    returnPeople();
    addTag(bottomNav, 'DONT-SHOW');
    openPrintPopup();
    generateList();
    printAndUpload();
}

function finishPrinting() {
    var bottomNav = document.getElementById('bottom-navigation');
    print();
    removeTag(bottomNav, 'DONT-SHOW');
}

//Shortens name to a string less than a provided length
function shortenName(name, length) {
    for (var i = 0; i < 2; i++) {
        var splitName = "";
        if (name.length > length) {
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
    var length = Object.keys(rooms[index]).length - 4;
    var string = "";
    if (length <= 0) {
        return "";
    }
    for (var i = 0; i < length; i++) {
        var slot = "Slot" + (i + 1)
        var localRoom = rooms[index];
        var name = data[data.findIndex(e => e.number  === localRoom[slot])].name;      
        name = shortenName(name, 20);
        string += localRoom[slot] + " | " + name
        if (length > 1 && i < (length - 1)) {
            string += " <br> "
        }
    }
    return string;
}

//Generate the room array showcase
function generateList() {
    var table1 = document.getElementById("generated-table-1");
    var table2 = document.getElementById("generated-table-2");
    var table3 = document.getElementById("generated-table-3");
    var table4 = document.getElementById("generated-table-4");
    var table5 = document.getElementById("generated-table-5");
    var table6 = document.getElementById("generated-table-6");

    table1.innerHTML = '';
    table2.innerHTML = '';
    table3.innerHTML = '';
    table4.innerHTML = '';
    table5.innerHTML = '';
    table6.innerHTML = '';
    removeTag(table1, 'flipped');
    removeTag(table2, 'flipped');
    removeTag(table3, 'flipped');
    removeTag(table4, 'flipped');
    removeTag(table5, 'flipped');
    removeTag(table6, 'flipped');
    
    for (let i = 0; i < houses.length; i++) {
        //var layoutOrder = houses[i].layout.match(/l_\w+/gim)[0];
        var flags = houses[i].layout.match(/(?<=F_)\w+/gim);
        var insert = flags.includes('startBottom') ? 'afterbegin' : 'beforeend';
        flags.includes('flipped') ? addTag(document.getElementById(`generated-table-${i + 1}`), 'flipped') : '';
        var firstRoomAtHouseGroup = rooms.findIndex(e => e.houseGroup === houseLayout[i].houseNumber);
        for (let x = 0; x < houses[i].amountOfRooms; x++) {
            removeTag(document.getElementById(`generated-table-${i+1}`), 'DONT-SHOW');
            document.getElementById(`generated-table-${i + 1}`).insertAdjacentHTML(insert, '<div class="table-part" id="table-'+ (i+1) +'-part-'+ x +'"> <div class="header"> <b>Værelse ' + rooms[firstRoomAtHouseGroup + x].room + '</b> </div> <div class="generated-text">' + printRoom(rooms[firstRoomAtHouseGroup + x].room) + '</div> </div>',);
        }
        document.getElementById(`generated-table-${i + 1}`).insertAdjacentHTML('afterbegin','<div class="table-title">'+ houses[i].house +'</div>',);
    }
}

function helpMenu() {
    closeButton();
    var helpMenu = document.getElementById('help-menu');
    var closeIcon = document.getElementById('close-button');
    var printIcon = document.getElementById('print-button');
    var configIcon = document.getElementById('config-button');
    var helpIcon = document.getElementById('help-button');
    addTag(printIcon, 'DONT-SHOW');
    addTag(helpIcon, 'DONT-SHOW');
    removeTag(helpMenu, 'hide');
    removeTag(closeIcon, 'DONT-SHOW');
    removeTag(configIcon, 'DONT-SHOW');
}

function configMenu() {
    closeButton();
    var configIcon = document.getElementById('config-button');
    var helpIcon = document.getElementById('help-button');
    var closeIcon = document.getElementById('close-button');
    var printIcon = document.getElementById('print-button');
    var configPers = document.getElementById('config-pers');
    var topBar = document.getElementById('top-bar');
    var sideBar = document.getElementById('side-nav');
    showAlert('Konfigurations mode', 'Stick');
    removeTag(helpIcon, 'DONT-SHOW');
    removeTag(configPers, 'DONT-SHOW');
    removeTag(closeIcon, 'DONT-SHOW');
    addTag(printIcon, 'DONT-SHOW');
    addTag(configIcon, 'DONT-SHOW');
    addTag(topBar, 'disabled');
    addTag(sideBar, 'disabled');


}

function closeButton() {
    var helpMenu = document.getElementById('help-menu');
    var configPers = document.getElementById('config-pers');
    var closeIcon = document.getElementById('print-button');
    var printIcon = document.getElementById('close-button');
    var configIcon = document.getElementById('config-button');
    var helpIcon = document.getElementById('help-button');
    var topBar = document.getElementById('top-bar');
    var sideBar = document.getElementById('side-nav');
    if (!hasTag(helpMenu, 'hide') || !hasTag(configPers, 'DONT-SHOW')) {
        showAlert('', 'Close');
        addTag(helpMenu, 'hide');
        addTag(printIcon, 'DONT-SHOW');
        addTag(configIcon, 'DONT-SHOW');
        addTag(configPers, 'DONT-SHOW');
        removeTag(topBar, 'disabled');
        removeTag(sideBar, 'disabled');
        removeTag(closeIcon, 'DONT-SHOW');    
        removeTag(helpIcon, 'DONT-SHOW');
    } else {
        closePrintPopup();
    }
}

function expandContent(id) {
    var expandableElement = document.getElementById(id);
    expandableElement.classList.toggle('expanded');
    setExpandButtonText(expandableElement, id);
}

function setExpandButtonText(element, id) {
    var button = document.getElementById('expand-button-' + id.substr(id.length - 1));
    var expanded = element.classList.contains('expanded');
    button.innerHTML = expanded ? 'Mindre' : 'Mere';
}

window.onload = () => {
    //localStorage.clear();
    if (document.getElementById('mainBody').getAttribute('data-UIStyle') !== 'new') {
        document.getElementById('mainBody').style.backgroundImage = bgImg;
    }
    try {
        var storedToken = JSON.parse(localStorage.getItem('accesstoken')),
            dateString = storedToken.timestamp,
            token = storedToken.value,
            now = new Date().getTime().toString;
        if (dataExpired(dateString, now, 12)) {
            console.info('Accesstoken expired!');
            localStorage.removeItem('accesstoken');
        } else {
            accessToken = token;
        }
    } catch (error) {
        console.info('No accesstoken found!');
    }
    authenticateGoogleOAuth();
    expandableElements = document.querySelectorAll('.expandable-content');
    checkForOverflow();
    var helpMenu = document.getElementById('help-menu');
    addTag(helpMenu, 'hide');
    addTag(helpMenu, 'visible');
    handleRoomLayout();
}

//Checks if the time has exceded the compareTime by the timeLimit (Measured in hours)
function dataExpired(time, compareTime, timeLimit) {
    //Get the time limit in seconds
    timeLimit *= 3600;
    //Compare the time
    if ((compareTime - time)/1000 > timeLimit) {return true;}
    return false;
}

//Stores importent data, so it's not lost even after a site reload

/* 
Temporay users should be saved in their own item (WITH TIMESTAMP!) and of course store their choices.
When we load the stored data (if there is any) we need to check if the users timestap exceeds the allowed timelimit.
(Timelimit is 2 days standard, but can be changed in the config file.)
If they do exceed the timelimit they should be removed.
*/
function updateStoredData() {
    localStorage.setItem('rooms',JSON.stringify(rooms));
    var choices = [];
    data.forEach((e) => {
        choices.push(e.choice);
    });
    localStorage.setItem('choices', JSON.stringify(choices));
    if (saveTempUsers) {
        temporaryUsers.forEach((e) => {
            e.html = document.getElementById('pers-' + e.id).outerHTML;
        });
        localStorage.setItem('tempUsers', JSON.stringify(temporaryUsers));
    }
}

function loadStoredData() {
    //Can add expiration check here
    if (!sameFile) {
        return;
    }
    //Defining where we want to add the person, it's done like this so we can add the element after the config-pers.
    var target = document.getElementById("config-pers");
    rooms = JSON.parse(localStorage.getItem('rooms'));
    temporaryUsers = JSON.parse(localStorage.getItem('tempUsers'));
    //Run through the temporary users and check if their timestamp is expired.
    //This has to be done otherwise we don't loop through the array the correct number of times...
    let numberOfTempUsers = temporaryUsers.length;
    var amoutDeleted = 0;
    //Is gonna need to be redone, problems will occur when one user is removed but others still remain...
    for (var i = 0; i < numberOfTempUsers; i++) {
        if (dataExpired( temporaryUsers[i-amoutDeleted].timestamp, new Date().getTime(), tempUserTimout)) {
            console.info('Temporary user expired, removing user');
            data.splice(temporaryUsers[i-amoutDeleted].index, 1);
            temporaryUsers.splice(i-amoutDeleted, 1);
            amoutDeleted++;
        } else {
            target.insertAdjacentHTML("afterend",temporaryUsers[i-amoutDeleted].html,);
            data.push({
                'number':temporaryUsers[i-amoutDeleted].id,
                'name':temporaryUsers[i-amoutDeleted].name,
                'img':'none',
                'room':-1,
                'choice':'ikke valgt',
                'sex':temporaryUsers[i-amoutDeleted].sex
            });
        }
    }
    localStorage.removeItem('tempUsers');
    localStorage.setItem('tempUsers', JSON.stringify(temporaryUsers));
    var storedData = JSON.parse(localStorage.getItem('choices'));
    data.map((e, i) => e.choice = storedData[i]);
    for (let i = 0; i < data.length; i++) {
        var room = personInRoom(data[i].number).room
        if (room !== undefined) {
            updateDisplayedRoom('pers-' + i, room);
        }
    }
    countData();
}

function checkForOverflow() {
    expandableElements.forEach(element => {
        if (element.classList.contains("expanded")) return;
        const overflowing = element.scrollHeight > element.clientHeight;
        element.dataset.overflow = overflowing;
    })
}

//Opens the popup menu
function openPrintPopup() {
    var popup = document.getElementById("print-popup");
    var body = document.getElementById("container");
    var closeIcon = document.getElementById('close-button');
    var printIcon = document.getElementById('print-button');
    addTag(printIcon, 'DONT-SHOW');
    addTag(popup, "show");
    addTag(body, "print");
    removeTag(closeIcon, 'DONT-SHOW');

    for (let i = 0; i < houses.length; i++) {
        addTag(document.getElementById(`generated-table-${i+1}`), 'DONT-SHOW');
    }
}

//Closes the popup menu
function closePrintPopup() {
    var popup = document.getElementById("print-popup");
    var body = document.getElementById("container");
    var closeIcon = document.getElementById('print-button');
    var printIcon = document.getElementById('close-button');
    addTag(printIcon, 'DONT-SHOW');
    removeTag(closeIcon, 'DONT-SHOW');
    removeTag(popup, "show");
    removeTag(body, "print");
}

//Make the top group selector work
function selectGroup(group) {
    document.querySelectorAll('.highlighted').forEach((e) => {e.classList.remove('highlighted')});
    if (group == 'home') {
        [].forEach.call(document.querySelectorAll('.image-container'), function (el) {
            el.style.display = 'flex';
        });
    } else {
        addTag(document.getElementById(group.toLowerCase()),'highlighted');
        clearTimeout(home);
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
        home = setTimeout(returnNormal,(timeoutTime * 60000));
    }
}

//Returns the page to deafault state
function returnNormal() {
    selectGroup('home');
    closePopup();
}

//Opens the popup menu
function openPopup(i) {
    var configPopup = document.getElementById("config-menu");
    var configPers = document.getElementById("config-pers");
    var config1 = document.getElementById('config-1');
    var config2 = document.getElementById('config-2');
    var configButton1 = document.getElementById('config-button-1');
    var configButton2 = document.getElementById('config-button-2');
    var configButton3 = document.getElementById('config-button-3');
    switch (true) {
        case i === 'config':
            removeTag(config1, 'DONT-SHOW');
            removeTag(configPopup, "hide");
            addTag(configPopup, "show");
            addTag(config2, 'DONT-SHOW');
            addTag(configPopup,"blur-bg");
            return;

        case !hasTag(configPers, 'DONT-SHOW') && i > 899:
            document.getElementById("config-text").innerHTML = document.getElementById('pers-' + i).children[1].innerText;
            document.getElementById("config-image").src = document.getElementById('pers-' + i).children[0].src;
            addTag(configButton1, 'hide');
            addTag(configButton2, 'hide');
            removeTag(configButton3, 'hide');
            removeTag(config2, 'DONT-SHOW');
            removeTag(configPopup, "hide");
            addTag(config1, 'DONT-SHOW')
            addTag(configPopup, "show");
            addTag(configPopup,"blur-bg");
            return;
        case !hasTag(configPers, 'DONT-SHOW'):
            document.getElementById("config-text").innerHTML = document.getElementById('pers-' + i).children[1].innerText;
            document.getElementById("config-image").src = document.getElementById('pers-' + i).children[0].src;
            removeTag(config2, 'DONT-SHOW');
            removeTag(configPopup, "hide");
            addTag(config1, 'DONT-SHOW')
            addTag(configPopup, "show");
            addTag(configPopup,"blur-bg");
            if (data[i].choice !== 'NOTHERE') {
                removeTag(configButton1, 'not-available');
                addTag(configButton2, 'not-available');
            } else {
                addTag(configButton1, 'not-available');
                removeTag(configButton2, 'not-available');
            }
            return;

        default:
            var popup = document.getElementById("popup");
            popup.dataset.user = 'pers-' + i;
            addTag(popup, 'show');
            addTag(popup, 'blur-bg');
            document.getElementById("replaceableText").innerHTML = document.getElementById('pers-' + i).children[1].innerHTML;
            if (!document.getElementById("replaceableImage").src.includes('images/Dummy.svg')) {
                document.getElementById("replaceableImage").src = document.getElementById('pers-' + i).children[0].src;
            } else if (i < 899) {
                document.getElementById("replaceableImage").src = data[i].img;
            }
            loadSelectorPage(0);
        break;
    }
}

function changePersonStatus(status) {
    var configButton1 = document.getElementById('config-button-1');
    var configButton2 = document.getElementById('config-button-2');
    var currentName = e => e.name === document.getElementById("config-text").textContent;
    namePosition = data.findIndex(currentName);
    var profile = document.getElementById('pers-' + namePosition);
    var childElement = profile.children[2];
    var topText = childElement.children[0];
    var bottomText = childElement.children[1];
    if (status === 'back') {
        removeTag(configButton1, 'not-available');
        removeTag(profile, 'Ikke-Her');
        addTag(profile, 'Ikke-Valgt')
        addTag(configButton2, 'not-available');
        data[namePosition].choice = 'ikke valgt';
        topText.innerHTML = 'Værelse';
    } else {
        addTag(configButton1, 'not-available');
        addTag(profile, 'Ikke-Her');
        removeTag(profile, 'Ikke-Valgt');
        removeTag(profile, 'Andet');
        removeTag(profile, 'Eget');
        removeTag(configButton2, 'not-available');
        data[namePosition].choice = 'NOTHERE';
        topText.innerHTML = 'Ikke på';
        bottomText.innerHTML = 'Skolen';
        if (personInRoom(data[namePosition].number) !== false) {
            removePersonFromRoom(personInRoom(data[namePosition].number));
        }
    }
    countData();
}

function addUser() {
    var name = document.getElementById('user-add-name').value;
    //Defining where we want to add the person, it's done like this so we can add the element after the config-pers.
    var target = document.getElementById("config-pers");
    //Check conditions for the name
    switch (true) {
        case !name.match(/^[ÆØÅæøåA-Za-z ]+$/):
            console.warn('Name contains non letters');
            showAlert('Navn må kun inholde bogstaver');
            return;
        case temporaryUsers.some((e) => e.name.toLowerCase() === name.toLowerCase()):
            console.warn('Name already exists');
            showAlert('Navn findes allerede');
            return;
        case temporaryUsers.length > 99:
            console.warn('Too many temporary users');
            showAlert('For mange midlertidig brugerer');
            return;
        case name.length < 3:
            console.warn('Name too short');
            showAlert('Navnet skal være mere end 3 tegn');
            return;
    }
    //Giving the user a temporary ID number
    var temporaryID = 999 - temporaryUsers.length;
    //Grabbing their selected gender
    var gender = document.getElementById('male-img').classList.contains('selected') ? 'm' : 'f';
    //Pushing the user data to the main data array
    data.push({
        'number':temporaryID,
        'name':name,
        'img':'none',
        'room':-1,
        'choice':'ikke valgt',
        'sex':gender
    });
    var dataIndex = data.findIndex(e => e.number === temporaryID);
    //Pushing the user data to a array of temporary users so we can tell them apart
    temporaryUsers.push({
        'name':name,
        'id':temporaryID,
        'sex':gender,
        'index':dataIndex,
        'timestamp': new Date().getTime(),
        'html':''
    });
    //Adding the user to the container with the other users
    target.insertAdjacentHTML("afterend",'<div class="image-container Ikke-Valgt ' + name.charAt(0).toUpperCase() + '" id="pers-' + temporaryID + '" onclick="openPopup('+ temporaryID +')">' + '<img src="images/Dummy_Guest.png" class="image"> <p class="name-text">' + name + '</p> <div class="room-overlay"><p class="overlay-text overlay-static-text">Værelse</p> <p class="overlay-text overlay-replace-text">xx</p></div> </div>',);
    showAlert('Bruger Tilføjet');
    countData();
    closePopup();
    updateStoredData();
}

//The 'user' arg can be used to remotely delete a user, otherwise not used if removing is done manually through the config menu.
//The arg user should be the ID number of the user.
function removeUser(user) {
    if (user == null || (typeof user === "string" && user.trim().length === 0)) {
        var name = document.getElementById('config-text').innerText;
        var userDataIndex = data.findIndex(e => e.name === name);
        var userId = data[userDataIndex].number
    } else {
        var userDataIndex = data.findIndex(e => e.number === user);
        var userId = user
    }
    if (personInRoom(userId) !== false) {
        removePersonFromRoom(userId,personInRoom(userId));
    }
    document.getElementById('pers-'+userId).remove();
    temporaryUsers.splice(temporaryUsers.findIndex(e => e.id === userId),1);
    data.splice(userDataIndex, 1);
    updateStoredData();
    countData();
    closePopup();
    showAlert('Bruger Fjernet');
}

function selectGender(gender) {
    var maleImg = document.getElementById('male-img');
    var femaleImg = document.getElementById('female-img');
    switch (gender) {
        case 'male':
            addTag(maleImg, 'selected');
            removeTag(femaleImg, 'selected');
            break;
        case 'female':
            addTag(femaleImg, 'selected');
            removeTag(maleImg, 'selected');
            break;
    }
}

//Closes the popup menu
function closePopup() {
    var configPopup = document.getElementById("config-menu");
    var popup = document.getElementById("popup");
    switch (true) {
        case hasTag(configPopup, 'show'):
            removeTag(configPopup,'show');
            removeTag(configPopup,'blur-bg');
            break;
    
        default:
            removeTag(popup,'show');
            removeTag(popup,'blur-bg');
            popup.dataset.user = 'none';
            closeButtons();
            break;
    }
}

//Returns to the previous menu
function returnBack() {
    var stage_3 = document.getElementById("buttons-stage-3");
    if (hasTag(stage_3, 'show')) {
        loadSelectorPage(1);
    } else {
        loadSelectorPage(0);
    }
}

//Shows the top alert
function showAlert(alertMessage, param) {
    //Grab the elements needed
    var alert = document.getElementById("alert-container");
    var alertContent = document.getElementById("alert-content");
    var alertEffect = document.getElementById("top-alert");
    var alertText = document.getElementById("alertText");
    //Check if we just want to close the alert
    switch (param) {
        case 'Close':
            previousAlert = 'none';
            alert.style.height = "0";
            alertContent.style.height = "0";
            alertEffect.style.height = "0";
            break;

        case 'Stick':
            //Set the message in the alert to the specified text
            alertText.innerHTML = alertMessage;
            //Set a variable so we can call it later if a new temporary alert is called.
            previousAlert = alertMessage;
            //Open the alert
            alert.style.height = "45px";
            alertContent.style.height = "43px";
            alertEffect.style.height = "45px";
            break;
    
        default:
            //Activate the effect
            addTag(alertEffect, "active");
            //Set the message in the alert to the specified text
            alertText.innerHTML = alertMessage;
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
                removeTag(alertEffect, "active");
                if (previousAlert !== 'none') {
                    showAlert(previousAlert, 'Stick');
                }
            }, 2000);
            break;
    }
    
}

//
function selectorButton(place) {
    //Declerations
    var popup = document.getElementById('popup');
    var name = document.getElementById("replaceableText").textContent;
    var namePos = data.findIndex(e => e.name === name);
    var currentPerson = document.getElementById("pers-" + namePos);
    var guest = popup.dataset.user.split('-')[1] > 899 ? true : false;

    if (place === 'Eget' && !guest) {
        switch (true) {        
            case personInRoom(data[namePos].number, data[namePos].room):
                closePopup();
                return;
                
            case checkRoomAvailability(data[namePos].room):
                addPersonToRoom(data[namePos].number, data[namePos].room, false);
                data[namePos].choice = 'eget vaerelse';
                addTag(currentPerson, "Eget");
                removeTag(currentPerson, "Andet");
                removeTag(currentPerson, "Ikke-Valgt");
                countData();
                closePopup();
                updateStoredData();
                return;
        }
        relocate(data[namePos].number, data[namePos].room, "", true);
        closePopup();
        updateStoredData();
        return;
    } else {
        loadSelectorPage(1);
    }
}

//Sends the user to the room select menu.
function selectHouse(house) {
    var popup = document.getElementById('popup');
    house += 'h';
    if (popup.dataset.user.split('-')[1] > 899) {
        loadSelectorPage(2, house, 'guest');
    } else {
        loadSelectorPage(2, house);
    }
}

//Func for adding pers to the selected room based on the button
function selectRoom(setRoom) {
    var popup = document.getElementById('popup');
    //var popupText = document.getElementById('replaceableTextHeader').innerText.split(' ')[0];
    var currentPerson = document.getElementById(popup.dataset.user);
    if (popup.dataset.user.split('-')[1] > 899) {
        var personSelected = data[data.findIndex(e => e.number === Number(popup.dataset.user.split('-')[1]))].number;
    } else {
        var personSelected = data[popup.dataset.user.split('-')[1]].number;
    }

    setRoom = document.getElementById('btn-' + setRoom).innerText;
    
    if (setRoom.match(/\b(\d+)\b/gim) !== null) {
        setRoom = Number(setRoom);
    }

    switch (true) {
        case !checkRoomAvailability(setRoom):
        case !checkSex(personSelected, setRoom):
            closePopup();
            showAlert("Du kan ikke sove på dette værelse");
            return;

        default:
            addPersonToRoom(personSelected, setRoom, false);
            data[data.findIndex(e => e.number === personSelected)].choice = 'andet vaerelse';
            addTag(currentPerson, "Andet");
            removeTag(currentPerson, "Eget");
            removeTag(currentPerson, "Ikke-Valgt");
            closePopup();
            countData();
            updateStoredData();
    }
}

//Make function to change pages!
function loadSelectorPage(page, ...args) {
    var popup = document.getElementById('popup');
    var nameText = document.getElementById("replaceableText");
    var image = document.getElementById("replaceableImage");
    var stage_1 = document.getElementById("buttons-stage-1");
    var stage_2 = document.getElementById("buttons-stage-2");
    var stage_3 = document.getElementById("buttons-stage-3");
    var header = document.getElementById("header");
    var headerText = document.getElementById("replaceableTextHeader");
    var button_1 = document.getElementById('selector-button-1');
    switch (page) {

        case 0:
            closeButtons();
            addTag(stage_1, 'show');
            addTag(image, 'show');
            addTag(nameText, 'show');
            removeTag(button_1, 'not-available');
            if (Number(popup.dataset.user.split('-')[1]) > 899) {
                addTag(button_1, 'not-available');
            }
            break;
    
        case 1:
            closeButtons();
            addTag(stage_2, 'show');
            addTag(header, 'show');
            headerText.innerHTML = "Vælg fløj";
            break;

        case 2:
            if (args.includes('guest')) {
                var personSelected = data[data.findIndex(e => e.number === Number(popup.dataset.user.split('-')[1]))].number;
            } else {
                var personSelected = data[popup.dataset.user.split('-')[1]].number;
            }
            closeButtons();
            addTag(stage_3, 'show');
            addTag(header, 'show');

            var selectedHouseIndex = houses.findIndex(e => e.houseNumber === Number(args[args.findIndex(e => e.match(/(\d{1,2}h)+/g))].split('h')[0]) + 1);
            var firstRoomAtHouseGroup = rooms.findIndex(e => e.houseGroup === houses[selectedHouseIndex].houseNumber);
            
            headerText.innerHTML = `${houses[selectedHouseIndex].house} - Værelse`;
            for (var i = 0; i < houses[selectedHouseIndex].amountOfRooms; i++) {
                removeTag(document.getElementById("btn-" + i ), 'DONT-SHOW');
                document.getElementById("btn-" + i ).innerHTML = rooms[firstRoomAtHouseGroup + i].room;
                grayOutButton(i, rooms[firstRoomAtHouseGroup + i].room, personSelected);
            }
            break;
    }
}

//Make sure all the buttons are closed and returned to default
function closeButtons() {
    //Define the elements that are to be used
    var nameText = document.getElementById("replaceableText");
    var image = document.getElementById("replaceableImage");
    var stage_1 = document.getElementById("buttons-stage-1");
    var stage_2 = document.getElementById("buttons-stage-2");
    var stage_3 = document.getElementById("buttons-stage-3");
    var header = document.getElementById("header");

    //Return everything to it's default
    removeTag(image, 'show');
    removeTag(header, 'show');
    removeTag(nameText, 'show');
    removeTag(stage_1, 'show');
    removeTag(stage_2, 'show');
    removeTag(stage_3, 'show');
    removeTag(stage_3, 'small');

    //Closes the room selector buttons
    document.querySelectorAll('.alt').forEach((e) => {addTag(e, 'DONT-SHOW')});
}

//Relocates someone based on some parameters
function relocate(person, targetLocation, previousLocation, forceRelocate) {
    if (forceRelocate === true) {
        //Declare variables
        var roomLength;
        var roomSlotPos;
        var currentRoom;
        var memberList = {};
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
        delete memberList.houseGroup;

        //Set the memberlist to the values of the room so that the slots are removed.
        memberList = Object.values(memberList);
        if (roomLength - 4 > 0 && roomLength - 4 > currentRoom.space + allowedExtraValue - 1) {
            for (var i = 0; i < (roomLength - 4); i++) {
                //Check if their an original member of the room. If they are, store the name and break the loop
                //Also checks if the person is a guest, guests can't be kicked unless they're the last person in the room that's not an original memeber.
                if (!originalMember(memberList[i], targetLocation) && (memberList[i] < 899 || i > 1 || (i+1 == (roomLength - 4) && originalMember(i+1)))) {
                    //Grab the person and place them into an object
                    Object.assign(personToBeReplaced, {id: memberList[i]});
                    break;
                }
            }
            //Checks if there is a person that needs to be removed from the room, special case for if they're a guest
            if (Object.keys(personToBeReplaced).length > 0 && personToBeReplaced.id < 900) {
                //Find the persons own room and add it to the object
                Object.assign(personToBeReplaced, {ownRoom: data[data.findIndex(e => e.number === personToBeReplaced.id)].room})
                //Remove a person
                removePersonFromRoom(personToBeReplaced.id, currentRoom);
                //Add people to their respective rooms.
                addPersonToRoom(personToBeReplaced.id, personToBeReplaced.ownRoom, false);
            } else {
                //If they're a guest only remove them from the room.
                removePersonFromRoom(personToBeReplaced.id, currentRoom);
                updateDisplayedRoom('pers-' + personToBeReplaced.id, -1);
            }
        }
        addPersonToRoom(person, targetLocation, false);
        return;
    } else {
        if (!checkRoomAvailability(targetLocation)) {
            return;
        }
        
        removePersonFromRoom(person, previousLocation);
        addPersonToRoom(person, targetLocation, true);
    }
}

//Checks if a person is an orginal member of a room
function originalMember(person, room) {
    //Get their index position
    personPosition = data.findIndex(e => e.number === person);
    //Check if the room entered is equal to their original room
    if (room === data[personPosition].room) {
        return true;
    } else {
        return false;
    }
}

//Check if a room is available, if it is, return true
function checkRoomAvailability(room) {
    //Find the room position in the array
    var roomPosition = rooms.findIndex(e => e.room === room);
    //Find the amount of people in the room
    var roomAmount = Object.keys(rooms[roomPosition]).length - 4;
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
        //If it is not, check all houses for the person
        for (var i = 0; i < rooms.length; i++) {
            var roomPos = i;
            var roomContent = rooms[roomPos];
            if (Object.values(roomContent).includes(id, 4)) {
                return roomContent;
            }
        }
        return false;
    } else {

        if (room === 0) {
            room = "1a";
        } else if (room === 1) {
            room = "1b";
        }

        var roomInQuestion = rooms.findIndex(x => x.room === room);

        var currentRoom = Object.assign({}, rooms[roomInQuestion]);

        try {
            return Object.values(currentRoom).includes(id,4);
        } catch(err) {
            return false;
        }
    }
}

//Adds a person to the room specified
function addPersonToRoom(person, room, bypass) {

    //Check if the person is in a room, if so remove them from their previous room.
    if (personInRoom(person) !== false && bypass !== true) {
        relocate(person, room, personInRoom(person), false);
        return;
    }

    //Set the room position to the index of the room
    roomPosition = rooms.findIndex(e => e.room === room);
    //Grab the current profile of the room
    var currentProfile = Object.assign({}, rooms[roomPosition]);
    //Find out what slot the person should be added to
    var slotPos = "Slot" + (Object.keys(rooms[roomPosition]).length - 3);
    //Define the object that should be added
    var addedContent = {
        [slotPos]:person
    }
    //Add the new object to the profile
    Object.assign(currentProfile, addedContent);
    
    //Replace the room in the rooms array
    const itemIndex = rooms.findIndex(o => o.room === room);
    rooms[itemIndex] = currentProfile;

    var namePos = data.findIndex(e => e.number === person);

    //Update the persons profile
    if (data[namePos].room === room) {
        data[namePos].choice = "eget vaerelse";
    } else {
        data[namePos].choice = "andet vaerelse";
    }

    updateDisplayedRoom("pers-" + namePos, room);        
    countData();
}

//Removes a person from a room !!! Requires the room object as the param "room"
function removePersonFromRoom(person, room) {

    data[data.findIndex(e => e.number === person)].choice = 'ikke valgt';
    //Set a variable that is used later
    var minusVal = 0;
    //Create a temp object thats set to the current room
    var currentRoom = Object.assign({}, room);
    //Create a empty object for the new room to be sorted into
    var newRoom = {};
    //Assaign the discriptors to the new room,
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

    //Update the room in the rooms array
    const itemIndex = rooms.findIndex(o => o.room === newRoom.room);
    rooms[itemIndex] = newRoom;
    countData();
}

//Function to check if the person specified is the same sex as the room
function checkSex(personId, room) {
    var sex = data[data.findIndex(e => e.number === personId)].sex;
    var roomSex = rooms[rooms.findIndex(e => e.room === room)].sex
    if (sex === roomSex) {
        return true;
    } else {
        return false;
    }
}



//Check if the button should be grayed out, and does so if needed.
function grayOutButton(buttonNumber, room, _pers) {
    var button = document.getElementById("btn-" + buttonNumber );
    //DEBUG
    /*
    console.log('Avail ' + !checkRoomAvailability(room));
    console.log('Sex ' + !checkSex(_pers, room));
    console.log('InRoom ' + personInRoom(_pers, room));
    console.log('Orig ' + originalMember(_pers, room));
    */
    switch (true) {
        case !checkRoomAvailability(room):
        case !checkSex(_pers, room):
        case personInRoom(_pers, room):
        case originalMember(_pers, room):
            addTag(button,'not-available');
            break;
    
        default:
            removeTag(button,'not-available')
            break;
    }

}


//Send the values to the HTMl page
function updateCount(ownRoom, otherRoom, noChoise) {
    document.getElementById("eget-vaerelse-number").innerHTML = ownRoom;
    document.getElementById("andet-vaerelse-number").innerHTML = otherRoom;
    document.getElementById("ikke-valgt-number").innerHTML = noChoise;
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

//Function to return if an element has a tag
function hasTag(element, tag) {
    return element.classList.contains(tag);
}

//Updates the displayed room is a person changes room
function updateDisplayedRoom(personId, room) {
    if (room === -1) {
        try {
            var parentElement = document.getElementById(personId);
            var childElement = parentElement.children[2];    
        } catch (error) {
            var parentElement = document.getElementById('pers-' + data[personId.split('-')[1]].number);
            var childElement = parentElement.children[2]; 
        }
        var replaceText = childElement.children[1];
        replaceText.innerHTML = 'xx';
        addTag(parentElement, "Ikke-Valgt");
        removeTag(parentElement, "Andet");
        removeTag(parentElement, "Eget");
        return;
    }
    try {
        var parentElement = document.getElementById(personId);
        var childElement = parentElement.children[2];    
        var replaceText = childElement.children[1];
        replaceText.innerHTML = room;
        if (room === data[personId.split('-')[1]].room) {
            removeTag(parentElement, "Ikke-Valgt");
            removeTag(parentElement, "Andet");
            addTag(parentElement, "Eget");
        } else {
            removeTag(parentElement, "Ikke-Valgt");
            removeTag(parentElement, "Eget");
            addTag(parentElement, "Andet");
        }
    } catch (error) {
        var parentElement = document.getElementById('pers-' + data[personId.split('-')[1]].number);
        var childElement = parentElement.children[2]; 
        var replaceText = childElement.children[1];
        replaceText.innerHTML = room;
        removeTag(parentElement, "Ikke-Valgt");
        removeTag(parentElement, "Eget");
        addTag(parentElement, "Andet");
    }
}

//Send everyone back to their original room if they're not allready in a room
function returnPeople() {
    for (var i = 0; i < data.length; i++) {
        if (data[i].choice === "ikke valgt" && data[i].number < 900) {
            //Define the variables needed
            var person = data[i].number;
            var personId = "pers-" + i;
            var room = data[i].room;
            var currentPerson = document.getElementById("pers-" + i);
            
            data[i].choice = "eget vaerelse";
            updateDisplayedRoom(personId, room);
            relocate(person, room, '', true);
            addTag(currentPerson, "Eget");
            removeTag(currentPerson, "Andet");
            removeTag(currentPerson, "Ikke-Valgt");
        }
    }
    countData();
    updateStoredData();
}

//Function loads all the profiles once the sourcefile is selected
async function loadDOM() {
    var alertText = document.getElementById('alertText');
    var body = document.getElementById('mainBody');
    alertText.innerHTML = 'Venter på data';
    if (!dataReady) {
        console.warn('Waiting for data.')
        var check = setInterval(function () {
            if (dataReady) {
                clearInterval(check);
                loadDOM();
            }
        }, 100); 
        return;
    }
    alertText.innerHTML = 'Loader profiler...';
    addTag(body,'disabled');
    hideInput();
    //Tries to load the profiles by having the data split by ';' and if that doesn't work we go back and split the data with ','
    try {
        for (var i = 0; i < weekendList.length; i++) {
            var index = data.findIndex(e => e.name  === weekendList[i]);
            checkList.push(index);
            var testObejct = data[index];
            testObejct.choice = "ikke valgt";
        }
    } catch (error) {
        console.error('Data is invalid');
        console.error(error);
    }
    //Grabs the outer shell for where the profiles are to be loaded to
    var mainContainer = document.getElementById("container");
    //Loads each profle one by one, giving assets as well
        
    for (var i = 0; i < data.length; i++) {
        if (checkList.includes(i)) {
            mainContainer.insertAdjacentHTML("beforeend",'<div class="image-container Ikke-Valgt ' + data[i].name.charAt(0) + '" id="pers-' + i + '" onclick="openPopup('+ i +')">' + '<img src="' + data[i].img + '" class="image"> <p class="name-text">' + data[i].name + '</p> <div class="room-overlay"><p class="overlay-text overlay-static-text">Værelse</p> <p class="overlay-text overlay-replace-text">xx</p></div> </div>',);
        } else {
            mainContainer.insertAdjacentHTML("beforeend",'<div class="image-container DONT-SHOW Ikke-Valgt ' + data[i].name.charAt(0) + '" id="pers-' + i + '" onclick="openPopup('+ i +')">' + '<img src="' + data[i].img + '" class="image"> <p class="name-text">' + data[i].name + '</p> <div class="room-overlay"><p class="overlay-text overlay-static-text">Værelse</p> <p class="overlay-text overlay-replace-text">xx</p></div> </div>',);
        }
    }
    //Count the data
    countData();
    //Set a interval that checks the time every minute
    var minute = 1000*60;
    setInterval(() => {
        if (checkTime()) {
            returnPeople();
            clearInterval();
            readyToPrint();
        }
    }, minute);

    const img = document.querySelectorAll(".image");
    img.forEach((e) => e.addEventListener("error", function(event) {
        event.target.src = "images/Dummy.svg";
        //event.onerror = null;
    }));
    if (localStorage.getItem('choices') || localStorage.getItem('room')) {loadStoredData();}
    //Close the alert once the window is loaded
    showAlert(" ", "Close");
    removeTag(body,'disabled');
}

function getPicture(name) {
    return imageFiles.find(file => file.name === name).thumbnailLink;
/*    return file.webContentLink.replace("&export=download", "").replace('/uc?','/thumbnail?');*/
}

function checkTime() {
    const d = new Date();
    var hour = d.getHours();
    var minute = d.getMinutes();
    if (hour == deadLine[0] && minute == deadLine[1]) {
        return true;
    } else {
        return false;
    }
}

//Count the number of each value
function countData() {
    //Set count to 0
    var noChoise = 0;
    var ownRoom = 0;
    var otherRoom = 0;
    //Count each type & add to value
    for (var i = 0; i < data.length; i++) {
        if (data[i].choice == "eget vaerelse") {
            ownRoom++;
        } else if (data[i].choice == "andet vaerelse") {
            otherRoom++;
        } else if (data[i].choice == "ikke valgt") {
            noChoise++;
        }
    }
    //Call the values to be rendered to the website
    updateCount(ownRoom, otherRoom, noChoise);
}

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
