//=================================================================
//  Copyright 2019 Mary Langmack Schnupp under The Home Depot
//
//  Licensed under the Apache License, Version 2.0 (the "License");
//   you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at
//       http://www.apache.org/licenses/LICENSE-2.0
//   Unless required by applicable law or agreed to in writing, software
//   distributed under the License is distributed on an "AS IS" BASIS,
//   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
//   limitations under the License.
//
//   The main file for the simple_cups-handler.
//
//=================================================================

const express = require('express')
const ipp = require('ipp');
const fs = require('fs');
const xmlparser = require('express-xml-bodyparser');
const convert = require('xml-js');
const Printer = require('./printer_obj.js');
const DebuggerLog = require('./debugger_logs.js');

const app = express()
const port = 4441
const CUPS_HOST = 'localhost';
const CUPS_PORT = 631;
const file_output_path = './printer_states.json';
var debug_log;
app.use(xmlparser()); //<--- Allow XML Body parse for the RSS feed

//<--- Index page
app.get('/', (req, res) => {
    res.send('Hello to Simple CUPS-Handler');
});

//<--- RSS Ping
app.get('/rss_feed_printer', (req, res) => {
    res.sendStatus(200);
});

//<--- RSS Data
app.put('/rss_feed_printer', (req, res) => {
    debug_log.debug_string(JSON.stringify(req.headers), "REQUEST HEADERS");

    //<--- Parse PUT XMl Body
    let body1 = '';
    req.on('data', chunk => {
        body1 += chunk.toString();
    });
    req.on('end', () => {
        debug_log.debug_string(body1, "RSS XML");

        let json_rss = convert.xml2js(body1, {compact: true, spaces: 2});
        let json_string = JSON.stringify(json_rss, null, 2);
        debug_log.debug_string(json_string, "JSON BODY");

        if( 'channel' in json_rss.rss == false || 'item' in json_rss.rss.channel == false ) {
            debug_log.debug_string("Item Title Not Found.");
            res.end();
            return;
        }

        let printer_name = "";
        if(json_rss.rss.channel.item.constructor === Array) {
            printer_name = json_rss.rss.channel.item[0].title._text.substring(9);
        } else {
            printer_name = json_rss.rss.channel.item.title._text.substring(9);
        }
        debug_log.debug_string(printer_name);
        printer_name = printer_name.substring(0, printer_name.indexOf(" "));
        debug_log.debug_string(printer_name);

        let printers_url = "http://"+CUPS_HOST+":"+CUPS_PORT+"/printers/" + printer_name;

        // IPP command
        const ipp_data = ipp.serialize({
            "operation":"Get-Printer-Attributes",
            "operation-attributes-tag": {
                "attributes-charset": "utf-8",
                "attributes-natural-language": "en",
                "printer-uri": printers_url
            }
        });

        let printer_data = ipp.request(printers_url, ipp_data, function(err, callback) {
            if(err) {
                return debug_log.error_string(err);
            }
            debug_log.debug_string(JSON.stringify(callback, null, 2), "IPP RESULT");

            let curr_printer = new Printer(JSON.stringify(callback, null, 2));
            debug_log.result_string(JSON.stringify(curr_printer), "Printer Object");

            write_data_to_file(curr_printer);
            res.send(JSON.stringify(curr_printer, null, 2));
        });
    });
});

app.listen(port, () => {
    let useDebug = process.argv[2] && (process.argv[2] === '--debug');
    let logMode = 'headless';
    if(process.argv[3] && (process.argv[3] === '--dark' || process.argv[3] === '--light')) {
        logMode = process.argv[3].substring(2);
    } else if (process.argv[2] && (process.argv[2] === '--dark' || process.argv[2] === '--light')){
        logMode = process.argv[2].substring(2);
    }
    debug_log = new DebuggerLog(useDebug, logMode);

    console.log(`---------------------------------------------------------------------`);
    console.log('|');
    console.log(`| \x1b[3mWelcome to Simple CUPS-Handler.\x1b[0m Your app is listening on port \x1b[1m${port}\x1b[0m`);
    console.log('|');
    console.log(`---------------------------------------------------------------------`);
    debug_log.debug_string("*** Debugging logs enabled ***", "ON");
});

function write_data_to_file(data) {
    debug_log.info_string(JSON.stringify(data), "WRITE TO FILE");
    let new_data = "";
    let file_data = "";
    if(fs.existsSync(file_output_path)) {
       file_data = fs.readFileSync(file_output_path);
    }
    debug_log.debug_string(file_data, "FILE DATA");
    let fd = fs.openSync(file_output_path, 'w+');  //<--- creates files if it does not exist
    if(file_data.length === 0) {
       let new_array = [];
       new_array.push(data);
       debug_log.debug_string(JSON.stringify(new_array), "NEW ARRAY")
       new_data = JSON.stringify(new_array);
    } else {
       let json_data = JSON.parse(file_data);
       if(json_data.constructor === Array) {
           json_data.push(data);
           debug_log.debug_string(JSON.stringify(json_data), "ARRAY DATA")
           new_data = JSON.stringify(json_data);
       }
    }
    fs.writeFileSync(file_output_path, new_data);
    fs.closeSync(fd);
   };
