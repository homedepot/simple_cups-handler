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
//  This util is meant to customize console logs for the developer's 
//  personal likely for more readable logs to improve performace.
//
//=================================================================

let reset_all = '\x1b[0m'; //<--- return console to default style, text, and bg
let start_style = '\x1b[';

//<--- Styles
let bold_text = start_style + '1m';
let dim_text = start_style + '2m';
let italic_text = start_style + '3m';
let underscore_text = start_style + '4m';
let blink_text = start_style + '5m';
let reverse_color = start_style + '7m';
let hide_text = start_style + '8m';
let crossout_text = start_style + '9m';

//<--- forground colors
let black_text = start_style + '30m';
let red_text = start_style + '31m';
let green_text = start_style + '32m';
let yellow_text = start_style + '33m';
let blue_text = start_style + '34m';
let megenta_text = start_style + '35m';
let cyan_text = start_style + '36m';
let white_text = start_style + '37m';
let reset_text = start_style + '39m'; //<--- this will only reset the text color, style and bg color will remain.

//<--- background colors
let black_bg = start_style + '40m';
let red_bg = start_style + '41m';
let green_bg = start_style + '42m';
let yellow_bg = start_style + '43m';
let blue_bg = start_style + '44m';
let megenta_bg = start_style + '45m';
let cyan_bg = start_style + '46m';
let white_bg = start_style + '47m';
let reset_bg = start_style + '49m'; //<--- This will only reset the bg color, style and text color will remain.
 
class DebuggerLog {
    constructor(useDebug=false, logMode='headless') {
        this.doDebug = useDebug !== undefined ? useDebug : false;
        this.whichLogMode = logMode !== undefined ? logMode : 'headless';
    }
    
    debug_string(message, title="") {
        if(this.doDebug) {
            if(this.whichLogMode === 'light') {
                console.log(bold_text + blue_text + `---------------- DEBUG %s ------------------------`+ reset_all, title);
                console.log(dim_text + blue_text+ '%s'+ reset_all, message);
            } else if(this.whichLogMode === 'dark') {
                console.log(bold_text + cyan_text + `---------------- DEBUG %s ------------------------` + reset_all, title);
                console.log(dim_text + cyan_text + '%s' + reset_all, message);
            } else {
                console.log(`---------------- DEBUG %s ------------------------`, title);
                console.log('%s', message);
            }
        }
    }
    
    info_string(message, title="") {
        if(this.whichLogMode === 'light') {
            console.log(bold_text + black_text + "---------------- INFO %s ------------------------"+ reset_all, title);
            console.log(dim_text + black_text+ '%s'+ reset_all, message);
        } else if(this.whichLogMode === 'dark') {
            console.log(bold_text + white_text +`---------------- INFO %s ------------------------` + reset_all, title);
            console.log(dim_text + white_text +'%s' + reset_all, message);
        } else {
            console.log("---------------- INFO %s ------------------------", title);
            console.log('%s', message);
        }
    }

    error_string(message, title="") {
        if(this.whichLogMode === 'headless') {
            console.log("---------------- ERROR %s ------------------------", title);
            console.log('%s', message);
        } else {
            console.log(bold_text + red_text + "---------------- ERROR %s ------------------------"+ reset_all, title);
            console.log(red_text + '%s'+ reset_all, message);
        }
    }

    result_string(message, title) {
        if(this.whichLogMode === 'headless') {
            console.log("---------------- RESULT %s ------------------------", title);
            console.log('%s', message);
        } else {
            console.log(bold_text + green_text + "---------------- RESULT %s ------------------------" + reset_all, title);
            console.log(green_text + '%s'+ reset_all, message);
        }
    }
}

module.exports = DebuggerLog;