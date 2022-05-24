# Labyrinth

## Description

This Repo is a NextJs project consuming a maze API.

NextJs was chosen due to personal interest in the framework.

---

App consists of the `/` route with [`<Main />`](components/main.js) component.

For simplicity sake, one route is used and only one component to display the game board

---

App state is handled with [`<LabyrinthContext />`](./store/labyrinth-context.js)

Simple context store to handle game state. Ex: Player name, game options and status

---

Data fetching is done with a [`useFetch`](hooks/use-fetch.js) hook

`useFetch` simplifies data fetching and provides status, data and errors if any for the request.  

---

Keyboard controls are done with [`useEventListener`](hooks/use-event-listener.js) hook

`useEventListener` is a simple hook to help with handling events. Found while googling something related.

## Requirements

Create `.env.local` file with values

```
NEXT_PUBLIC_BASE_URL = Challenge base url
NEXT_PUBLIC_API_PATH = Maze API endpoint
```

## Notes

This is what was done within 2~3 hour time frame. 

Potential improvements:

1. General UI. Ex: Add custom styling for the game, add dropdown input for possible valid player names.
2. Board UI. Ex: Simple symbols could be replaced with Svg images and icons added for active elements.
3. Mobile UI/UX. Ex: Make the game more mobile friendly, add swiping gesture support.
4. Testing. Ex: Could add some tests. Might add Vitest and React Testing Library later on
5. Usability in general could be improved.