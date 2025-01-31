'use client';

import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { SlashCommands } from './SlashCommands';
import {
    Bold,
    Italic,
    List,
    ListOrdered,
    Heading1,
    Heading2,
    Code,
    Quote,
    Image as ImageIcon,
    Link as LinkIcon,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Table,
    Minus,
} from 'lucide-react';

interface EditorProps {
    content: string;
    onChange: (content: string) => void;
    placeholder?: string;
}

export default function RichTextEditor({ content, onChange, placeholder }: EditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: placeholder || 'Type / for commands...',
            }),
            Image,
            Link,
            SlashCommands,
        ],
        content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    if (!editor) return null;

    const ToolbarButton = ({ onClick, isActive, icon, tooltip }: any) => (
        <button
            onClick={onClick}
            className={`toolbar-button group relative ${isActive ? 'active' : ''}`}
            title={tooltip}
        >
            {icon}
            <span className="toolbar-tooltip">{tooltip}</span>
        </button>
    );

    const toolbarItems = [
        {
            icon: <Heading1 size={16} />,
            command: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
            isActive: () => editor.isActive('heading', { level: 1 }),
            tooltip: 'Heading 1',
        },
        {
            icon: <Heading2 size={16} />,
            command: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
            isActive: () => editor.isActive('heading', { level: 2 }),
            tooltip: 'Heading 2',
        },
        { type: 'divider' },
        {
            icon: <Bold size={16} />,
            command: () => editor.chain().focus().toggleBold().run(),
            isActive: () => editor.isActive('bold'),
            tooltip: 'Bold',
        },
        {
            icon: <Italic size={16} />,
            command: () => editor.chain().focus().toggleItalic().run(),
            isActive: () => editor.isActive('italic'),
            tooltip: 'Italic',
        },
        { type: 'divider' },
        {
            icon: <List size={16} />,
            command: () => editor.chain().focus().toggleBulletList().run(),
            isActive: () => editor.isActive('bulletList'),
            tooltip: 'Bullet List',
        },
        {
            icon: <ListOrdered size={16} />,
            command: () => editor.chain().focus().toggleOrderedList().run(),
            isActive: () => editor.isActive('orderedList'),
            tooltip: 'Numbered List',
        },
        { type: 'divider' },
        {
            icon: <AlignLeft size={16} />,
            command: () => editor.chain().focus().setTextAlign('left').run(),
            isActive: () => editor.isActive({ textAlign: 'left' }),
            tooltip: 'Align Left',
        },
        {
            icon: <AlignCenter size={16} />,
            command: () => editor.chain().focus().setTextAlign('center').run(),
            isActive: () => editor.isActive({ textAlign: 'center' }),
            tooltip: 'Align Center',
        },
        {
            icon: <AlignRight size={16} />,
            command: () => editor.chain().focus().setTextAlign('right').run(),
            isActive: () => editor.isActive({ textAlign: 'right' }),
            tooltip: 'Align Right',
        },
        { type: 'divider' },
        {
            icon: <Code size={16} />,
            command: () => editor.chain().focus().toggleCode().run(),
            isActive: () => editor.isActive('code'),
            tooltip: 'Code',
        },
        {
            icon: <Quote size={16} />,
            command: () => editor.chain().focus().toggleBlockquote().run(),
            isActive: () => editor.isActive('blockquote'),
            tooltip: 'Quote',
        },
        {
            icon: <Minus size={16} />,
            command: () => editor.chain().focus().setHorizontalRule().run(),
            tooltip: 'Horizontal Rule',
        },
    ];

    return (
        <div className="editor-container">
            <div className="editor-toolbar">
                {toolbarItems.map((item, index) => 
                    item.type === 'divider' ? (
                        <div key={index} className="toolbar-divider" />
                    ) : (
                        <ToolbarButton
                            key={index}
                            onClick={item.command}
                            isActive={item.isActive?.()}
                            icon={item.icon}
                            tooltip={item.tooltip}
                        />
                    )
                )}
            </div>
            <EditorContent editor={editor} className="editor-content" />
        </div>
    );
} 