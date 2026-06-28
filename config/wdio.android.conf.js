import path from 'node:path';
import { config as sharedConfig } from './wdio.shared.conf.js';

export const config = {
    ...sharedConfig,

    port: 4723,

    specs: [
        '../test/specs/android/delete-note-screen.spec.js'
    ],

    capabilities: [{
        platformName: 'Android',
        'appium:platformVersion': '10.0',
        'appium:deviceName': 'Pixel 4 XL',
        'appium:automationName': 'UiAutomator2',
        'appium:app': path.join(process.cwd(), 'app/android/ColorNote+Notepad.apk'),
        'appium:autoGrantPermissions': true
    }]
};