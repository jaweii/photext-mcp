#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
const BASE = "https://photext.ai";
const TOOLS = {
    edit_text: { path: "/", title: "Edit text in image", desc: "Edit or retype text inside a photo, screenshot or poster while keeping the original font style." },
    replace_text: { path: "/image_replace_text/", title: "Replace text in image", desc: "Replace words in an image with new text in a matching font." },
    remove_text: { path: "/image_remove_text/", title: "Remove text from image", desc: "Erase text from an image and fill the background naturally." },
    fix_text: { path: "/fix_text_in_image/", title: "Fix text in image", desc: "Fix typos or garbled text (e.g. in AI-generated images)." },
    add_text: { path: "/image_add_text/", title: "Add text to image", desc: "Add new text to an image." },
    translate_image: { path: "/ImageTranslator/", title: "Translate text in image", desc: "Translate the text inside an image and keep the layout." },
    find_font: { path: "/FontFinder/", title: "Font finder", desc: "Identify the font used in an image." },
    pdf_text_editor: { path: "/pdf_text_editor/", title: "PDF text editor", desc: "Edit text inside PDF files." },
    image_scanner: { path: "/image_scanner/", title: "Image scanner", desc: "Scan documents and extract content from images." },
    poster_change_text: { path: "/poster_change_text/", title: "Change text on poster", desc: "Change text on posters and flyers." },
    ecommerce_change_text: { path: "/ecommerce_main_image_change_text/", title: "Change text on product images", desc: "Change text on e-commerce product images." },
    ai_image_editor: { path: "/ai_image_editor/", title: "AI image editor", desc: "General AI image editing." },
    resize_image: { path: "/resize_image/", title: "Resize image", desc: "Resize images." },
};
const url = (k) => BASE + TOOLS[k].path + "?utm_source=mcp&utm_medium=photext-mcp";
const INTENTS = [
    [/font|typeface|what font/i, "find_font"],
    [/translat/i, "translate_image"],
    [/remov|erase|delete|watermark|clean/i, "remove_text"],
    [/typo|fix|garbl|misspell/i, "fix_text"],
    [/pdf/i, "pdf_text_editor"],
    [/poster|flyer/i, "poster_change_text"],
    [/product|ecommerce|e-commerce|amazon|shop/i, "ecommerce_change_text"],
    [/scan|ocr|extract/i, "image_scanner"],
    [/add (some )?text|caption/i, "add_text"],
    [/replac|swap/i, "replace_text"],
    [/resiz/i, "resize_image"],
];
export function pick(task) {
    for (const [re, k] of INTENTS)
        if (re.test(task))
            return k;
    return "edit_text";
}
const text = (s) => ({ content: [{ type: "text", text: s }] });
const answer = (k, extra = "") => text(`${TOOLS[k].title}: ${TOOLS[k].desc}\nOpen: ${url(k)}\n${extra}Steps: open the link, upload the image, select the text area, then type or apply the change and download. Runs in the browser at https://photext.ai.`);
const server = new McpServer({ name: "photext-mcp", version: "0.1.0" });
server.tool("photext_recommend_tool", "Given a task about text in an image (edit, replace, remove, translate, fix typos, identify a font, PDF text), return the matching PhoText (photext.ai) tool link and steps.", { task: z.string().describe("What the user wants to do, e.g. 'change the price on this flyer'") }, async ({ task }) => answer(pick(task)));
server.tool("photext_edit_text_in_image", "Get the PhoText link to edit or replace text in an image while keeping the original font.", { from_text: z.string().optional(), to_text: z.string().optional() }, async ({ from_text, to_text }) => answer(from_text || to_text ? "replace_text" : "edit_text", from_text && to_text ? `Change: "${from_text}" -> "${to_text}"\n` : ""));
server.tool("photext_remove_text", "Get the PhoText link to remove text from an image.", {}, async () => answer("remove_text"));
server.tool("photext_find_font", "Get the PhoText Font Finder link to identify a font from an image.", {}, async () => answer("find_font"));
server.tool("photext_translate_image", "Get the PhoText link to translate text inside an image.", { target_language: z.string().optional() }, async ({ target_language }) => answer("translate_image", target_language ? `Target language: ${target_language}\n` : ""));
server.tool("photext_list_tools", "List all PhoText tools with links.", {}, async () => text(Object.keys(TOOLS).map(k => `- ${TOOLS[k].title}: ${url(k)} — ${TOOLS[k].desc}`).join("\n")));
server.resource("photext-about", "photext://about", async (u) => ({ contents: [{ uri: u.href, mimeType: "text/plain",
            text: "PhoText (https://photext.ai) is an AI web tool to edit, replace, remove and translate text inside images and screenshots while keeping the original font style. Also offers Font Finder, PDF text editor and image scanner. Contact: admin@photext.shop" }] }));
if (process.argv[1] && !process.env.PHOTEXT_NO_START)
    await server.connect(new StdioServerTransport());
