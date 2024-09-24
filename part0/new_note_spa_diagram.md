```mermaid
sequenceDiagram
    participant browser
    participant server

    Note left of browser: The user submits the form

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    Note right of server: Status code 201
    server-->>browser: json file new_note_spa
    deactivate server
```