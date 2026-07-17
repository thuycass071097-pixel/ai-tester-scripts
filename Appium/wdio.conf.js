exports.config = {
    runner: 'local',

    hostname: '127.0.0.1',
    port: 4723,
    path: '/',

    specs: [
        './**/*.js'
    ],

    maxInstances: 1,

    capabilities: [{
        platformName: 'Android',
        'appium:automationName': 'UiAutomator2',
        'appium:deviceName': 'Android Emulator',
        'appium:platformVersion': '13',
        'appium:appPackage': 'com.android.settings',
        'appium:appActivity': '.Settings',
        'appium:noReset': true
    }],

    logLevel: 'info',

    framework: 'mocha',

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
};