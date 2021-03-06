# Found Scroll [![npm][npm-badge]][npm]

Scroll management for [Found](https://github.com/4Catalyzer/found).

## Usage

```js
import { createBrowserRouter, createRender } from 'found';
import { ScrollManager } from 'found-scroll';

/* ... */

const render = createRender({ renderError });

const BrowserRouter = createBrowserRouter({
  routeConfig,

  render: renderArgs => (
    <ScrollManager renderArgs={renderArgs}>
      {render(renderArgs)}
    </ScrollManager>
  ),
});
```

## Guide

### Installation

```
$ npm i -S react found
$ npm i -S found-scroll
```

### Basic usage

When constructing a router, in the `render` method, wrap the rendered element with `<ScrollManager>`, and pass in `renderArgs` as a prop, as in the above example.

### Custom scroll behavior

You can provide a custom `shouldUpdateScroll` callback as a prop to `<ScrollManager>`. This callback receives the previous and the current `renderArgs`.

The callback can return:

- a falsy value to suppress updating the scroll position
- a position array of `x` and `y`, such as `[0, 100]`, to scroll to that position
- a string with the `id` or `name` of an element, to scroll to that element
- a truthy value to emulate the browser default scroll behavior

```js
const shouldUpdateScrollByPathname = (prevRenderArgs, { location }) => (
  prevRenderArgs && location.pathname !== prevRenderArgs.location.pathname
);

const shouldUpdateScrollByRoute = (prevRenderArgs, { routes }) => {
  if (routes.some(route => route.ignoreScrollBehavior)) {
    return false;
  }

  if (routes.some(route => route.scrollToTop)) {
    return [0, 0];
  }

  return true;
};
```

[npm-badge]: https://img.shields.io/npm/v/found-scroll.svg
[npm]: https://www.npmjs.org/package/found-scroll
