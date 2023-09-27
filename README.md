## Table of contents

- [Overview](#overview)
  - [GameHub](#gamehub)
  - [Getting Started](#getting-started)
  - [Screenshots](#screenshots)
  - [Links](#links)
- [Process](#process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### GameHub

GameHub is a video game discovery web app that helps you find new and interesting games to play. With GameHub, you can search for games by platform, genre, and more. You can also view details about a game, such as its description, release date, and screenshots.

### Getting Started

To get started with GameHub, follow these steps:

1. Clone this repository to your local machine.
2. Run `npm install` to install the required dependencies.
3. Get a RAWG API key at https://rawg.io/apidocs. You'll have to create an account first.
4. Paste the API key in **.env.development**. If you don't have this file, create one. for production, paste the API key in **.env.production**.
5. Run `npm run dev` to start the web server.
6. Open http://localhost:3000 in your browser. Walla! You're ready to start using GameHub.

### Video Demo

[![Watch Demo](https://i.imgur.com/FEFhQtj.png)](https://clipchamp.com/watch/Ev4yYs2Zq7c 'Watch Demo')

### Screenshots

<table border="0">
  <tr>
    <th><b style="font-size:20px">Mobile</b></th>
    <th><b style="font-size:20px">Desktop</b></th>
 	</tr>
 	<tr>
    <td>
			<img src="https://i.imgur.com/GUObIBW.png" alt="Mobile-Home" width="100%" >
			<img src="https://i.imgur.com/36X8oiU.png" alt="Mobile-Search" width="100%" >
			<img src="https://i.imgur.com/S9pdoax.png" alt="Mobile-Game" width="100%" >
	    		<img src="https://i.imgur.com/7r0AeVn.png" alt="Mobile-Search-Light" width="100%" >
		</td>
		<td>
			<img src="https://i.imgur.com/Yctj1rY.png" alt="Desktop-Home" width="100%" >
			<img src="https://i.imgur.com/kD6YAAv.png" alt="Desktop-Search" width="100%" >
			<img src="https://i.imgur.com/FzFkZbS.png" alt="Desktop-Game" width="100%" >
			<img src="https://i.imgur.com/xhBdGEg.png" alt="Desktop-Search-Light" width="100%" >
			<img src="https://i.imgur.com/pvJnO0p.png" alt="Desktop-Genre-Light" width="100%" >
			<img src="https://i.imgur.com/UlEGkUD.png" alt="Desktop-Genre-Platform-Light" width="100%" >
		</td>
	</tr>
</table>

### Links

- Project Repo URL : [github.com/thesohailjafri/game-hub](https://github.com/thesohailjafri/game-hub)
- Project Live URL : [game-hub-thesohailjafri.vercel.app](https://game-hub-thesohailjafri.vercel.app)

## Process

1. First create a static mockup of the website using Chakra Ui.
2. Then create a dynamic mockup of the website using React Query and Zustand.
3. Then create a responsive mockup of the website using Chakra Ui media query.

### Built with

- Chakra-Ui
- React Query
- Zustand
- Vite
- Typescript
- Mobile-first workflow
- Semantic HTML5 markup

### What I learned

During this project i learned how to use Chakra-Ui and how to use rawg-io api. I also learned how to use React Query for client side caching, Zustand for state-managemtn and Vite for packager bundler. Also strentghen my knowledge of React Router v6 Custom Hooks and Typescript.

Zustand | store.ts

```js
import { create } from 'zustand'

interface GameQuery {
  genreId?: number;
  platformId?: number;
  sortOrder?: string;
  searchText?: string;
}

interface GameQueryStore {
  gameQuery: GameQuery;
  setSearchText: (searchText: string) => void;
  setGenreId: (genreId: number) => void;
  setPlatformId: (platformId: number) => void;
  setSortOrder: (sortOrder: string) => void;
}

const useGameQueryStore =
  create <
  GameQueryStore >
  ((set) => ({
    gameQuery: {},
    setSearchText: (searchText) => set(() => ({ gameQuery: { searchText } })),
    setGenreId: (genreId) =>
      set((store) => ({
        gameQuery: { ...store.gameQuery, genreId, searchText: undefined },
      })),
    setPlatformId: (platformId) =>
      set((store) => ({
        gameQuery: {
          ...store.gameQuery,
          platformId,
          searchText: undefined,
        },
      })),
    setSortOrder: (sortOrder) =>
      set((store) => ({
        gameQuery: { ...store.gameQuery, sortOrder },
      })),
  }))

export default useGameQueryStore
```

Chakra-Ui | config.ts

```js
import { extendTheme, ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'dark',
}

const theme = extendTheme({
  config,
  colors: {
    gray: {
      50: '#f9f9f9',
      100: '#ededed',
      200: '#d3d3d3',
      300: '#b3b3b3',
      400: '#a0a0a0',
      500: '#898989',
      600: '#6c6c6c',
      700: '#202020',
      800: '#121212',
      900: '#111',
    },
  },
})

export default theme
```

React Query | useGames.ts

```js
import { useInfiniteQuery } from '@tanstack/react-query';
import ms from 'ms';
import APIClient, {
  FetchResponse,
} from '../services/api-client';
import useGameQueryStore from '../store';
import Game from '../types/Game';

const apiClient = new APIClient<Game>('/games');

const useGames = () => {
  const gameQuery = useGameQueryStore((s) => s.gameQuery);

  return useInfiniteQuery<FetchResponse<Game>, Error>({
    queryKey: ['games', gameQuery],
    queryFn: ({ pageParam = 1 }) =>
      apiClient.getAll({
        params: {
          genres: gameQuery.genreId,
          parent_platforms: gameQuery.platformId,
          ordering: gameQuery.sortOrder,
          search: gameQuery.searchText,
          page: pageParam,
        },
      }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },
    staleTime: ms('24h'),
  });
};

export default useGames;
```

### Useful resources

- [Chakra-Ui](https://chakra-ui.com/) - Chakra-Ui documentation
- [Rawg-Io](https://rawg.io/apidocs) - Rawg-Io documentation

## Author

- Website - [thesohailjafri.com](https://thesohailjafri.com/)
- Frontend Mentor - [@thesohailjafri](https://www.frontendmentor.io/profile/thesohailjafri)
- Twitter - [@thesohailjafri](https://twitter.com/thesohailjafri)
