'use client';

import React from 'react';
import { Check } from 'lucide-react';

interface Command {
    title: string;
    description: string;
    icon: React.ReactNode;
    command: (editor: any) => void;
}

interface SlashCommandsListProps {
    items: Command[];
    command: any;
    editor: any;
    range: any;
}

export default function SlashCommandsList({
    items,
    command,
    editor,
    range,
}: SlashCommandsListProps) {
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const selectItem = (index: number) => {
        const item = items[index];
        if (item) {
            command(item);
        }
    };

    return (
        <div className="slash-commands-list">
            {items.map((item, index) => (
                <button
                    className={`slash-command-item ${index === selectedIndex ? 'selected' : ''}`}
                    key={index}
                    onClick={() => selectItem(index)}
                >
                    <div className="slash-command-icon">{item.icon}</div>
                    <div className="slash-command-content">
                        <p className="slash-command-title">{item.title}</p>
                        <p className="slash-command-description">{item.description}</p>
                    </div>
                </button>
            ))}
        </div>
    );
} 