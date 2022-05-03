# Repository Structure

```bash
.
├── public
└── src
    ├── components
    │   └── blocks
    ├── context
    ├── store
    └── utils
        └── @Pcode
            └── fonts
```

## public

Entrypoint for webpack. Consists of `index.html` and `index.css`. Any images to be used _would_ go here but for the most part, images should not be needed for this dashboard.

<div class="info">

!> Laserpro utilizes `react-icons` for all the icon purposes.

</div>

## src

All the codebase.

### components

Similar to standard react projects, this consists of all the React components _and some non-React components_(blockly blocks).

### components/blocks

Contains all the **non-React** blockly blocks definition and functionalities.

### context

`ReactContext` definition and logic. As of right now there's only one context `devOptionsContext`. See more details about it in Global State Management section.
<span class="ghost">socket.js</span> is never used.

### store

Has Zustand store, currently only one. **Should** be the directory with all the global states in future.

### utils

Various utilities, including entirity of PCode logic. Some of the utilities are naively implemented _wannabe_ state managers that should be replaced with Zustand.
