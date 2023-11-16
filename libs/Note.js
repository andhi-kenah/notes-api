import fs from "fs";
import NodeCache from "node-cache";

const cacheNote = new NodeCache();

class Note {
    static getNotes = (userId) => {
        const databaseNote = `./database/notes-${user_id}.json`;
        try {
            if (!fs.existsSync(databaseNote)) {
                fs.writeFileSync(databaseNote, "[]");
                console.log("File " + databaseNote + " created");
            }

            let notes = cacheNote.get("notes");
            if (!notes) {
                notes = JSON.parse(
                    fs.readFileSync(`./database/notes-${userId}.json`, "utf8")
                );
                cacheNote.set("notes", notes);
            }

            return notes.length === 0 ? [] : notes;
        } catch (err) {
            console.log(err);
            throw new Error("Error from catch");
        }
    };

    static getNoteById = (userId, noteId) => {
        try {
            const notes = getNotes(userId);

            return notes === 0 ? [] : notes.find((n) => n.id === noteId);
        } catch (err) {
            console.log(err);
            throw new Error("Error from catch");
        }
    };

    static updateNote = (userId, noteId, newData) => {
        try {
            let notes = getNotes(userId);

            const noteIndex =
                notes.length === 0
                    ? null
                    : notes.findIndex((n) => n.id === noteId);

            notes[noteIndex] = {
                title: newData.title,
                content: newData.content,
                owner: userId,
                updated_at: new Date(Date.now()),
            };

            cacheNote.set("notes", notes);

            return notes[noteIndex];
        } catch (err) {
            console.log(err);
            throw new Error("Error from catch");
        }
    };

    static deleteNote = (userId, noteId) => {
        try {
            let notes = getNotes(userId);

            const noteIndex =
                notes.length === 0
                    ? null
                    : notes.findIndex((n) => n.id === noteId);

            let deletedNote = notes[noteIndex];

            notes.splice(noteIndex, 1);

            cacheNote.set("notes", notes);

            return deletedNote;
        } catch (err) {
            console.log(err);
            throw new Error("Error from catch");
        }
    };
}

export default Note;
