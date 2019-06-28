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
//   Take the JSON object blob from the IPP result and makes a printer object out of it.
//
//=================================================================


class Printer {
    constructor(json_string_blob) {
        let json_object = JSON.parse(json_string_blob);

        this.printer_name = json_object['printer-attributes-tag']['printer-name'];
        this.printer_shared = json_object['printer-attributes-tag']['printer-is-shared'];
        this.printer_state = json_object['printer-attributes-tag']['printer-state'];
        this.printer_state_massage = json_object['printer-attributes-tag']['printer-state-message'];
        this.printer_ipp_uri = json_object['printer-attributes-tag']['printer-uri-supported'];
        this.printer_device_uri = json_object['printer-attributes-tag']['device-uri'];
        this.printer_make_model = json_object['printer-attributes-tag']['printer-make-and-model'];
        this.printer_desc = json_object['printer-attributes-tag']['printer-info'];
        this.printer_updated = json_object['printer-attributes-tag']['printer-state-change-date-time'];
        this.printer_current_time = json_object['printer-attributes-tag']['printer-current-time'];
    }
}

module.exports = Printer;