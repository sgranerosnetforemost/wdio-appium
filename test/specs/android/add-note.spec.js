describe('ColorNote Android Tests', () => {
    it('Add a note, save changes and validate note content', async () => {
        await driver.pause(3000);

        // Skip tutorial / onboarding if it appears
        const skipButtons = await $$(
            '//*[contains(@text, "SKIP") or contains(@text, "Skip") or contains(@text, "SALTAR") or contains(@text, "Omitir")]'
        );

        if (skipButtons.length > 0) {
            await skipButtons[0].click();
            await driver.pause(3000);
        }

        // Click Add note / Crear una nueva nota
        const addNoteButton = await $(
            '//*[contains(@text, "Add note") or contains(@text, "Crear una nueva nota") or contains(@text, "nueva nota")]'
        );
        await addNoteButton.click();

        await driver.pause(2000);

        // Select Text note option
        const textOption = await $(
            '//*[contains(@text, "Text") or contains(@text, "Texto")]'
        );
        await textOption.click();

        await driver.pause(3000);

        // Get title and body input fields
        const editTextFields = await $$('android.widget.EditText');

        // Add note title
        await editTextFields[0].setValue('Favorite Anime List');

        // Add note body
        await editTextFields[1].setValue('one piece\nfruits basket\nhxh');

        await driver.pause(3000);

        // Save changes: first back closes keyboard, second back saves note
        await driver.back();
        await driver.pause(1000);

        await driver.back();
        await driver.pause(3000);

        // Validate saved title
        const savedTitle = await $('//*[contains(@text, "Favorite Anime List")]');
        await expect(savedTitle).toBeDisplayed();

        // Validate saved body/content
        const savedContent = await $('//*[contains(@text, "one piece")]');
        const savedContentText = await savedContent.getText();

        await expect(savedContentText).toContain('one piece');
        await expect(savedContentText).toContain('fruits basket');
        await expect(savedContentText).toContain('hxh');

        await driver.pause(5000);
    });
});