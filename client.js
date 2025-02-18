//Initialize the xAPI on page load to make the xapi object available.
//Creating a persistent Cookie with navigator ID is not necessary, 
//just done as an example for how to distinguish between unique navigators.
async function init() {
	try {
		xapi = await getXAPI();
		xapistatus.textContent = "jsxapi available";
		unique_id = createPersistentCookie();
		content.textContent = "Navigator ID: " + unique_id;
		setupSubscriptions();
		getCurrent();
		updateSerial();
	} catch (e) {
		content.textContent = e.message;
		xapistatus.textContent = "error getting jsxapi object";
	}
}

window.onload = async function () {
	init();
};

//Persistent Cookie example for Unique Navigator ID:
//Searches for an existing cookie, if not found generates a new UUID and stores it.
function createPersistentCookie() {
	value_or_null = (document.cookie.match(/^(?:.*;)?\s*uniqueId\s*=\s*([^;]+)(?:.*)?$/) || [, null])[1]
	var ret_val;
	if (value_or_null == null) {
		var expiration_date = new Date();
		var cookie_string = '';
		expiration_date.setFullYear(expiration_date.getFullYear() + 1);
		cookie_string = "uniqueId=" + uuidv4() + "; path=/; expires=" + expiration_date.toUTCString();
		document.cookie = cookie_string;
	}
	return (document.cookie.match(/^(?:.*;)?\s*uniqueId\s*=\s*([^;]+)(?:.*)?$/) || [, null])[1];
}

function uuidv4() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}

//Event handlers for button presses below.
//Xapi Command to set the LedControl Color to Green
const greenButton = document.getElementById('greenButton');
const content = document.getElementById('content');
const xapistatus = document.getElementById('xapistatus');
var serialno = '';

greenButton.addEventListener('click', async function (e) {
	try {
		//Example of an xapi xCommand
		xapi.Command.UserInterface.LedControl.Color.Set({ Color: 'Green' });
	} catch (e) {
		content.textContent = e.message;
	}
});

//Xapi Command to set the LedControl Color to Yellow
const yellowButton = document.getElementById('yellowButton');
yellowButton.addEventListener('click', async function (e) {
	try {
		//Example of an xapi xCommand
		xapi.Command.UserInterface.LedControl.Color.Set({ Color: 'Yellow' });
	} catch (e) {
		content.textContent = e.message;
	}
});

//Xapi Command to set the LedControl Color to Red
const redButton = document.getElementById('redButton');
redButton.addEventListener('click', async function (e) {
	try {
		//Example of an xapi xCommand
		xapi.Command.UserInterface.LedControl.Color.Set({ Color: 'Red' });
	} catch (e) {
		content.textContent = e.message;
	}
});

//Xapi Command to set the LedControl Color to Blue
const blueButton = document.getElementById('blueButton');
blueButton.addEventListener('click', async function (e) {
	try {
		//Example of an xapi xCommand
		xapi.Command.UserInterface.LedControl.Color.Set({ Color: 'Blue' });
	} catch (e) {
		content.textContent = e.message;
	}
});

//Xapi Command to set the LedControl Color to Purple
const purpleButton = document.getElementById('purpleButton');
purpleButton.addEventListener('click', async function (e) {
	try {
		//Example of an xapi xCommand
		xapi.Command.UserInterface.LedControl.Color.Set({ Color: 'Purple' });
	} catch (e) {
		content.textContent = e.message;
	}
});

//Xapi Command to set the LedControl Color to Orange
const orangeButton = document.getElementById('orangeButton');
orangeButton.addEventListener('click', async function (e) {
	try {
		//Example of an xapi xCommand
		xapi.Command.UserInterface.LedControl.Color.Set({ Color: 'Orange' });
	} catch (e) {
		content.textContent = e.message;
	}
});

const manualButton = document.getElementById('manualButton');
manualButton.addEventListener('click', async function (e) {
	try {
		//Example xapi xConfiguration
		xapi.Config.UserInterface.LedControl.Mode.set('Manual');
		content.textContent = `Set Led Control to Manual`;

	} catch (e) {
		content.textContent = e.message;
	}
});

const autoButton = document.getElementById('autoButton');
autoButton.addEventListener('click', async function (e) {
	try {
		xapi.Config.UserInterface.LedControl.Mode.set('Auto');
		content.textContent = `Set Led Control to Auto - LED will be set to Off if Calendar is not setup`;

	} catch (e) {
		content.textContent = e.message;
	}

});

//Currently the Audio xAPI is not enabled for Persistent WebApp Mode
//Attempts to toggle mute, expected to fail.
const failButton = document.getElementById('failCase');
failButton.addEventListener('click', async function (e) {
	try {
		xapi.Command.Audio.Volume.ToggleMute();

	} catch (e) {
		content.textContent = e.message;
	}

});

//Gets the current xStatus of LedControl Color and displays on the page.
function getCurrent() {
	//Example xapi xStatus
	xapi.Status.UserInterface.LedControl.Color.get().then((color) => {
		setLedColor(color)
	})
		.catch(function (error) {
			console.log(error);
		});



}

<<<<<<< Updated upstream
function updateSerial() {
	xapi.Status.SystemUnit.Hardware.Module.SerialNumber.get().then((sn) => {
		setSerialNumber(sn);
	})
		.catch(function (error) {
			setSerialNumber(JSON.stringify(error))
		});
=======
function updateSerial(){
	xapi.Status.SystemUnit.Hardware.Module.SerialNumber.get().then((sn) => {
		setSerialNumber(sn)
    })
    .catch(function(error) {
		console.log(error);
    });
>>>>>>> Stashed changes
}

function setLedColor(color) {
	console.log("COLOR: " + color)
	switch (color) {
		case 'Green':
		case 'Yellow':
		case 'Red':
		case 'Blue':
		case 'Purple':
		case 'Aquamarine':
		case 'Cyan':
		case 'Gold':
		case 'Lime':
		case 'Orchid':
		case 'Turquoise':
		case 'Fuchsia':
		case 'Magenta':
		case 'Orange':
		case 'Purple':
		case 'Scarlet':
		case 'Violet':
			document.getElementById(serialno).style.backgroundColor = color;
			break;
		case 'Off':
			document.getElementById(serialno).style.backgroundColor = 'black';
			break;
		default:
			document.getElementById(serialno).style.backgroundColor = 'grey';
			console.log("Unexpected color: " + color)
	}
}


function setSerialNumber(sn) {
	serialno = sn;
	console.log("setSerialNumber whohoo");
	document.getElementById('foundserialnumber').textContent = 'Serialnumber: ' + serialno;
	document.getElementById(sn).style.backgroundColor = 'Red';
}



//Gets the current xStatus of LedControl Color and displays on the page.
function setupSubscriptions() {
	console.log("setupSubscriptions whohoo");
	//Example xapi xStatus
	xapi.Status.UserInterface.LedControl.Color.on(color => {
		setLedColor(color)
	});
}