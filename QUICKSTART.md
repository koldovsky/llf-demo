# Quick Start Guide

This guide will help you get started with the QR Code MCP Server.

## Prerequisites

- Node.js (version 18 or higher recommended)
- npm (comes with Node.js)

## Installation

1. Clone this repository:
```bash
git clone https://github.com/koldovsky/llf-demo.git
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

## Usage with Claude Desktop

1. Find your Claude Desktop configuration file:
   - **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

2. Add the QR code server configuration:
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

   Replace `/absolute/path/to/llf-demo` with the actual path where you cloned this repository.

3. Restart Claude Desktop

4. You can now ask Claude to generate QR codes! Try:
   - "Generate a QR code for https://github.com"
   - "Create a QR code with the text 'Hello World'"
   - "Generate a 600px QR code for my website URL"

## Troubleshooting

### Server not connecting
- Ensure the path in the configuration is absolute and correct
- Check that the build completed successfully (`npm run build`)
- Verify Node.js is installed and accessible from command line

### QR code not generating
- Check the Claude Desktop logs for error messages
- Ensure you provide valid text/URL to encode
- Try restarting Claude Desktop after configuration changes

## Examples

Here are some example prompts you can use with Claude:

1. **Basic URL QR Code:**
   - "Generate a QR code for https://example.com"

2. **Text QR Code:**
   - "Create a QR code containing my phone number: +1-555-0123"

3. **Custom Size:**
   - "Generate a 800x800 pixel QR code for https://github.com"

4. **High Error Correction:**
   - "Create a QR code with high error correction for: Meeting Room A - 3PM"

5. **Email:**
   - "Generate a QR code for my email: contact@example.com"

## Advanced Configuration

### Error Correction Levels

Choose the appropriate error correction level based on your use case:

- **L (Low - ~7%)**: Best for clean, large QR codes
- **M (Medium - ~15%)**: Good default choice (default)
- **Q (Quartile - ~25%)**: Better for environments where codes might get damaged
- **H (High - ~30%)**: Best for critical information or when code might be partially obscured

### Size Recommendations

- **Small (150-200px)**: Good for digital displays
- **Medium (300-400px)**: Default, works well for most cases
- **Large (500-1000px)**: Better for printing or when more detail is needed

## Support

For issues or questions, please open an issue on the GitHub repository.
