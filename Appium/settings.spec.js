const assert = require('assert');

describe('Settings Application', () => {

    // ===== Selectors =====
    const searchSettings =
        'id=com.android.settings:id/search_action_bar';

    const networkAndInternet =
        'android=new UiSelector().text("Network & internet")';

    const apps =
        '//android.widget.TextView[@resource-id="android:id/title" and @text="Apps"]';

    it('Verify Settings home screen displays correctly', async () => {

        // Verify Search Settings is displayed
        const searchBox = await $(searchSettings);
        await searchBox.waitForDisplayed({ timeout: 10000 });

        assert.strictEqual(
            await searchBox.isDisplayed(),
            true,
            'Search Settings should be displayed'
        );

        // Verify "Network & internet" item exists
        const networkItem = await $(networkAndInternet);
        await networkItem.waitForDisplayed({ timeout: 5000 });

        assert.strictEqual(
            await networkItem.isDisplayed(),
            true,
            'Network & internet should be displayed'
        );

        // Verify "Apps" item exists
        const appsItem = await $(apps);
        await appsItem.waitForDisplayed({ timeout: 5000 });

        assert.strictEqual(
            await appsItem.isDisplayed(),
            true,
            'Apps should be displayed'
        );
    });

});