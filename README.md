# jquery-typingEvents

## options

| name          | default                     | description |
|---------------|-----------------------------|-------------|
| delay         | 400                         |             |
| allowedKeys   | []                          |             |
| preventedKeys | []                          |             |
| onKeyDown     | (event, key, allowed) => {} |             |
| onKeyUp       | (key) => {}                 |             |
| onPrevented   | (key) => {}                 |             |
| onTypingStart | () => {}                    |             |
| onTypingEnd   | (value) => {}               |             |

## events

| event         |   |   |
|---------------|---|---|
| key.any       |   |   |
| kex.{key}     |   |   |
| kex.prevented |   |   |
| typingStart   |   |   |
| typingEnd     |   |   |

