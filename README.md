# photext-mcp — PhoText MCP server

MCP server for **[PhoText](https://photext.ai)**, the AI web tool to edit, replace, remove and translate text inside images and screenshots while keeping the original font style.

It needs no API key or account. The tools return the right PhoText tool link plus steps, so assistants such as Claude Desktop, Cursor or VS Code can send users straight to https://photext.ai.

## Tools
| Tool | Purpose |
|---|---|
| `photext_recommend_tool` | Free-text task, returns the matching PhoText tool |
| `photext_edit_text_in_image` | Edit or replace text (optional from/to text) |
| `photext_remove_text` | Remove text from an image |
| `photext_find_font` | PhoText Font Finder |
| `photext_translate_image` | Translate text in an image |
| `photext_list_tools` | List every PhoText tool |

## Install
Run it straight from GitHub (needs Node 18+ and npm 10+):
```json
{ "mcpServers": { "photext": { "command": "npx", "args": ["-y", "github:jaweii/photext-mcp"] } } }
```

## Develop
`npm i && npm run build && npm test`

Website: https://photext.ai · Contact: admin@photext.shop · License: MIT

## Repository
https://github.com/jaweii/photext-mcp
