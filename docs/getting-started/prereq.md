# Prerequisites

Good to know/review topics before diving into the laserPro codebase.

## React

-   Almost the entirety of the dashboard is based upon functional components so prowess in [React hooks](https://reactjs.org/docs/hooks-overview.html) would be helpful.
-   [Think in React](https://reactjs.org/docs/thinking-in-react.html)—a good way to maintain React code quality.
-   Although the app is currently using [ReactContext](https://reactjs.org/docs/context.html) for a specific use case which should be replaced with a centralized state manager, understanding of ReactContext will be helpful during refactoring.

## [Tailwind](https://tailwindcss.com/docs)

Straightforward CSS alternative. Few items are still being stylized with CSS but very minimally. Tailwind is used almost everywhere.

## Webpack

The early version of the dashboard was set up using snowpack; however, a missing detail turned out to be that the snowpack build module is nowhere near development ready. The dashboard is now set up with a minimal webpack configuration. Working knowledge of webpack will be helpful.

<div class="todo">

!> The current build process is highly unoptimized considering it builds the entire app into a single 9-12mb JS file. In future, [Webpack optimization](https://webpack.js.org/configuration/optimization/) is required with at least: **splitting**, **tree shaking**, and **minification** applied.

</div>

<div class="question">

!> CreateReactApp should be the last resort considering its bloatedness?

</div>

## [Blockly](https://developers.google.com/blockly/)

-   [A good resource to learn more about blockly.](https://developers.google.com/blockly/guides/overview)
-   [Documentation](https://developers.google.com/blockly/reference/overview)
-   [Sample applications](https://developers.google.com/blockly/reference/overview)
-   One of the applications from the previous list: [blockly developer tool](https://blockly-demo.appspot.com/static/demos/blockfactory/index.html). Highly useful while developing, a good way to start would be to go over [block definitions](https://developers.google.com/blockly/guides/create-custom-blocks/define-blocks) while trying to create a block in the blockly dev tool.

## P5

HTML canvas based animation library that plays an intricate part in laserpro dashboard. _Code from blockly is executed within a p5 context, creates preview, and later on the same code is run in a custom context that is replicating p5(explained further on)._ So it will be useful to be fairly familiar with p5. Tones of resources online. Some helpful ones:

-   [Documentation](https://p5js.org/reference/)
-   This [long playlist](https://www.youtube.com/watch?v=vqE8DMfOajk&list=PLglp04UYZK_PrN6xWo_nJ-8kzyXDyFUwi&index=60). The whole channel is a very good resource to learn p5.
-   A [codepen](https://codepen.io/akshat46/pen/YzZwLyB) I made while learning p5. Play around with it to get a better sense of p5. As a decent milestone, the ability to make the “sineWave” animation or something with similar complexity should be a good standard for p5 usage(present and near future) in laserpro dashboard.

## [Observer Pattern](https://refactoring.guru/design-patterns/observer)

Early on a custom small event-based orchestration was naively implemented to pass values between Blockly(non-React context) and React components. Some of the newer functionalities are implemented with a much more sophisticated solution based on a global-state management system using [Zustand](https://github.com/pmndrs/zustand) (allows consuming and setting states reactively from React, and non-React context alike). The custom state management(and even perhaps ReactContext) solutions should be switched to Zustand; however, a decent understanding of the observer pattern will give a good idea of what requirements are being fulfilled by the custom state manager.

## Other Libraries

A tentative list of any other major library being used in the app.

<!-- prettier-ignore -->
|Name|Usage|
|----|-----|
|[headlessui](https://headlessui.dev/)|Tailwind based library that gives small essential components.|
|[clsx](https://www.npmjs.com/package/clsx)|Constructing class names with passed props without having to check props truthyness.|
|[opentype.js](https://opentype.js.org/)|Retrieving font data from `.ttf` files as a JS object.|
|[react-blockly](https://github.com/nbudin/react-blockly)|Blockly as a React component.|
|[react-p5](https://github.com/Gherciu/react-p5)|P5 as a React component.|
|[react-split](https://split.js.org/)|Resizable flex boxes.|
