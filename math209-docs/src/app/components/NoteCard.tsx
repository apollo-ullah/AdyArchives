'use client';

import React from 'react';
import { Calendar, ChevronRight, Edit, Trash } from 'lucide-react';
import Link from 'next/link';

interface Note {
    id: number;
    title: string;
    preview: string;
    date: string;
}

interface NoteCardProps {
    note: Note;
    onEdit: () => void;
    onDelete: () => void;
}

export default function NoteCard({ note, onEdit, onDelete }: NoteCardProps) {
    const handleEdit = (e: React.MouseEvent) => {
        e.preventDefault();
        onEdit();
    };

    const handleDelete = (e: React.MouseEvent) => {
        e.preventDefault();
        if (window.confirm('Are you sure you want to delete this note?')) {
            onDelete();
        }
    };

    return (
        <Link href={`/notes/${note.id}`}>
            <div className="group p-6 border border-gray-200 rounded-lg hover:border-gray-300 transition-all cursor-pointer relative">
                {/* Action buttons */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={handleEdit}
                        className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 hover:text-gray-700"
                    >
                        <Edit size={16} />
                    </button>
                    <button
                        onClick={handleDelete}
                        className="p-1.5 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-500 hover:text-red-600"
                    >
                        <Trash size={16} />
                    </button>
                </div>

                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar size={14} />
                        <span>{note.date}</span>
                    </div>
                    <ChevronRight 
                        size={16} 
                        className="text-gray-400 group-hover:text-gray-600 transition-colors"
                    />
                </div>
                <h3 className="text-lg font-semibold mb-2">{note.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-3">{note.preview}</p>
            </div>
        </Link>
    );
} 