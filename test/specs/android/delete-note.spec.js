describe('ColorNote Android Tests', () => {
    it('Add a note, delete it and validate it in trash', async () => {
        const noteTitle = 'Favorite Anime List';
        const noteBody = 'one piece\nfruits basket\nhxh';

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

        // Add title and body
        const editTextFields = await $$('android.widget.EditText');

        await editTextFields[0].setValue(noteTitle);
        await editTextFields[1].setValue(noteBody);

        await driver.pause(3000);

        // Save changes: first back closes keyboard, second back saves note
        await driver.back();
        await driver.pause(1000);

        await driver.back();
        await driver.pause(3000);

        // Validate note was created
        const savedTitle = await $(`//*[contains(@text, "${noteTitle}")]`);
        await expect(savedTitle).toBeDisplayed();

        const savedContent = await $('//*[contains(@text, "one piece")]');
        const savedContentText = await savedContent.getText();

        await expect(savedContentText).toContain('one piece');
        await expect(savedContentText).toContain('fruits basket');
        await expect(savedContentText).toContain('hxh');

        // Open created note
        await savedTitle.click();

        await driver.pause(5000);

        // Open more options menu
        const moreOptionsSelectors = [
            '~More options',
            '~Más opciones',
            '//*[@content-desc="More options"]',
            '//*[@content-desc="Más opciones"]',
            '//*[contains(@content-desc, "More")]',
            '//*[contains(@content-desc, "opciones")]',
            '//*[contains(@resource-id, "menu_more")]',
            '//*[contains(@resource-id, "more")]',
            '//android.widget.ImageButton'
        ];

        let moreOptionsButton;

        for (const selector of moreOptionsSelectors) {
            const elements = await $$(selector);

            if (elements.length > 0) {
                moreOptionsButton = elements[elements.length - 1];
                break;
            }
        }

        await expect(moreOptionsButton).toBeDefined();

        await moreOptionsButton.click();

        await driver.pause(2000);

        // Click Delete / Eliminar
        const deleteOption = await $(
            '//*[contains(@text, "Delete") or contains(@text, "Eliminar") or contains(@text, "Borrar")]'
        );

        await deleteOption.click();

        await driver.pause(2000);

        // Confirm delete
        const okButton = await $(
            '//*[contains(@text, "OK") or contains(@text, "Ok") or contains(@text, "Aceptar") or contains(@text, "Sí") or contains(@text, "Yes")]'
        );

        await okButton.click();

        await driver.pause(3000);

        // Open navigation/menu drawer
        const menuSelectors = [
            '~Open navigation drawer',
            '~Abrir panel de navegación',
            '//*[@content-desc="Open navigation drawer"]',
            '//*[@content-desc="Abrir panel de navegación"]',
            '//*[contains(@content-desc, "navigation")]',
            '//*[contains(@content-desc, "navegación")]',
            '//android.widget.ImageButton'
        ];

        let menuButton;

        for (const selector of menuSelectors) {
            const elements = await $$(selector);

            if (elements.length > 0) {
                menuButton = elements[0];
                break;
            }
        }

        await expect(menuButton).toBeDefined();

        await menuButton.click();

        await driver.pause(2000);

        // Open Trash / Papelera
        const trashOption = await $(
            '//*[contains(@text, "Trash") or contains(@text, "Papelera")]'
        );

        await trashOption.click();

        await driver.pause(3000);

        // Validate deleted note is in trash
        const deletedNoteTitle = await $(`//*[contains(@text, "${noteTitle}")]`);
        await expect(deletedNoteTitle).toBeDisplayed();

        await driver.pause(5000);
    });
});