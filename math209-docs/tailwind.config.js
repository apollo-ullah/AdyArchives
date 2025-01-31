/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            typography: ({ theme }) => ({
                DEFAULT: {
                    css: {
                        maxWidth: '65ch',
                        color: 'inherit',
                    },
                },
                dark: {
                    css: {
                        '--tw-prose-body': theme('colors.gray[300]'),
                        '--tw-prose-headings': theme('colors.white'),
                        '--tw-prose-links': theme('colors.blue[400]'),
                        '--tw-prose-bold': theme('colors.white'),
                        '--tw-prose-counters': theme('colors.gray[400]'),
                        '--tw-prose-bullets': theme('colors.gray[400]'),
                        '--tw-prose-quotes': theme('colors.gray[300]'),
                        '--tw-prose-code': theme('colors.white'),
                        '--tw-prose-hr': theme('colors.gray[700]'),
                        '--tw-prose-th-borders': theme('colors.gray[600]'),
                        '--tw-prose-td-borders': theme('colors.gray[700]'),
                    },
                },
            }),
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
} 