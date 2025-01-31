import React from 'react';
import { createRoot } from 'react-dom/client';
import SlashCommandsList from './SlashCommandsList';

export function createSuggestionHandler(props: any, dom: HTMLElement, tippyInstance: any) {
    const root = createRoot(dom);
    
    root.render(
        <React.StrictMode>
            <SlashCommandsList {...props} />
        </React.StrictMode>
    );

    return {
        destroy: () => {
            root.unmount();
            tippyInstance.destroy();
        }
    };
} 