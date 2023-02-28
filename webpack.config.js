const path = require('path');

module.exports = {
    entry: './src/app.ts',
    target: 'node',
    output: {
        filename: 'parser.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    }
};
