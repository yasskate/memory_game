# Memory Game Challenge

## Getting started

|Home|
|---|
|![memory-game](https://user-images.githubusercontent.com/9702671/222873150-1fd584bf-8319-42b9-a95b-18875ae3ec00.PNG)|
---

**Clone the app**

`$ git clone git@github.com:yasskate/memory_game.git && cd memory_game/`

**Install dependencies**

`$ yarn install`


**Starting the server**

`$ yarn run dev`

**Running the tests**

`$ yarn run test`

**Running the test coverage**

`$ yarn run test:coverage`


---

## Folder Structure
|Folder|File|Description|
|---|---|---|
|sec/assets| ... | Contains the memory games images |
|src/components| ... | Reusable components to use through the game|
|src/entities| ... | Has the entities game, the main actors |
|src/hooks| ... | Hook functions |
|src/stores| ... | Has the global state files |
|src/styles| ... | Has the styled components |
|src/utils| ... | Any useful function, method, constant that we can use through the game |
|| App.tsx | Memory game |
|| Main.tsx | Main file |
|| *.test.{ts,tsx} | Testing file |
|| README.md | This file |


```bash
.
|__/public
|__/src
|      |__assets/
|      |__components/
|      |__entities/
|      |__hooks/
|      |__stores/
|      |__styles/
|      |__utils/
|__App.tsx
|__main.tsx
|__README.md
```
---

# Stack
- Node >v16.10
- Yarn
- React powered by Vite
- Styled Components
- Zustand
- Jest
- React Testing Library


