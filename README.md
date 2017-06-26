<blockquote>
  <!-- This <blockquote> will be hidden in gh-pages, because it's no gonna work there and there's a better menu -->
  <a href="https://github.com/Stupidism/stupid-rc-starter/tree/master/starter">README of starter</a> 
  <p>
    If you are here for the <strong>starter</strong> click above link</br>
    If you are here for the component library, this is it</br>
  </p>
  <!-- 
    You can remove this after you started.  
    For the convenience of merging, README.md below is all yours, I will try my best not to change them.
    Also, you should change docs/starter.md as little as you can to avoid conflicts.
   -->
</blockquote>

[![Build Status](https://travis-ci.org/ClarityMovement/clarity-components.svg?branch=master)](https://travis-ci.org/Claritymovement/clarity-components) 
[![bitHound Score](https://www.bithound.io/github/Claritymovement/clarity-components/badges/score.svg)](https://www.bithound.io/github/Claritymovement/clarity-components) 
[![codecov](https://codecov.io/gh/Claritymovement/clarity-components/branch/master/graph/badge.svg)](https://codecov.io/gh/Claritymovement/clarity-components) 
[![Greenkeeper badge](https://badges.greenkeeper.io/claritymovement/clarity-components.svg)](https://greenkeeper.io/) 
[![Dependency Status](https://david-dm.org/Claritymovement/clarity-components.svg)](https://david-dm.org/Claritymovement/clarity-components) 
[![devDependencies Status](https://david-dm.org/Claritymovement/clarity-components/dev-status.svg)](https://david-dm.org/Claritymovement/clarity-components?type=dev)

# clarity-components - A set of components and hocs from ClarityMovement
With [storybook](https://github.com/storybooks/storybook) integrated, components can be tested on [gh-pages](https://claritymovement.github.io/clarity-components) by non-developers directly.

## Installation
```
yarn add clarity-components
```
or
```
npm install --save clarity-components
```

## Usage
1. `Image` - withImage(Image)

```js
import { Image } from 'clarity-components';

const uploadImage = () => new Promise(resolve => resolve({ url: 'https://img-url' }));
<Image uploadImage={uploadImage} />
```

2. `withImage` - High order component to provide data and logic

```js
import { withImage } from 'clarity-components';

const MyImage = (props) => <div>{console.log(props)}</div>;

export default withImage(MyImage);
```

## [Documentation](https://claritymovement.github.io/clarity-components/)

With [storybook](https://storybooks.js.org), things below are included in the site:
- online demo
- prop tables
- code examples
- TODO: [comments](https://github.com/storybooks/storybook/blob/master/addons/comments)

## License

Copyright © 2017, [ClarityMovement](https://github.com/ClarityMovement). Released under the [MIT license](LICENSE).
