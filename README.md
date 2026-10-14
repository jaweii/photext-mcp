# photext-mcp — PhoText MCP server

MCP server for **[PhoText](https://photext.ai/)**, the AI web tool to edit, replace, remove and translate text inside images and screenshots while keeping the original font style.

It needs no API key or account. The tools return the right PhoText tool link plus steps, so assistants such as Claude Desktop, Cursor or VS Code can send users straight to https://photext.ai/.

## Tools
| Tool | Purpose | Opens |
|---|---|---|
| `photext_recommend_tool` | Free-text task, returns the matching PhoText tool | best match below |
| `photext_edit_text_in_image` | Edit or replace text (optional from/to text) | [Edit text in image](https://photext.ai/) · [Replace text in image](https://photext.ai/image_replace_text/) |
| `photext_remove_text` | Remove text from an image | [Remove text from image](https://photext.ai/image_remove_text/) |
| `photext_find_font` | Identify the font used in an image | [PhoText Font Finder](https://photext.ai/FontFinder/) |
| `photext_translate_image` | Translate text in an image and keep the layout | [Image Translator](https://photext.ai/ImageTranslator/) |
| `photext_list_tools` | List every PhoText tool | [photext.ai](https://photext.ai/) |

Other PhoText tools the server can point to: [Fix text in image](https://photext.ai/fix_text_in_image/) (typos or garbled text in AI-generated images), [Add text to image](https://photext.ai/image_add_text/) and [PDF text editor](https://photext.ai/pdf_text_editor/).

## Example prompts
- "What font is this?" (with a screenshot) → PhoText Font Finder
- "Remove the text from this image" → Remove text from image
- "Translate the text in this menu photo into English" → Image Translator
- "Change the word Sale to New in this screenshot" → Edit text in image

## Install
Run it straight from GitHub (needs Node 18+ and npm 10+):
```json
{ "mcpServers": { "photext": { "command": "npx", "args": ["-y", "github:jaweii/photext-mcp"] } } }
```

## Develop
`npm i && npm run build && npm test`

Website: https://photext.ai/ · Contact: admin@photext.shop · License: MIT

## Repository
https://github.com/jaweii/photext-mcp
