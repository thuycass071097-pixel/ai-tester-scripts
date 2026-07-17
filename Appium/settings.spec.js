const assert = require('assert');

describe('Settings App', () => {

    it('Verify Settings home screen is displayed', async () => {

        // Search Settings
        const searchBar = await $('id=com.android.settings:id/search_action_bar');
        await searchBar.waitForDisplayed({
            timeout: 10000
        });

        assert.strictEqual(await searchBar.isDisplayed(), true);

    });

    it('Verify at least 3 setting items are displayed', async () => {

        // Lấy tất cả title của các setting
        const settingItems = await $$('//android.widget.TextView[@resource-id="android:id/title"]');

        assert.ok(
            settingItems.length >= 3,
            `Expected at least 3 items but found ${settingItems.length}`
        );

    });

});