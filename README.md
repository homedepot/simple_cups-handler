# simple_cups-handler
This is a basic node js app to monitor printer activity via a CUPS RSS subscription.

## Introduction 
[CUPS (Common Unix Printing System)](https://www.cups.org/) is a very helpful tool to monitor and interact with printers progamatically. It can be accessed in most Mac and Linux machines by going to http://localhost:631 .  This will go to a web UI of the machine's printing system. There the user can configure and interact with the printers stored and connnected to said system. 

This application is meant as a basic foundation for interacting with CUPS and the printers programatically. It talks to the printers using IPP (Internet Printing Protocol). You can add more IPP commands to the code as you please. A list of available commands can be found [here](https://www.cups.org/doc/spec-ipp.html). 

What this application does out of the box is listen for the RSS data from a CUPS subscription (in this case it is a printer subscription). It then takes that data and makes an IPP Get-Printer-Attributes call to said printer. Finally, it creates a simple Printer JSON object and stores that data to a JSON file which then has a history of statuses of the printers.

## Getting Started

### Prerequisite 
 - Mac or Linux OS
 - Node.js (min. version 10)
 
### Installation
- Clone this repository to desired directory
- run `cups_subscription_script.sh` (make sure it has access to execute. You can use the `chmod` to do this.)
- run `npm install` to install the packages needed. 

Running the `cups_subscription_script.sh` script will add a CUPS subscription alongside the default values that are meant for this application. You only need to subscribe once.

## Usage
### Application Modes
There are six different modes this program can run in. The differences between modes are cosmetic only. None of the functionality changes between modes. These colors and styles can easily be changed and customized in the `debugger_logs.js` file.
- `npm start` This is the default mode that has no color or style changes on the logs.
- `npm run light-mode` Runs the application for a light colored terminal window.
- `npm run dark-mode` Runs the application for a dark colored terminal window.
- `npm run debug` Includes the debug logs with no color or style changes.
- `npm run debug-light-mode` Includes debug logs for a light colored terminal window.
- `npm run debug-dark-mode` Includes debug logs for a dark colored terminal window.

### CUPS Interaction with Application
Once you run the `cups_subscription_script.sh` script, RSS data will be sent to the simple_cups-handler. The list of triggered printer actions can be found [here](https://www.cups.org/doc/spec-ipp.html#CREATE_PRINTER_SUBSCRIPTION). The easiest way to see this interaction is to pause and resume the printer on the CUPS web UI. This is found under the `Maintenance` drop down of a printer at http://localhost:631/printers/[printer_name] and you would select either `Pause Printer` or `Resume Printer`.

## Customization
### DebuggerLog
As mentioned before, the color and style of the console logs can be changed for the developer's personal preference. Here is how it can be done: 
 - Stack a style and/or colors before the string you want to affect.
 - - For example, if you want bold black text, use `bold_text + black_text`
 - - Or if you want italic white text with a megenta background, use `italic_text + white_text + megenta_bg`
 - After the string, use `reset_all` to go back to the terminal's original colors. If you don't, those changed colors will presist.

## Maintainers

Admin: Mary Langmack Schnupp <mary_l_schnupp@homedepot.com>

## License

Apache2

## Credit

- [Express](https://expressjs.com/)
- [Express-xml-bodyparser](https://www.npmjs.com/package/express-xml-bodyparser)
- [ipp node library](https://www.npmjs.com/package/ipp)
- [xml-js](https://www.npmjs.com/package/xml-js)
