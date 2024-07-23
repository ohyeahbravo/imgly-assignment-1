# JSON Interaction Tool

This web app is a simple tool to display a fetched JSON data and let users interact with the nodes, built with React, Typescript and Vite.

_It has been implemented as a solution to Exercise 1 of the IMG.LY take-home assignment._

## Featrues

- Toggle Highlight on click, including its sub-tree.
- Toggle expand/collapse status of a tree upon clicking on a chevron icon.
- Fetch and display additionally fetched data upon clicking on a leaf node. (Hint: Look for a leaf icon.)
- Drag and drop a node to change the structure of the tree.

## Setup

### Prerequisites

- Node.js 18+ or 20+.

### Insructions

- Clone the project.
- Open the terminal.
- Move to the project directory.

```
cd imgly-assignment-1
```

- Install dependencies.

```
npm run install
```

- Compile and run locally.

```
npm run dev
```

## Limitation

A node can't be moved under any of its descendants. Probably more...
