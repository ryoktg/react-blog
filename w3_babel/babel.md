### plugins (template method pattern)
- parsing
- transforming
- printing

### basic of babel
- it does nothing if there are no plugins.
- `const babel = code => code`;

### presets
- a set of plugins
- composition pattern

### order
- plugins > presets
- plugin: first to last
- preset: last to first

### babel pseudo-code (IMPORTANT)
```js
const file = 'src/index.js';
const ast = parser.parse(file);
const plugins = loadPlugins('./babel.config.js');
const visitors = plugins.map(p => p.visitor);
traverse(ast, visitors);
const code = generate(ast);
output(code, 'dist/index.js');
```

### package functions
- babel-core: depends on parser, traverse, generator
  - parser: code -> ast.
  - traverse: ast -> ast. (side-effect operation)
  - generator: ast -> code.
- babel-traverse: depends on parser, walking through all the nodes, [here](https://github.com/babel/babel/blob/main/packages/babel-types/src/traverse/traverse.ts)
- babel-parser: turn code to ast,
- babel-generator: turn ast back to code,


### questions:
- what is the entrypoint of babel ?
  - i.e.: babel-loader
    - https://github.com/babel/babel-loader/blob/main/src/index.js#L209
  - same for babel-cli:
    - https://github.com/babel/babel/blob/main/packages/babel-cli/src/babel/file.js#L172
    - https://github.com/babel/babel/blob/bfd3f80bdb2a630b5467647e1a517c765987d63b/packages/babel-cli/src/babel/util.js#L79
  - so the entrypoint is: `transform` function.
- relation between `transform` and `traverse` ?
  - `transform` will invoke `traverse`, [here](https://github.com/babel/babel/blob/main/packages/babel-core/src/transformation/index.js#L112)
- how about output of babel ?
  - babel modify AST by replacing in visitor, [i.e](https://github.com/babel/babel/blob/main/packages/babel-plugin-proposal-object-rest-spread/src/index.js#L465)
  - babel core generates code, [here](https://github.com/babel/babel/blob/main/packages/babel-core/src/transformation/index.js#L55)
- how about the logic of preset ?
  - TODO:


### patterns:
- visitor pattern: adding new algorithm without changing data structures.
- composition pattern.
- template method pattern.
- IoC: plugin is visitor which is used in `transform` of `@bable/core`.
