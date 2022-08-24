# CPM JS: Generate CPM Analysis from app

## Intro

This package enables CPM (Competitive Profile Matrix) analysis using Typescript/Javascript instead of Excel/spreadsheet. CPM is an analysis tool to determine strengths and weaknesses of competing products or companies based on defined critical success factors. The result shows profile of mapped capabilities for each product/company, making easier to determine your advantages and disadvantages. It serves as step for further analysis whether to catch up, focusing on specific niche, or other directions.

## Installation

```bash
npm install cpm-js
```

## Usage

### Analysis Workflow

Before using the package, it is advised to read this part first.
Unlike spreadsheet where one can fill cells in any order, this package requires sequential steps to work correctly. The steps are as follows:
1. Get following input ready: 
   1. Critical success factors
   2. Competing product/companies scores
2. Generate critical success factors
3. Fill in product/companies data and generate a profile
4. Output (generated as JSON file)
5. Analysis

### Package Workflow

#### Generate CSF (Critical Success Factors) List 

In practice, CSF are derived from survey result.
Some common survey designs are:
- List of multiple criteria
  ```
  Example

  Q: From most important to least important, What are critical success factors for a smartphone?
  A (aggregated answers):
  price, brand, features
  features, aftersale
  brand, RAM, camera
  camera, price, color, screen quality, size, RAM
  ```

  In this case, use `rawInputToWeights()` from `Cast` class to convert raw input to list of CSF.
  ```javascript
  import { Cast } from "cpm-js";

  let rawInput = `price, brand, features
  features, aftersale
  brand, RAM, camera
  camera, price, color, screen quality, size, RAM`;
  let CSF = Cast.rawInputToWeights(rawInput);
  console.log(CSF);
  /*
  [
    { name: 'price', weight: 0.18452380952380953 },
    { name: 'brand', weight: 0.20833333333333331 },
    { name: 'features', weight: 0.20833333333333331 },
    { name: 'aftersale', weight: 0.08333333333333333 },
    { name: 'ram', weight: 0.09523809523809523 },
    { name: 'camera', weight: 0.11309523809523808 },
    { name: 'color', weight: 0.047619047619047616 },
    { name: 'screen quality', weight: 0.03571428571428571 },
    { name: 'size', weight: 0.023809523809523808 }
  ]
  */
  ```
- List of multiple criteria + values
  ```
  Example

  Q: From most important to least important, What are critical success factors for a smartphone?
  A:
  [
    {
      price: 2,
      brand: 3,
      camera: 5,
      RAM: 4,
      aftersales: 2
    },
    {
      price: 5,
      brand: 3,
      camera: 3,
      RAM: 3,
      aftersales: 1
    }
  ]
  ```

  In this case, use `JSONToWeights()` from `Cast` class to convert raw input to list of CSF.
  ```javascript
  import { Cast } from "cpm-js";

  let jsonInput = [
    {
      price: 2,
      brand: 3,
      camera: 5,
      RAM: 4,
      aftersales: 2
    },
    {
      price: 5,
      brand: 3,
      camera: 3,
      RAM: 3,
      aftersales: 1
    }
  ];
  let CSF = Cast.rawInputToWeights(jsonInput);
  console.log(CSF);
  /*
  [
    { name: 'price', weight: 0.18452380952380953 },
    { name: 'brand', weight: 0.20833333333333331 },
    { name: 'features', weight: 0.20833333333333331 },
    { name: 'aftersale', weight: 0.08333333333333333 },
    { name: 'ram', weight: 0.09523809523809523 },
    { name: 'camera', weight: 0.11309523809523808 },
    { name: 'color', weight: 0.047619047619047616 },
    { name: 'screen quality', weight: 0.03571428571428571 },
    { name: 'size', weight: 0.023809523809523808 }
  ]
  */
  ```

## Development

### Use as a template

[![Use the template](https://img.shields.io/static/v1?label=&message=Click%20here%20to%20use%20this%20package%20as%20a%20template%20to%20start%20a%20new%20repo%20on%20GitHub&color=brightgreen&style=for-the-badge)](https://github.com/tomchen/example-typescript-package/generate)

(Click the above button to use this example package as a template for your new GitHub repo, this will initialize a new repository and my commits will not be in your git history)

(If you do not use GitHub, you can [download the archive of the example package](https://github.com/tomchen/example-typescript-package/archive/main.zip))

### Set up tools and environment

You need to have [Node.js](https://nodejs.org/en/download/) installed. Node includes npm as its default package manager.

Open the whole package folder with a good code editor, preferably [Visual Studio Code](https://code.visualstudio.com/download). Consider installing VS Code extensions [ES Lint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode).

In the VS Code top menu: **Terminal** -> **New Terminal**

### Install dependencies

Install dependencies with npm:

```bash
npm i
```

### Write your code

Make necessary changes in **package.json** (name, version, description, keywords, author, homepage and other URLs).

Write your code in **src** folder, and unit test in **test** folder, replacing the original files there.

The VS Code shortcuts for formatting of a code file are: <kbd>Shift</kbd> + <kbd>Alt</kbd> + <kbd>F</kbd> (Windows); <kbd>Shift</kbd> + <kbd>Option (Alt)</kbd> + <kbd>F</kbd> (MacOS); <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>I</kbd> (Linux).

Change code linting and formatting settings in **.prettierrc.js** if you want.

### Test

Test your code with Jest framework:

```bash
npm run test
```

**Note:** Example TypeScript Package uses [husky](https://typicode.github.io/husky/), [pinst](https://github.com/typicode/pinst) and [commitlint](https://commitlint.js.org/) to automatically execute test and [lint commit message](https://www.conventionalcommits.org/) before every commit.

### Build

Build production (distribution) files in your **dist** folder:

```bash
npm run build
```

It generates CommonJS (in **dist/cjs** folder), ES Modules (in **dist/esm** folder), bundled and minified UMD (in **dist/umd** folder), as well as TypeScript declaration files (in **dist/types** folder).

### Try it before publishing

Run:

```bash
npm link
```

[npm link](https://docs.npmjs.com/cli/v6/commands/npm-link) will create a symlink in the global folder, which may be **{prefix}/lib/node_modules/example-typescript-package** or **C:\Users\<username>\AppData\Roaming\npm\node_modules\example-typescript-package**.

Create an empty folder elsewhere, you don't even need to `npm init` (to generate **package.json**). Open the folder with VS Code, open a terminal and just run:

```bash
npm link example-typescript-package
```

This will create a symbolic link from globally-installed example-typescript-package to **node_modules/** of the current folder.

You can then create a, for example, **testnum.ts** file with the content:

```ts
import { Num } from 'example-typescript-package'
console.log(new Num(5).add(new Num(6)).val() === 11)
```

If you don't see any linting errors in VS Code, if you put your mouse cursor over `Num` and see its type, then it's all good.

Whenever you want to uninstall the globally-installed example-typescript-package and remove the symlink in the global folder, run:

```bash
npm uninstall example-typescript-package -g
```

### Prepare to publish

Create an [npm](https://www.npmjs.com/) account.

<details><summary><strong>Click to read this section if you do manual publishing</strong></summary>

#### Manual publishing to npm

Log in:

```bash
npm adduser
```

And publish:

```bash
npm publish
```

</details>

This package is configured to use GitHub Actions CI/CD to automate both the **npm** and **GitHub Packages** publishing process. The following are what you have to do.

#### CI publishing to npm

Follow [npm's official instruction](https://docs.npmjs.com/creating-and-viewing-access-tokens) to create an npm token. Choose "Publish" from the website, or use `npm token create` without argument with the CLI.

If you use 2FA, then make sure it's enabled for **authorization** only instead of **authorization and publishing** (**Edit Profile** -> **Modify 2FA**).

On the page of your newly created or existing GitHub repo, click **Settings** -> **Secrets** -> **New repository secret**, the **Name** should be `NPM_TOKEN` and the **Value** should be your npm token.

#### CI publishing to GitHub Packages

The default configuration of this example package **assumes you publish package with an unscoped name to npm**. GitHub Packages must be named with a scope name such as "@tomchen/example-typescript-package".

Change `scope: '@tomchen'` to your own scope in **.github/workflows/publish.yml**, also change `addscope` in **package.json**.

If you publish package with a scoped name to npm, change the name to something like "@tomchen/example-typescript-package" in **package.json**, and remove the `- run: npm run addscope` line in **.github/workflows/publish.yml**

If you publish your package to npm only, and don't want to publish to GitHub Packages, then delete the lines from `- name: Setup .npmrc file to publish to GitHub Packages` to the end of the file in **.github/workflows/publish.yml**.

(You might have noticed `secret.GITHUB_TOKEN` in **.github/workflows/publish.yml**. You don't need to set up a secret named `GITHUB_TOKEN` actually, it is [automatically created](https://docs.github.com/en/free-pro-team@latest/actions/reference/authentication-in-a-workflow#about-the-github_token-secret))

### Publish

Now everything is set. The example package has automated tests and upload (publishing) already set up with GitHub Actions:

- Every time you `git push` or a pull request is submitted on your `master` or `main` branch, the package is automatically tested against the desired OS and Node.js versions with GitHub Actions.
- Every time an [**annotated**](https://git-scm.com/book/en/v2/Git-Basics-Tagging#_annotated_tags) (not [lightweight](https://git-scm.com/book/en/v2/Git-Basics-Tagging#_lightweight_tags)) "v*" tag is pushed onto GitHub, a GitHub release is automatically generated from this version, it also automatically publishes to the npm registry and/or GitHub Packages registry to update the package there.
  - [`npm version`](https://docs.npmjs.com/cli/version/) / [`yarn version`](https://yarnpkg.com/cli/version) is useful to create tags.
  - (npm or yarn v1, not yarn v2) You could also add `"postversion": "git push --follow-tags"` to **package.json** file to push it automatically after `npm` or `yarn` `version`.
  - (yarn v1, not v2) because `yarn version` doesn't check whether there are uncommitted changes, you can add `"preversion": "git diff-index --quiet HEAD --"` to **package.json**
    - Note: `preversion`, `postversion` doesn't work in yarn v2

For npm registry: you can unpublish a version or the whole package but can never re-publish the same version under the same name.

If you want to modify the description / README on the npm package page, you have to publish a new version. You can modify the description on GitHub Packages without publishing.

## Notes

- It uses npm but you can easily switch to yarn, of course (remember to change all "npm" in `scripts` in the file **package.json**)
  - Whether you use npm as your package manager ≠ Whether you can publish to the npm registry
- Works fine in VS Code. In my configuration **.eslintrc** and **.prettierrc** cooperate perfectly
- See `scripts` in **package.json** for other predefined script commands
- [pinst](https://github.com/typicode/pinst) is used to solve [a problem of husky](https://typicode.github.io/husky/#/?id=yarn-2)
- The installation of the package with npm, yarn v1 and yarn v2+ is ensured in [this test](https://github.com/tomchen/example-typescript-package-test)

## References

- [Creating and publishing unscoped public packages - npm docs](https://docs.npmjs.com/creating-and-publishing-unscoped-public-packages)
- [npm-publish - npm docs](https://docs.npmjs.com/cli/v6/commands/npm-publish)
- [Publishing - TypeScript docs](https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html)
- [Publishing Node.js packages - GitHub Docs](https://docs.github.com/en/free-pro-team@latest/actions/guides/publishing-nodejs-packages)

Btw, if you want to publish Python package, go to [Example PyPI (Python Package Index) Package & Tutorial / Instruction / Workflow for 2021](https://github.com/tomchen/example_pypi_package).
