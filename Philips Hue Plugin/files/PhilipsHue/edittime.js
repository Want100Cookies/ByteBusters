﻿function GetPluginSettings() {
    return {
        "name": "Philips Hue API",				// as appears in 'insert object' dialog, can be changed as long as "id" stays the same
        "id": "PhilipsHue",				// this is used to identify this plugin and is saved to the project; never change it
        "version": "0.1",					// (float in x.y format) Plugin version - C2 shows compatibility warnings based on this
        "description": "This plugin controls Philips Hues Lights",
        "author": "Pascal Drewes - Stenden University - INF1B",
        "help url": "https://github.com/INF1B-Project-Inovate/game",
        "category": "General",				// Prefer to re-use existing categories, but you can set anything here
        "type": "object",				// either "world" (appears in layout and is drawn), else "object"
        "rotatable": true,					// only used when "type" is "world".  Enables an angle property on the object.
        "flags": 0						// uncomment lines to enable flags...
						| pf_singleglobal		// exists project-wide, e.g. mouse, keyboard.  "type" must be "object".
        //	| pf_texture			// object has a single texture (e.g. tiled background)
        //	| pf_position_aces		// compare/set/get x, y...
        //	| pf_size_aces			// compare/set/get width, height...
        //	| pf_angle_aces			// compare/set/get angle (recommended that "rotatable" be set to true)
        //	| pf_appearance_aces	// compare/set/get visible, opacity...
        //	| pf_tiling				// adjusts image editor features to better suit tiled images (e.g. tiled background)
        //	| pf_animations			// enables the animations system.  See 'Sprite' for usage
        //	| pf_zorder_aces		// move to top, bottom, layer...
        //  | pf_nosize				// prevent resizing in the editor
        //	| pf_effects			// allow WebGL shader effects to be added
        //  | pf_predraw			// set for any plugin which draws and is not a sprite (i.e. does not simply draw
        // a single non-tiling image the size of the object) - required for effects to work properly
    };
};

////////////////////////////////////////
// Parameter types:
// AddNumberParam(label, description [, initial_string = "0"])			// a number
// AddStringParam(label, description [, initial_string = "\"\""])		// a string
// AddAnyTypeParam(label, description [, initial_string = "0"])			// accepts either a number or string
// AddCmpParam(label, description)										// combo with equal, not equal, less, etc.
// AddComboParamOption(text)											// (repeat before "AddComboParam" to add combo items)
// AddComboParam(label, description [, initial_selection = 0])			// a dropdown list parameter
// AddObjectParam(label, description)									// a button to click and pick an object type
// AddLayerParam(label, description)									// accepts either a layer number or name (string)
// AddLayoutParam(label, description)									// a dropdown list with all project layouts
// AddKeybParam(label, description)										// a button to click and press a key (returns a VK)
// AddAnimationParam(label, description)								// a string intended to specify an animation name
// AddAudioFileParam(label, description)								// a dropdown list with all imported project audio files

////////////////////////////////////////
// Conditions

// AddCondition(id,					// any positive integer to uniquely identify this condition
//				flags,				// (see docs) cf_none, cf_trigger, cf_fake_trigger, cf_static, cf_not_invertible,
//									// cf_deprecated, cf_incompatible_with_triggers, cf_looping
//				list_name,			// appears in event wizard list
//				category,			// category in event wizard list
//				display_str,		// as appears in event sheet - use {0}, {1} for parameters and also <b></b>, <i></i>
//				description,		// appears in event wizard dialog when selected
//				script_name);		// corresponding runtime function name

// example
AddCondition(0, cf_none, "Is the Hue bridge connected",
							"Bridge",
							"Is Hue Bridge connected",
							"Check of de Hue bridge verbonden is of niet",
							"isBridgeConnected");

AddCondition(1, cf_none, "Is the game user whitelisted",
							"Bridge",
                            "Has Bridge permission",
							"Check of er permissie is om bepaalde acties uit te voeren (zoals lampen besturen)",
							"isWhitelisted");

AddCondition(2, cf_trigger, "Trigger when list of lights is recieved",
							"Bridge",
							"Light list recieved",
							"Door middel van deze trigger weet de rest van de applicatie wanneer het de lijst van lampen kan weergeven zodat deze ingesteld kunnen worden voor gebruik",
							"lightListRecieved");


AddComboParamOption("Mono (1)");
AddComboParamOption("Stereo (2)");
AddComboParamOption("Trio (3)");
AddComboParam("Choose a lightmode", "Controle of deze specifieke lamp(en) beschikbaar is/zijn om waardes naar toe te sturen. In mono modus is alleen de middelste lamp beschikbaar, in stereo modus zijn de buitenste twee lampen beschikbaar en in trio modus zijn alle 3 de lampen beschikbaar", initial_selection = 2);

AddCondition(3, cf_none, "Which lights are available",
							"Lights",
							"Is in light mode {0}",
							"Controle of deze specifieke lamp(en) beschikbaar is/zijn om waardes naar toe te sturen. In mono modus is alleen de middelste lamp beschikbaar, in stereo modus zijn de buitenste twee lampen beschikbaar en in trio modus zijn alle 3 de lampen beschikbaar",
							"inLightMode");

AddCondition(4, cf_trigger, "Trigger when autoconnect failed",
							"Bridge",
							"Autoconnect failed",
							"Trigger wanneer de auto connect geen Hue Bridge heeft gevonden",
							"trigAutoConnectFailed");

AddCondition(5, cf_trigger, "Trigger when manual connect failed",
							"Bridge",
							"Manual connect failed",
							"Trigger wanneer de manual connect geen response heeft op het ingevulde IP adres",
							"trigManConnectFailed");

AddCondition(6, cf_trigger, "Trigger when link button must be pressed",
                            "Bridge",
                            "Link button must be pressed",
                            "Trigger wanneer de gebruiker op de link knop moet drukken",
                            "trigLinkButton");

AddCondition(7, cf_trigger, "Trigger when connect succeeded",
                            "Bridge",
                            "Connect succeeded",
                            "Trigger wanneer de connect positief is afgerond",
                            'trigConnectSucceeded');

////////////////////////////////////////
// Actions

// AddAction(id,				// any positive integer to uniquely identify this action
//			 flags,				// (see docs) af_none, af_deprecated
//			 list_name,			// appears in event wizard list
//			 category,			// category in event wizard list
//			 display_str,		// as appears in event sheet - use {0}, {1} for parameters and also <b></b>, <i></i>
//			 description,		// appears in event wizard dialog when selected
//			 script_name);		// corresponding runtime function name

// example
// AddStringParam("Message", "Enter a string to alert.");
// AddAction(0, af_none, "Alert", "My category", "Alert {0}", "Description for my action!", "MyAction");

AddStringParam("IP-adres Hue Bridge", "IP-adres van de Hue Bridge");
AddAction(0, af_none, "Connect Hue Bridge",
						"Bridge",
						"Connect to bridge on IP {0}",
						"Deze functie maakt verbinding met de Hue bridge op het opgegeven IP adres",
						"manualConnectHueBridge");

AddAction(1, af_none, "Gain permission on the bridge",
						"Bridge",
						"Gain permission on the bridge",
						"Registreer een nieuwe gebruiker op de Philips Hue bridge om lampen mee aan te sturen",
						"gainPermission");

AddNumberParam("Lamp ID", "The ID of the lamp which should go into a slot");
AddComboParamOption("Left");
AddComboParamOption("Middle");
AddComboParamOption("Right");
AddComboParam("Choose a slot to set", "Choose a slot to set a specific lamp to");
AddAction(2, af_none, "Set a light to a specific slot",
						"Bridge",
						"Set light {0} to slot {1}",
						"Deze functie zet een lamp in een van de drie slots zodat het refereren naar deze lamp makkelijker gaat",
						"setLightSlot");

AddComboParamOption("Left");
AddComboParamOption("Middle");
AddComboParamOption("Right");
AddComboParam("Choose a slot", "Choose a slot to send a specific Color to");
AddNumberParam("Hue", "The Color Hue (between 0 & 65535):");
AddNumberParam("Saturation", "The Color saturation (between 0 & 254):");
AddNumberParam("Brightness", "The brightness of the light (between 0 & 254):");
AddAction(3, af_none, "Set a light to a specific Color",
						"Light",
						"Set light {0} to H:{1},S:{2},B:{3}",
						"Met deze functie is het mogelijk om een lamp een kleur, verzadiging en helderheid mee te geven",
						"setLightColor");

AddAction(0, af_none, "Auto connect Hue Bridge",
                        "Bridge",
                        "Auto connect bridge",
                        "Deze functie maakt verbinding met de Hue bridge door het IP adres te zoeken",
                        "autoConnectHueBridge");

////////////////////////////////////////
// Expressions

// AddExpression(id,			// any positive integer to uniquely identify this expression
//				 flags,			// (see docs) ef_none, ef_deprecated, ef_return_number, ef_return_string,
//								// ef_return_any, ef_variadic_parameters (one return flag must be specified)
//				 list_name,		// currently ignored, but set as if appeared in event wizard
//				 category,		// category in expressions panel
//				 exp_name,		// the expression name after the dot, e.g. "foo" for "myobject.foo" - also the runtime function name
//				 description);	// description in expressions panel

// example
AddExpression(0, ef_return_string, "(Boolean) Is bridge connected?",
    "Bridge",
    "isBridgeConnected",
    "Geeft een boolean terug die aangeeft of de Hue bridge verbonden is");

AddExpression(1, ef_return_string, "(Boolean) Is bridgeUser whitelisted?",
    "Bridge",
    "isWhitelisted",
    "Geeft een boolean terug of er permissie is om bepaalde acties uit te voeren");

AddExpression(2, ef_return_string, "(JSON) All available lights",
    "Lights",
    "lights",
    "Een JSON string met alle beschikbare lampen");

////////////////////////////////////////
ACESDone();

////////////////////////////////////////
// Array of property grid properties for this plugin
// new cr.Property(ept_integer,		name,	initial_value,	description)		// an integer value
// new cr.Property(ept_float,		name,	initial_value,	description)		// a float value
// new cr.Property(ept_text,		name,	initial_value,	description)		// a string
// new cr.Property(ept_color,		name,	initial_value,	description)		// a color dropdown
// new cr.Property(ept_font,		name,	"Arial,-16", 	description)		// a font with the given face name and size
// new cr.Property(ept_combo,		name,	"Item 1",		description, "Item 1|Item 2|Item 3")	// a dropdown list (initial_value is string of initially selected item)
// new cr.Property(ept_link,		name,	link_text,		description, "firstonly")		// has no associated value; simply calls "OnPropertyChanged" on click

var property_list = [
	//new cr.Property(ept_text, 	"Hue Bridge IP",		"<auto>",		"This specifies the Hue Bridge IP, type <auto> for automatic discovery.")
];

// Called by IDE when a new object type is to be created
function CreateIDEObjectType() {
    return new IDEObjectType();
}

// Class representing an object type in the IDE
function IDEObjectType() {
    assert2(this instanceof arguments.callee, "Constructor called as a function");
}

// Called by IDE when a new object instance of this type is to be created
IDEObjectType.prototype.CreateInstance = function (instance) {
    return new IDEInstance(instance);
}

// Class representing an individual instance of an object in the IDE
function IDEInstance(instance, type) {
    assert2(this instanceof arguments.callee, "Constructor called as a function");

    // Save the constructor parameters
    this.instance = instance;
    this.type = type;

    // Set the default property values from the property table
    this.properties = {};

    for (var i = 0; i < property_list.length; i++)
        this.properties[property_list[i].name] = property_list[i].initial_value;

    // Plugin-specific variables
    // this.myValue = 0...
}

// Called when inserted via Insert Object Dialog for the first time
IDEInstance.prototype.OnInserted = function () {
}

// Called when double clicked in layout
IDEInstance.prototype.OnDoubleClicked = function () {
}

// Called after a property has been changed in the properties bar
IDEInstance.prototype.OnPropertyChanged = function (property_name) {
}

// For rendered objects to load fonts or textures
IDEInstance.prototype.OnRendererInit = function (renderer) {
}

// Called to draw self in the editor if a layout object
IDEInstance.prototype.Draw = function (renderer) {
}

// For rendered objects to release fonts or textures
IDEInstance.prototype.OnRendererReleased = function (renderer) {
}
