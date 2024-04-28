# mre-ts-jest-stringifyContentPathRegex

Minimal reproducible example for the `stringifyContentPathRegex` option of ts-jest documented [here](https://kulshekhar.github.io/ts-jest/docs/getting-started/options/stringifyContentPathRegex) not working as expected. The tracking issue in ts-jest is https://github.com/kulshekhar/ts-jest/issues/4020.

## Reproduce the bug

Simply run the command below. I would expect that the `stringifyContentPathRegex` option would match the `raw.txt` file and allow it to be imported as a string in the test file but this does not work.

```bash
npm test
```

The following error is produced:

```text
> mre-ts-jest-stringifycontentpathregex@1.0.0 test
> jest

 FAIL  ./test.spec.ts
  ● Test suite failed to run

    Jest encountered an unexpected token

    Jest failed to parse a file. This happens e.g. when your code or its dependencies use non-standard JavaScript syntax, or when Jest is not configured to support such syntax.

    Out of the box Jest supports Babel, which will be used to transform your files into valid JS based on your Babel configuration.

    By default "node_modules" folder is ignored by transformers.

    Here's what you can do:
     • If you are trying to use ECMAScript Modules, see https://jestjs.io/docs/ecmascript-modules for how to enable it.
     • If you are trying to use TypeScript, see https://jestjs.io/docs/getting-started#using-typescript
     • To have some of your "node_modules" files transformed, you can specify a custom "transformIgnorePatterns" in your config.
     • If you need a custom transformation specify a "transform" option in your config.
     • If you simply want to mock your non-JS modules (e.g. binary assets) you can stub them out with the "moduleNameMapper" config option.

    You'll find more details and examples of these config options in the docs:
    https://jestjs.io/docs/configuration
    For information about custom transformations, see:
    https://jestjs.io/docs/code-transformation

    Details:

    /home/jarpoole/mre-ts-jest-stringifyContentPathRegex/raw.txt:1
    ({"Object.<anonymous>":function(module,exports,require,__dirname,__filename,jest){hello world
                                                                                            ^^^^^

    SyntaxError: Unexpected identifier

    > 1 | import raw from './raw.txt'
        | ^
      2 |
      3 | describe('some typescript tests', () => {
      4 |     it('should work with typescript', () => {

      at Runtime.createScriptFromCode (node_modules/jest-runtime/build/index.js:1495:14)
      at Object.<anonymous> (test.spec.ts:1:1)
```

## Steps taken to create this repo

1. created a new npm package

    ```bash
    npm init
    ```

2. Followed the [ts-jest installation guide](https://kulshekhar.github.io/ts-jest/docs/getting-started/installation)

    ```bash
    npm install --save-dev jest typescript ts-jest @types/jest
    npx ts-jest config:init
    ```

3. Copied and pasted the config from [the docs](https://kulshekhar.github.io/ts-jest/docs/getting-started/options/stringifyContentPathRegex). I discovered that the preset does not actually include anything for `moduleFileExtensions` so I specified those manually.

4. Got two warnings:

    ```text
    ts-jest[config] (WARN) message TS151001: If you have issues related to imports, you should consider setting `esModuleInterop` to `true` in your TypeScript configuration file (usually `tsconfig.json`). See https://blogs.msdn.microsoft.com/typescript/2018/01/31/announcing-typescript-2-7/#easier-ecmascript-module-interoperability for more information
    ```

    ```text
    ts-jest[ts-jest-transformer] (WARN) Got a unknown file type to compile (file: /home/jarpoole/mre-ts-jest-stringifyContentPathRegex/raw.txt). To fix this, in your Jest config change the `transform` key which value is `ts-jest` so that it does not match this kind of files anymore.
    ```

    I attempted to resolve the first one by running `npx tsc --init` to generate a basic typescript config file. This changes nothing but does clear the warning. Interestingly it also clears the second warning. Why I have no idea...
