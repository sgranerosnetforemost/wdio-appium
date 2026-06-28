import 'dotenv/config';
import { config as sharedConfig } from './wdio.shared.conf.js';

export const config = {
    ...sharedConfig,

    user: process.env.BROWSERSTACK_USERNAME,
    key: process.env.BROWSERSTACK_ACCESS_KEY,

    hostname: 'hub.browserstack.com',

    specs: [
        '../test/specs/android/delete-note-screen.spec.js'
    ],

    services: [
        ['browserstack', {
            app: process.env.BROWSERSTACK_APP_ID,
            testReporting: true,
            testReportingOptions: {
                projectName: 'WDIO Appium Learning',
                buildName: 'ColorNote Android BrowserStack Build'
            }
        }]
    ],

    capabilities: [{
        platformName: 'Android',

        'appium:deviceName': 'Samsung Galaxy S23',
        'appium:platformVersion': '13.0',
        'appium:automationName': 'UiAutomator2',
        'appium:autoGrantPermissions': true,

        'bstack:options': {
            projectName: 'WDIO Appium Learning',
            buildName: 'ColorNote Android BrowserStack Build',
            sessionName: 'Delete note test',
            debug: true,
            networkLogs: true
        }
    }]
};