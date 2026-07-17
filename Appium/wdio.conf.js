exports.config = {
    runner: 'local',

    hostname: '127.0.0.1',
    port: 4723,
    path: '/',

    specs: [
        './test/specs/settings.spec.js'
    ],

    maxInstances: 1,

    capabilities: [{
        platformName: 'Android',
        'appium:automationName': 'UiAutomator2',
        'appium:deviceName': 'Android Emulator',
        'appium:appPackage': 'com.android.settings',
        'appium:platformVersion': '13',
        'appium:appActivity': '.Settings',
        'appium:noReset': true,
        'appium:newCommandTimeout': 240
    }],

    logLevel: 'info',

    framework: 'mocha',

    reporters: ['spec'],

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
};