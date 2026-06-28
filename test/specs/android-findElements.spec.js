describe('Android Elements Tests', () => {
    it('Find element by accessibility id', async () => {
        const appOption = await $('~App');
        await appOption.click();

        const actionBar = await $('~Action Bar');
        await expect(actionBar).toBeExisting();

        await driver.pause(3000);

        await driver.back();

        await driver.pause(2000);
    });

    it('Find element by class name and click Animation', async () => {
        const textViews = await $$('android.widget.TextView');

        for (const element of textViews) {
            const text = await element.getText();

            console.log('TextView found:', text);

            if (text === 'Animation') {
                await element.click();
                break;
            }
        }

        const bouncingBallsOption = await $('~Bouncing Balls');
        await expect(bouncingBallsOption).toBeExisting();

        await driver.pause(3000);

        await driver.back();

        await driver.pause(2000);
    });

    it('Find elements by XPath', async () => {
        const appOption = await $('~App');
        await appOption.click();

        await driver.pause(2000);

        const alertDialogsOption = await $('//android.widget.TextView[@content-desc="Alert Dialogs"]');
        await alertDialogsOption.click();

        await driver.pause(2000);

        const listDialogButton = await $('//android.widget.Button[@resource-id="io.appium.android.apis:id/select_button"]');
        await listDialogButton.click();

        await driver.pause(2000);

        const commandTwoOption = await $('//android.widget.TextView[@text="Command two"]');
        await commandTwoOption.click();

        await driver.pause(2000);

        const selectedMessage = await $('//android.widget.TextView[@text="You selected: 1 , Command two"]');
        await expect(selectedMessage).toBeExisting();

        await driver.pause(3000);

        await driver.back();
        await driver.pause(1000);

        await driver.back();
        await driver.pause(1000);

        await driver.back();
        await driver.pause(2000);
    });

    it('Find element by Android UiAutomator', async () => {
        const animationOption = await $('android=new UiSelector().text("Animation")');
        await animationOption.click();

        await driver.pause(2000);

        const bouncingBallsOption = await $('android=new UiSelector().textContains("Bouncing")');
        await expect(bouncingBallsOption).toBeExisting();

        await driver.pause(3000);

        await driver.back();

        await driver.pause(2000);
    });

    it('Find multiple elements', async () => {
        const expectedList = [
            'API Demos',
            "Access'ibility",
            'Accessibility',
            'Animation',
            'App',
            'Content',
            'Graphics',
            'Media',
            'NFC',
            'OS',
            'Preference',
            'Text',
            'Views'
        ];

        const actualList = [];

        const textViews = await $$('android.widget.TextView');

        for (const element of textViews) {
            const text = await element.getText();
            actualList.push(text);

            console.log('Multiple element text:', text);
        }

        await expect(actualList).toEqual(expectedList);

        await driver.pause(3000);
    });

    it('Work with text field', async () => {
        // Go to Views
        const viewsOption = await $('~Views');
        await viewsOption.click();

        await driver.pause(2000);

        // Go to Auto Complete
        const autoCompleteOption = await $('~Auto Complete');
        await autoCompleteOption.click();

        await driver.pause(2000);

        // Go to Screen Top
        const screenTopOption = await $('~1. Screen Top');
        await screenTopOption.click();

        await driver.pause(2000);

        // Find input field by resource-id
        const countryInput = await $('//android.widget.EditText[@resource-id="io.appium.android.apis:id/edit"]');

        // Add text
        await countryInput.addValue('Canada');

        await driver.pause(2000);

        // Validate text
        await expect(countryInput).toHaveText('Canada');

        await driver.pause(3000);

        // Go back to main screen
        await driver.back();
        await driver.pause(1000);

        await driver.back();
        await driver.pause(1000);

        await driver.back();
        await driver.pause(2000);
    });
});