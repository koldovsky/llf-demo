# QR Code MCP Server

A Model Context Protocol (MCP) server that provides QR code generation functionality. This server allows AI assistants to generate QR codes from text or URLs.

## Features

- Generate QR codes from any text or URL
- Customizable QR code size
- Configurable error correction levels (L, M, Q, H)
- Returns QR codes as base64-encoded PNG images

## Installation

1. Clone this repository:
```bash
git clone <repository-url>
cd llf-demo
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

## Usage

### As a standalone MCP server

The server can be run directly:
```bash
npm start
```

### Integration with Claude Desktop

Add this configuration to your Claude Desktop config file:

**MacOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "qrcode": {
      "command": "node",
      "args": ["/absolute/path/to/llf-demo/dist/index.js"]
    }
  }
}
```

Replace `/absolute/path/to/llf-demo` with the actual path to this repository.

### Integration with other MCP clients

Add to your MCP client configuration:
```json
{
  "mcpServers": {
    "qrcode": {
      "command": "node",
      "args": ["dist/index.js"],
      "cwd": "/path/to/llf-demo"
    }
  }
}
```

## Available Tools

### generate_qrcode

Generate a QR code from text or URL.

**Parameters:**
- `text` (required, string): The text or URL to encode in the QR code
- `size` (optional, number): The width/height of the QR code in pixels (default: 300)
- `errorCorrectionLevel` (optional, string): Error correction level - "L" (~7%), "M" (~15%), "Q" (~25%), or "H" (~30%). Default: "M"

**Returns:**
- A base64-encoded PNG image of the QR code
- Text confirmation of the QR code generation

**Example usage in conversation:**
- "Generate a QR code for https://example.com"
- "Create a QR code with the text 'Hello World' at 500px size"
- "Generate a QR code for my contact info with high error correction"

## Error Correction Levels

QR codes support different error correction levels, which determine how much damage the code can sustain and still be readable:

- **L (Low)**: ~7% of codewords can be restored
- **M (Medium)**: ~15% of codewords can be restored (default)
- **Q (Quartile)**: ~25% of codewords can be restored
- **H (High)**: ~30% of codewords can be restored

Higher error correction levels make the QR code more robust but also more dense.

## Development

### Watch mode for development
```bash
npm run dev
```

This will rebuild the project automatically when you make changes to the source files.

### Project structure
```
llf-demo/
├── src/
│   └── index.ts          # Main MCP server implementation
├── dist/                 # Compiled JavaScript output
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── README.md            # This file
```

## Examples

Once integrated with an MCP client, you can use natural language to generate QR codes:

1. **Simple URL QR code:**
   - "Generate a QR code for https://github.com"

2. **Custom size:**
   - "Create a 600x600 pixel QR code for https://example.com"

3. **High error correction:**
   - "Generate a QR code for 'Meeting at 3PM' with high error correction level"

4. **Contact information:**
   - "Create a QR code for my email: contact@example.com"

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.