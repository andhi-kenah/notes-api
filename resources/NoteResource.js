import { Router } from "express";
import passport from "passport";
import { allNote, uniqueNote } from "../controllers/NoteController.js";

const NoteResource = Router()

NoteResource.get("/", passport.authenticate("jwt", {session: false}), allNote) // Get all note
NoteResource.post("/", allNote) // Add new note

// NoteResource.get("/:id", passport.authenticate("jwt", {session: false}), uniqueNote) // Get unique note
// NoteResource.delete("/:id", passport.authenticate("jwt", {session: false}), uniqueNote) // Delete unique note
// NoteResource.put("/:id", passport.authenticate("jwt", {session: false}), uniqueNote) // Update unique note
// NoteResource.patch("/:id", passport.authenticate("jwt", {session: false}), uniqueNote) // Update unique note

NoteResource.get("/:id", uniqueNote) // Get unique note
NoteResource.delete("/:id", uniqueNote) // Delete unique note
NoteResource.put("/:id", uniqueNote) // Update unique note
NoteResource.patch("/:id", uniqueNote) // Update unique note

export default NoteResource