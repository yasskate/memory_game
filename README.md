# Memory Game Challenge

## Getting started

|Home|Pokedex|Pokemon Detail|
|---|---|---|
|![photo_2023-01-30_10-37-48](https://user-images.githubusercontent.com/9702671/215538924-17d3cf91-9c21-43ad-9961-7851da91702a.jpg)|![photo_2023-01-30_10-37-55](https://user-images.githubusercontent.com/9702671/215539255-da2e1e12-41ee-417f-9460-6bf00d24337b.jpg)|![photo_2023-01-30_10-38-06](https://user-images.githubusercontent.com/9702671/215539302-9497adc1-dc93-4ff2-9ddf-a22de9d0194f.jpg)|

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


