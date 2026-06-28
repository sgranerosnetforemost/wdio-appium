describe('Android Native Features Tests', () => {
    it('Access an activity directly', async () => {
        await driver.startActivity(
            'io.appium.android.apis',
            'io.appium.android.apis.app.AlertDialogSamples'
        );

        await driver.pause(3000);

        const alertDialogTitle = await $('//android.widget.TextView[@text="App/Alert Dialogs"]');
        await expect(alertDialogTitle).toBeExisting();

        await driver.pause(3000);
    });

    it('Work with alert boxes', async () => {
        await driver.startActivity(
            'io.appium.android.apis',
            'io.appium.android.apis.app.AlertDialogSamples'
        );

        await driver.pause(2000);

        const firstDialogButton = await $('//android.widget.Button[@resource-id="io.appium.android.apis:id/two_buttons"]');
        await firstDialogButton.click();

        await driver.pause(2000);

        const alertText = await driver.getAlertText();
        console.log('Alert text is:', alertText);

        await driver.acceptAlert();

        await driver.pause(2000);

        const alertTitle = await $$('//android.widget.TextView[@resource-id="android:id/alertTitle"]');
        await expect(alertTitle).toHaveLength(0);

        await driver.pause(3000);
    });

    it('Vertical scrolling', async () => {
    // Start from main API Demos screen
    await driver.startActivity(
        'io.appium.android.apis',
        'io.appium.android.apis.ApiDemos'
    );

    await driver.pause(2000);

    // Go to App
    const appOption = await $('~App');
    await appOption.click();

    await driver.pause(2000);

    // Go to Activity
    const activityOption = await $('~Activity');
    await activityOption.click();

    await driver.pause(2000);

    // Scroll until Secure Surfaces is visible
    const secureSurfacesOption = await $('android=new UiScrollable(new UiSelector().scrollable(true)).scrollTextIntoView("Secure Surfaces")');
    await secureSurfacesOption.click();

    await driver.pause(2000);

    // Validate that Secure Dialog screen is displayed
    const secureDialogText = await $('//android.widget.TextView[@text="Secure Dialog"]');
    await expect(secureDialogText).toBeExisting();

    await driver.pause(3000);
it.only('Horizontal scrolling visual test', async () => {
    // Start from main API Demos screen
    await driver.startActivity(
        'io.appium.android.apis',
        'io.appium.android.apis.ApiDemos'
    );

    await driver.pause(3000);

    // Go to Views
    const viewsOption = await $('~Views');
    await viewsOption.click();

    await driver.pause(2000);

    // Scroll vertically until Gallery is visible
    const galleryOption = await $('android=new UiScrollable(new UiSelector().scrollable(true)).scrollTextIntoView("Gallery")');
    await galleryOption.click();

    await driver.pause(2000);

    // Go to 1. Photos
    const photosOption = await $('~1. Photos');
    await photosOption.click();

    await driver.pause(3000);

    // Get screen size
    const { width, height } = await driver.getWindowSize();

    // Coordinates for horizontal gallery area
    const startX = Math.floor(width * 0.80);
    const endX = Math.floor(width * 0.20);
    const y = Math.floor(height * 0.35);

    // Swipe left slowly
    await driver.performActions([
        {
            type: 'pointer',
            id: 'finger1',
            parameters: { pointerType: 'touch' },
            actions: [
                { type: 'pointerMove', duration: 0, x: startX, y: y },
                { type: 'pointerDown', button: 0 },
                { type: 'pause', duration: 500 },
                { type: 'pointerMove', duration: 2500, x: endX, y: y },
                { type: 'pointerUp', button: 0 }
            ]
        }
    ]);

    await driver.pause(3000);

    // Swipe right slowly
    await driver.performActions([
        {
            type: 'pointer',
            id: 'finger1',
            parameters: { pointerType: 'touch' },
            actions: [
                { type: 'pointerMove', duration: 0, x: endX, y: y },
                { type: 'pointerDown', button: 0 },
                { type: 'pause', duration: 500 },
                { type: 'pointerMove', duration: 2500, x: startX, y: y },
                { type: 'pointerUp', button: 0 }
            ]
        }
    ]);

    await driver.pause(3000);
});
it.only('Exercise - Date Picker', async () => {
    // Start Date Widgets Dialog screen directly
    await driver.startActivity(
        'io.appium.android.apis',
        'io.appium.android.apis.view.DateWidgets1'
    );

    await driver.pause(3000);

    // Get current date text
    const currentDate = await $('//android.widget.TextView[@resource-id="io.appium.android.apis:id/dateDisplay"]');
    const oldDateText = await currentDate.getText();

    console.log('Old date:', oldDateText);

    // Open Date Picker
    const changeDateButton = await $('//android.widget.Button[@resource-id="io.appium.android.apis:id/pickDate"]');
    await changeDateButton.click();

    await driver.pause(3000);

    // Swipe horizontally to next month
    const { width, height } = await driver.getWindowSize();

    const startX = Math.floor(width * 0.80);
    const endX = Math.floor(width * 0.20);
    const y = Math.floor(height * 0.45);

    await driver.performActions([
        {
            type: 'pointer',
            id: 'finger1',
            parameters: { pointerType: 'touch' },
            actions: [
                { type: 'pointerMove', duration: 0, x: startX, y: y },
                { type: 'pointerDown', button: 0 },
                { type: 'pause', duration: 500 },
                { type: 'pointerMove', duration: 1500, x: endX, y: y },
                { type: 'pointerUp', button: 0 }
            ]
        }
    ]);

    await driver.pause(3000);

    // Select a date from next month
    const dateToSelect = await $('//android.view.View[@text="10"]');
    await dateToSelect.click();

    await driver.pause(2000);

    // Click OK
    const okButton = await $('//android.widget.Button[@resource-id="android:id/button1"]');
    await okButton.click();

    await driver.pause(2000);

    // Get updated date text
    const newDateText = await currentDate.getText();

    console.log('New date:', newDateText);

    // Validate date changed
    await expect(newDateText).not.toEqual(oldDateText);

    await driver.pause(3000);
});
});
});