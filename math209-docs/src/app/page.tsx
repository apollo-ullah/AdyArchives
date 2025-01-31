'use client';

import React, { useState } from 'react';
import { MathJaxContext } from 'better-react-mathjax';
import { Search, Plus, Moon, Sun, FolderOpen } from 'lucide-react';
import NewNoteModal from './components/NewNoteModal';
import NoteCard from './components/NoteCard';

interface Category {
    id: number;
    name: string;
    description: string;
}

interface Note {
    id: number;
    title: string;
    content: string;
    date: string;
    category: number;
    preview: string;
}

export default function Home() {
    const [categories] = useState<Category[]>([
        { id: 1, name: 'Math 209', description: 'course notes' },
        { id: 2, name: 'Comp 250', description: 'course notes' },
        { id: 3, name: 'Comp 206', description: 'course notes' },
    ]);

    const [notes, setNotes] = useState<Note[]>([
        {
            id: 1,
            title: 'Vectors and Matrices',
            content: 'Introduction to Linear Algebra...',
            date: '2024-03-20',
            category: 1,
            preview: 'Learn about vectors, matrices, and their operations...'
        },
        // Add more notes...
    ]);

    const [darkMode, setDarkMode] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [isNewNoteModalOpen, setIsNewNoteModalOpen] = useState(false);
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);
    const [editingNote, setEditingNote] = useState<Note | null>(null);

    const filteredNotes = notes.filter(note => 
        (!selectedCategory || note.category === selectedCategory) &&
        note.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddNote = async ({ title, content }: { title: string; content: string }) => {
        const preview = content
            .replace(/<[^>]*>/g, '')
            .slice(0, 150)
            .trim() + (content.length > 150 ? '...' : '');

        const newNote = {
            id: notes.length + 1,
            title,
            content,
            date: new Date().toISOString().split('T')[0],
            category: selectedCategory || 1,
            preview,
        };

        setNotes(prevNotes => [...prevNotes, newNote]);
        setIsNewNoteModalOpen(false);
    };

    const handleDeleteNote = (noteId: number) => {
        setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));
        if (selectedNote?.id === noteId) {
            setSelectedNote(null);
        }
    };

    const handleEditNote = (noteId: number) => {
        const noteToEdit = notes.find(note => note.id === noteId);
        if (noteToEdit) {
            setEditingNote(noteToEdit);
            setIsNewNoteModalOpen(true);
        }
    };

    return (
        <MathJaxContext>
            <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
                {/* Navigation Bar */}
                <nav className="fixed top-0 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 z-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex items-center">
                                <h1 className="text-xl font-semibold">Math Notes</h1>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        placeholder="Search notes..."
                                        className="pl-10 pr-4 py-2 border rounded-lg w-64"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <button
                                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                                    onClick={() => setDarkMode(!darkMode)}
                                >
                                    {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                                </button>
                                <button
                                    className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
                                    onClick={() => setIsNewNoteModalOpen(true)}
                                >
                                    <Plus size={18} />
                                    New Note
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Main Content */}
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
                    {/* Categories */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {categories.map(category => (
                            <button
                                key={category.id}
                                className={`p-6 rounded-lg border ${
                                    selectedCategory === category.id 
                                    ? 'border-black bg-gray-50' 
                                    : 'border-gray-200 hover:border-gray-300'
                                }`}
                                onClick={() => setSelectedCategory(
                                    selectedCategory === category.id ? null : category.id
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <FolderOpen size={24} />
                                    <div className="text-left">
                                        <h3 className="font-semibold">{category.name}</h3>
                                        <p className="text-sm text-gray-500">{category.description}</p>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Notes Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredNotes.map(note => (
                            <NoteCard 
                                key={note.id} 
                                note={note}
                                onEdit={() => handleEditNote(note.id)}
                                onDelete={() => handleDeleteNote(note.id)}
                            />
                        ))}
                    </div>
                </main>

                <NewNoteModal
                    isOpen={isNewNoteModalOpen}
                    onClose={() => {
                        setIsNewNoteModalOpen(false);
                        setEditingNote(null);
                    }}
                    onSave={handleAddNote}
                    editingNote={editingNote}
                />
            </div>
        </MathJaxContext>
    );
}
