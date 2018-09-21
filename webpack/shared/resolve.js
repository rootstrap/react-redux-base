import path from 'path';

export default {
  extensions: ['*', '.js', '.jsx', '.json'],
  alias: {
    actions: path.resolve(__dirname, '../../src/actions'),
    api: path.resolve(__dirname, '../../src/api'),
    components: path.resolve(__dirname, '../../src/components'),
    constants: path.resolve(__dirname, '../../src/constants'),
    containers: path.resolve(__dirname, '../../src/containers'),
    locales: path.resolve(__dirname, '../../src/locales'),
    reducers: path.resolve(__dirname, '../../src/reducers'),
    store: path.resolve(__dirname, '../../src/store'),
    styles: path.resolve(__dirname, '../../src/styles'),
    utils: path.resolve(__dirname, '../../src/utils')
  }
};
