#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";
import QRCode from "qrcode";

// Constants
const MAX_TEXT_DISPLAY_LENGTH = 50;

const server = new Server(
  {
    name: "qrcode-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Define the QR code generation tool
const QR_CODE_TOOL: Tool = {
  name: "generate_qrcode",
  description: "Generate a QR code from text or URL. Returns the QR code as a data URL (base64 encoded PNG image) that can be displayed or saved.",
  inputSchema: {
    type: "object",
    properties: {
      text: {
        type: "string",
        description: "The text or URL to encode in the QR code",
      },
      size: {
        type: "number",
        description: "The width/height of the QR code in pixels (default: 300)",
        default: 300,
      },
      errorCorrectionLevel: {
        type: "string",
        description: "Error correction level: L (Low ~7%), M (Medium ~15%), Q (Quartile ~25%), H (High ~30%). Default: M",
        enum: ["L", "M", "Q", "H"],
        default: "M",
      },
    },
    required: ["text"],
  },
};

// Handle list tools request
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [QR_CODE_TOOL],
  };
});

// Handle tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "generate_qrcode") {
    const { text, size = 300, errorCorrectionLevel = "M" } = request.params.arguments as {
      text: string;
      size?: number;
      errorCorrectionLevel?: "L" | "M" | "Q" | "H";
    };

    if (!text || typeof text !== "string") {
      throw new Error("Invalid text parameter. Text must be a non-empty string.");
    }

    try {
      // Generate QR code as data URL
      const qrCodeDataUrl = await QRCode.toDataURL(text, {
        width: size,
        errorCorrectionLevel: errorCorrectionLevel,
        margin: 2,
      });

      // Extract base64 data from data URL
      const base64Match = qrCodeDataUrl.match(/^data:image\/png;base64,(.+)$/);
      if (!base64Match || !base64Match[1]) {
        throw new Error("Failed to extract base64 data from QR code");
      }

      return {
        content: [
          {
            type: "text",
            text: `QR code generated successfully for: "${text.substring(0, MAX_TEXT_DISPLAY_LENGTH)}${text.length > MAX_TEXT_DISPLAY_LENGTH ? "..." : ""}"`,
          },
          {
            type: "image",
            data: base64Match[1],
            mimeType: "image/png",
          },
        ],
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      throw new Error(`Failed to generate QR code: ${errorMessage}`);
    }
  }

  throw new Error(`Unknown tool: ${request.params.name}`);
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("QR Code MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
