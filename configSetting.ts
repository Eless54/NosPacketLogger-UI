"use strict";
import * as nconf from 'nconf';

function saveSettings(settingKey, settingValue) {
    nconf.set(settingKey, settingValue);
    nconf.save(settingKey, settingValue);
}

function readSettings(settingKey) {
    nconf.load();
    return nconf.get(settingKey);
}

function getUserHome() {
    return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}

const configuration = {
    saveSettings: saveSettings,
    readSettings: readSettings,
    getUserHome: getUserHome
};

export default configuration