import { $, $$, driver, expect } from '@wdio/globals';

class DeleteNoteScreen {
    async openCreatedNote(title) {
        const savedTitle = await $(`//*[contains(@text, "${title}")]`);
        await savedTitle.click();

        await driver.pause(5000);
    }

    async openMoreOptionsMenu() {
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
    }

    async deleteNote() {
        const deleteOption = await $(
            '//*[contains(@text, "Delete") or contains(@text, "Eliminar") or contains(@text, "Borrar")]'
        );

        await deleteOption.click();

        await driver.pause(2000);

        const okButton = await $(
            '//*[contains(@text, "OK") or contains(@text, "Ok") or contains(@text, "Aceptar") or contains(@text, "Sí") or contains(@text, "Yes")]'
        );

        await okButton.click();

        await driver.pause(3000);
    }

    async openNavigationDrawer() {
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
    }

    async openTrash() {
        const trashOption = await $(
            '//*[contains(@text, "Trash") or contains(@text, "Papelera")]'
        );

        await trashOption.click();

        await driver.pause(3000);
    }

    async validateDeletedNoteInTrash(title) {
        const deletedNoteTitle = await $(`//*[contains(@text, "${title}")]`);
        await expect(deletedNoteTitle).toBeDisplayed();
    }

    async deleteNoteAndValidateInTrash(title) {
        await this.openCreatedNote(title);
        await this.openMoreOptionsMenu();
        await this.deleteNote();
        await this.openNavigationDrawer();
        await this.openTrash();
        await this.validateDeletedNoteInTrash(title);
    }
}

export default new DeleteNoteScreen();