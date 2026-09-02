import React, { useState, useEffect, useRef, useCallback } from "react";
import { StickyNote, Plus, Edit2, Trash2, Save, X, Loader, AlertCircle, BookOpen } from "lucide-react";
import { useNotes } from "../hooks/useNotes";
import "./NotesPanel.css";

const NotesPanel = ({ lessonId, lessonTitle }) => {
  const { notes, loading, error, createNote, updateNote, deleteNote } = useNotes(lessonId);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [newNoteContent, setNewNoteContent] = useState("");
  const [saving, setSaving] = useState(false);
  const debounceTimer = useRef(null);

  const handleAutoSave = useCallback((id, content) => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = setTimeout(async () => {
      setSaving(true);
      await updateNote(id, content);
      setSaving(false);
    }, 1000);
  }, [updateNote]);

  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  const handleCreate = async () => {
    const trimmed = newNoteContent.trim();
    if (!trimmed) return;
    const note = await createNote(trimmed);
    if (note) {
      setNewNoteContent("");
      setEditingId(note._id);
      setEditContent(note.content);
    }
  };

  const handleEdit = (note) => {
    setEditingId(note._id);
    setEditContent(note.content);
  };

  const handleEditChange = (value) => {
    setEditContent(value);
    if (editingId) {
      handleAutoSave(editingId, value);
    }
  };

  const handleSaveEdit = async () => {
    if (!editingId) return;
    setSaving(true);
    await updateNote(editingId, editContent);
    setSaving(false);
    setEditingId(null);
    setEditContent("");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditContent("");
  };

  const handleDelete = async (id) => {
    await deleteNote(id);
    if (editingId === id) {
      setEditingId(null);
      setEditContent("");
    }
  };

  const formatDate = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "";
    }
  };

  if (!isOpen) {
    return (
      <button
        className="notes-fab"
        onClick={() => setIsOpen(true)}
        title="Open Notes"
      >
        <StickyNote size={20} />
        <span className="notes-fab-count">{notes.length}</span>
      </button>
    );
  }

  return (
    <aside className="notes-panel">
      <div className="notes-panel-header">
        <h3>
          <StickyNote size={18} />
          Notes
        </h3>
        <button className="notes-close-btn" onClick={() => setIsOpen(false)} title="Close">
          <X size={18} />
        </button>
      </div>

      {lessonTitle && (
        <div className="notes-lesson-label">{lessonTitle}</div>
      )}

      <div className="notes-new">
        <textarea
          className="notes-textarea"
          placeholder="Write a note..."
          value={newNoteContent}
          onChange={(e) => setNewNoteContent(e.target.value)}
          rows={3}
        />
        <button
          className="notes-add-btn"
          onClick={handleCreate}
          disabled={!newNoteContent.trim() || saving}
        >
          <Plus size={16} />
          Add Note
        </button>
      </div>

      <div className="notes-list">
        {loading && (
          <div className="notes-loading">
            <Loader className="notes-spinner" size={20} />
            <span>Loading notes...</span>
          </div>
        )}

        {error && (
          <div className="notes-error">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {!loading && !error && notes.length === 0 && (
          <div className="notes-empty">
            <BookOpen size={24} />
            <p>No notes yet. Start jotting down your thoughts!</p>
          </div>
        )}

        {notes.map((note) => (
          <div key={note._id} className="notes-item">
            {editingId === note._id ? (
              <div className="notes-edit-area">
                <textarea
                  className="notes-textarea"
                  value={editContent}
                  onChange={(e) => handleEditChange(e.target.value)}
                  rows={4}
                  autoFocus
                />
                <div className="notes-edit-actions">
                  <button className="notes-save-btn" onClick={handleSaveEdit}>
                    <Save size={14} />
                    Save
                  </button>
                  <button className="notes-cancel-btn" onClick={handleCancelEdit}>
                    <X size={14} />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="notes-item-content">{note.content}</div>
                <div className="notes-item-footer">
                  <span className="notes-item-date">{formatDate(note.createdAt)}</span>
                  <div className="notes-item-actions">
                    <button
                      className="notes-icon-btn"
                      onClick={() => handleEdit(note)}
                      title="Edit"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      className="notes-icon-btn notes-icon-btn--delete"
                      onClick={() => handleDelete(note._id)}
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}

        {saving && (
          <div className="notes-saving-indicator">
            <Loader className="notes-spinner" size={14} />
            Saving...
          </div>
        )}
      </div>
    </aside>
  );
};

export default NotesPanel;
