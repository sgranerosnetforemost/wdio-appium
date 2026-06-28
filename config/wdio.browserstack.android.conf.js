import 'dotenv/config';
import { config as sharedConfig } from './wdio.shared.conf.js';

export const config = {
    ...sharedConfig,

    user: process.env.BROWSERSTACK_USERNAME,
    key: process.env.BROWSERSTACK_ACCESS_KEY,

    protocol: 'https',
    hostname: 'hub.browserstack.com',
    port: 443,
    path: '/wd/hub',

    specs: [
        '../test/specs/android/delete-note-screen.spec.js'
    ],

    services: [],

    capabilities: [{
        platformName: 'Android',

        'appium:app': process.env.BROWSERSTACK_APP_ID,
        'appium:deviceName': 'Samsung Galaxy S23',
        'appium:platformVersion': '13.0',
        'appium:automationName': 'UiAutomator2',
        'appium:autoGrantPermissions': true,

        'bstack:options': {
            projectName: 'WDIO Appium Learning',
            buildName: 'ColorNote Android BrowserStack Build',
            sessionName: 'Delete note test',
            debug: true,
            networkLogs: true,
            video: true,
            deviceLogs: true,
            appiumLogs: true
        }
    }]
};