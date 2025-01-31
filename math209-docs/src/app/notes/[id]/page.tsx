'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { MathJaxContext, MathJax } from 'better-react-mathjax';
import { ArrowLeft } from 'lucide-react';

// This would typically come from an API or database
const notes = [
    {
        id: 1,
        title: 'Vectors and Matrices',
        content: `
# Vectors and Matrices

## Introduction to Linear Algebra

A vector is a mathematical object that has both magnitude and direction. In \\(\\mathbb{R}^n\\), a vector can be represented as:

$$
\\vec{v} = \\begin{pmatrix} v_1 \\\\ v_2 \\\\ \\vdots \\\\ v_n \\end{pmatrix}
$$

### Matrix Operations

For matrices A and B, the basic operations are:

1. Addition:
$$
A + B = [a_{ij} + b_{ij}]
$$

2. Scalar Multiplication:
$$
cA = [ca_{ij}]
$$

3. Matrix Multiplication:
$$
(AB)_{ij} = \\sum_{k=1}^n a_{ik}b_{kj}
$$

### Examples

Consider the following matrix:

$$
A = \\begin{pmatrix} 
1 & 2 & 3 \\\\
4 & 5 & 6 \\\\
7 & 8 & 9
\\end{pmatrix}
$$
`,
        date: '2024-03-20',
        category: 1,
    },
    // Add more notes...
];

export default function NotePage() {
    const router = useRouter();
    const params = useParams();
    const noteId = Number(params.id);
    
    const note = notes.find(n => n.id === noteId);

    if (!note) {
        return <div>Note not found</div>;
    }

    return (
        <MathJaxContext>
            <div className="min-h-screen bg-white dark:bg-gray-900">
                <nav className="fixed top-0 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 z-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center h-16">
                            <button 
                                onClick={() => router.push('/')}
                                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                            >
                                <ArrowLeft size={20} />
                                <span>Back to Notes</span>
                            </button>
                        </div>
                    </div>
                </nav>

                <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
                    <article className="prose dark:prose-invert max-w-none">
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold mb-2">{note.title}</h1>
                            <time className="text-gray-500 dark:text-gray-400">{note.date}</time>
                        </div>
                        <div className="math-content">
                            <MathJax>{note.content}</MathJax>
                        </div>
                    </article>
                </main>
            </div>
        </MathJaxContext>
    );
} 