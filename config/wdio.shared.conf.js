export const config = {
    runner: 'local',

    exclude: [],

    services: ['appium'],

    framework: 'mocha',

    reporters: ['spec'],

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
};