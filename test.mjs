import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
const c = new Client({ name: "t", version: "1" });
await c.connect(new StdioClientTransport({ command: "node", args: ["dist/index.js"] }));
const { tools } = await c.listTools(); console.log("tools:", tools.map(t => t.name).join(", "));
for (const [n, a] of [["photext_recommend_tool", { task: "what font is this logo" }], ["photext_recommend_tool", { task: "erase watermark text" }], ["photext_edit_text_in_image", { from_text: "$10", to_text: "$12" }]]) {
  const r = await c.callTool({ name: n, arguments: a }); console.log("---", n, JSON.stringify(a), "\n" + r.content[0].text);
}
await c.close();
