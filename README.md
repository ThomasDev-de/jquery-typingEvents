# jquery-typingEvents

The jQuery plugin simplifies the events that take place in an input field. The default properties are not overwritten.

## options

| name          | type     | default                       | description                                                                                          |
|---------------|----------|-------------------------------|------------------------------------------------------------------------------------------------------|
| delay         | int      | `400`                         | The time in milliseconds after the last keystroke was made and the event `typingEnd` is triggered.   |
| allowedKeys   | array    | `[]`                          | A list for allowed keys (e.g. `['a','b',..]`)                                                        |
| preventedKeys | array    | `[]`                          | A list for forbidden keys (e.g. `['a','b',..]`)                                                      |
| trim          | string   | `".,\|]\\^"`                  | Characters that are trimmed from the input after the event `typingEnd` (except for password fields). |
| onKeyDown     | function | `(event, key, allowed) => {}` | The function is triggered with each keystroke.                                                       |
| onKeyUp       | function | `(key) => {}`                 | The function is triggered each time a keystroke is released.                                         |
| onPrevented   | function | `(key) => {}`                 | The function is triggered when the keystroke is not allowed.                                         |
| onTypingStart | function | `() => {}`                    | The function is triggered when an input starts.                                                      |
| onTypingEnd   | function | `(value) => {}`               | The function is triggered when an input ends (measured by the `delay` property).                     |

## events

| event                                                     | params             |                                                                      |
|-----------------------------------------------------------|--------------------|----------------------------------------------------------------------|
| key.any                                                   | e, key, allowed    | Triggered with each keystroke.                                       |
| kex.A<br/>key.a<br/>key.B<br/>key.b<br/>key.Shift<br/>... | e, key, allowed    | Triggered on each specific keystroke.                                |
| key.prevented                                             | e, key             | Triggered on each forbidden keystroke.                               |
| typingStart                                               | e                  | Triggered at the start of the input.                                 |
| typingEnd                                                 | e, value (trimmed) | Triggered at the end of the input (measured by the `delay property). |

