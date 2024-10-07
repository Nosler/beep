module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        colors: {
            white: '#FFFFFF',
            black: '#000000',
            fivegrey: '#0F0F0F',
            tengrey: '#1C1C1C',
            twentygrey: '#444444',
            thirtygrey: '#777777',
            cyan: '#00ffff',
            magenta: '#ff00ff',
            yellow: '#ffff00',
            red: '#ff0000',
            green: '#00ff00',
            blue: '#0000ff',
            darkcyan: '#009999',
            darkmagenta: '#990099',
            darkyellow: '#999900',
            darkred: '#990000',
            darkgreen: '#009900',
            darkblue: '#000099',
            gross: '#123456',
            grossmagenta: '#cc11ff',
        },
        extend: {
            spacing: {
                '20vw': '20vw',
                '21vw': '21vw',
            },
            boxShadow: {
                clicky: '0px 10px 0px rgba(0, 0, 0, 0.9)',
                'clicky-sm': '0px 6px 0px rgba(0, 0, 0, 0.9)',
            },
        },
    },
    plugins: [],
    safelist: [
        {
            pattern: /border-+/,
            variants: ['hover'],
        },
        {
            pattern: /text-+/,
            variants: ['hover'],
        },
        {
            pattern: /h-+/,
        },
        {
            pattern: /w-+/,
        },
        {
            pattern: /opacity-+/,
        },
        {
            pattern: /bg-+/,
            variants: ['hover', 'group-hover'],
        },
    ],
};
