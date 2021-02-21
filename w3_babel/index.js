import parser from '@babel/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';

const code = `function square(n) {
  return n * n;
}
`;

const ast = parser.parse(code);
// console.log(ast);

traverse.default(ast, {
  enter(path) {
    if (path.isIdentifier({name: 'n'})) {
      path.node.name = 'x';
    }
  }
});

console.log(generate.default(ast));
// output: rewriting variable n to x;
// function square(x) {\n  return x * x;\n}
