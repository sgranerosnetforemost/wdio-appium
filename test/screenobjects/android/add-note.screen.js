import { $, $$, driver, expect } from '@wdio/globals';

class AddNoteScreen {
    get addNoteButton() {
        return $('//*[contains(@text, "Add note") or contains(@text, "Crear una nueva nota") or contains(@text, "nueva nota")]');
    }

    get textOption() {
        return $('//*[contains(@text, "Text") or contains(@text, "Texto")]');
    }

    async skipTutorialIfVisible() {
        const skipButtons = await $$(
            '//*[contains(@text, "SKIP") or contains(@text, "Skip") or contains(@text, "SALTAR") or contains(@text, "Omitir")]'
        );

        if (skipButtons.length > 0) {
            await skipButtons[0].click();
            await driver.pause(3000);
        }
    }

    async openTextNoteCreation() {
        await this.addNoteButton.click();
        await driver.pause(2000);

        await this.textOption.click();
        await driver.pause(3000);
    }

    async addNoteTitleAndBody(title, body) {
        const editTextFields = await $$('android.widget.EditText');

        await editTextFields[0].setValue(title);
        await editTextFields[1].setValue(body);

        await driver.pause(3000);
    }

    async saveNote() {
        await driver.back();
        await driver.pause(1000);

        await driver.back();
        await driver.pause(3000);
    }

    async validateSavedNote(title, bodyLines) {
        const savedTitle = await $(`//*[contains(@text, "${title}")]`);
        await expect(savedTitle).toBeDisplayed();

        const savedContent = await $('//*[contains(@text, "one piece")]');
        const savedContentText = await savedContent.getText();

        for (const line of bodyLines) {
            await expect(savedContentText).toContain(line);
        }
    }

    async createAndValidateNote(title, body, bodyLines) {
        await this.skipTutorialIfVisible();
        await this.openTextNoteCreation();
        await this.addNoteTitleAndBody(title, body);
        await this.saveNote();
        await this.validateSavedNote(title, bodyLines);
    }
}

export default new AddNoteScreen();