'use client';

import React from 'react';
import { X, Save } from 'lucide-react';
import RichTextEditor from './Editor/RichTextEditor';

interface NewNoteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (note: { title: string; content: string }) => void;
    editingNote?: Note | null;
}

export default function NewNoteModal({ isOpen, onClose, onSave, editingNote }: NewNoteModalProps) {
    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');
    const [isSaving, setIsSaving] = React.useState(false);

    // Initialize form with editing note data if available
    React.useEffect(() => {
        if (editingNote) {
            setTitle(editingNote.title);
            setContent(editingNote.content);
        } else {
            setTitle('');
            setContent('');
        }
    }, [editingNote]);

    if (!isOpen) return null;

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await onSave({ title, content });
            setTitle('');
            setContent('');
            onClose();
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50">
            {/* Header */}
            <div className="border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-[1200px] mx-auto px-4 h-14 flex items-center justify-between">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Untitled"
                        className="text-xl font-semibold bg-transparent border-none outline-none placeholder-gray-400 dark:placeholder-gray-600 w-full"
                    />
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="flex items-center gap-2 px-4 py-1.5 bg-black dark:bg-white text-white dark:text-black rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
                        >
                            <Save size={16} />
                            {isSaving ? 'Saving...' : 'Save'}
                        </button>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Editor */}
            <div className="max-w-[1200px] mx-auto px-4 py-8">
                <RichTextEditor
                    content={content}
                    onChange={setContent}
                    placeholder="Start writing..."
                />
            </div>
        </div>
    );
} 