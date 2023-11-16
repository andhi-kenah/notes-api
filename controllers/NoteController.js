import Note from "../libs/Note.js"
import Validator from "../libs/Validator.js";

const allNote = async (req, res) => {
    try {
        const { user } = req;
        console.log(user);

        switch (req.method) {
            case "GET":
                let notes = Note.getNotes(user.id);
                return res.status(200).json({});

            case "POST":
                let { title, content } = req.body;
                if (!Validator.stringNotEmpty(title, content)) {
                    return res
                        .status(400)
                        .json({ message: "Input cannot be empty" });
                }

                return res.status(201).json({});

            default:
                return res
                    .status(405)
                    .json({ message: "Invalid method, only GET, POST method" });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err });
    }
};

const uniqueNote = (req, res) => {
    try {
        let { noteId } = req.params;
        let { user } = req;
        if (!noteId) {
            return res.status(400).json({ error: "No note or empty note" });
        }
        let note = {};

        switch (req.method) {
            case "GET":
                note = Note.getNoteById(user.id, noteId);
                return res.status(204).json({ note });

            case "PUT" || "PATCH":
                let { title, content } = req.body;
                if (!Validator.stringNotEmpty(title, content)) {
                    return res
                        .status(400)
                        .json({ message: "Input cannot be empty" });
                }
                let newData = {
                    title: title.trim(),
                    content,
                };
                note = Note.updateNote(user.id, noteId, newData);
                return res.status(202).json({ note });

            case "DELETE":
                note = Note.deleteNote(user.id, noteId);
                return res.status(200).json({ note });

            default:
                return res.status(405).json({
                    error: "Invalid method, only GET, PUT, PATCH, DELETE method",
                });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err });
    }
};

export { allNote, uniqueNote };
