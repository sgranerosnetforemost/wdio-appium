describe('Android Date Picker Exercise', () => {
    it('Exercise - Date Picker', async () => {
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

        // Get screen size
        const { width, height } = await driver.getWindowSize();

        // Coordinates to swipe horizontally to next month
        const startX = Math.floor(width * 0.80);
        const endX = Math.floor(width * 0.20);
        const y = Math.floor(height * 0.45);

        // Swipe left slowly to move to next month
        await driver.performActions([
            {
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: startX, y: y },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pause', duration: 500 },
                    { type: 'pointerMove', duration: 2000, x: endX, y: y },
                    { type: 'pointerUp', button: 0 }
                ]
            }
        ]);

        await driver.pause(3000);

        // Select day 10 from the next month
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