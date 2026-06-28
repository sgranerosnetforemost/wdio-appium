import { driver } from '@wdio/globals';
import AddNoteScreen from '../../screenobjects/android/add-note.screen.js';
import DeleteNoteScreen from '../../screenobjects/android/delete-note.screen.js';

describe('ColorNote Delete Note Tests with Screen Object', () => {
    it('Add a note, delete it and validate it in trash', async () => {
        const noteTitle = `Favorite Anime List ${Date.now()}`;
        const noteBody = 'one piece\nfruits basket\nhxh';
        const noteBodyLines = ['one piece', 'fruits basket', 'hxh'];

        await driver.pause(3000);

        await AddNoteScreen.createAndValidateNote(
            noteTitle,
            noteBody,
            noteBodyLines
        );

        await DeleteNoteScreen.deleteNoteAndValidateInTrash(noteTitle);

        await driver.pause(5000);
    });
});