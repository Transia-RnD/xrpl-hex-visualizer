# Xrpl Hex Visualizer

This is a simple web-based tool that allows users to convert hexadecimal strings into various data types. The tool is designed to handle specific formats such as XFL (eXtended Financial Ledger) and other common data types like unsigned integers and strings.

## Public Page

https://transia-rnd.github.io/xrpl-hex-visualizer/

## Features

- Convert hexadecimal strings to different formats.
- Supports conversion to XFL, UInt8, UInt32, UInt64, UInt224, Hash256, Public Key, VarString, Currency, and XRP Address.
- User-friendly interface with clear instructions.

## How to Use

1. Open the `index.html` file in a web browser.
2. Enter a hexadecimal string into the input field.
3. Click the "Convert" button to perform the conversion.
4. View the conversion results displayed under the "Conversion Results" section.

## Conversion Types

- **XFL Decimal**: Converts a hexadecimal string to its decimal representation in the XFL format.
- **UInt8**: Converts a 2-character hex string to an 8-bit unsigned integer.
- **UInt16**: Converts an 4-character hex string to a 16-bit unsigned integer.
- **UInt32**: Converts an 8-character hex string to a 32-bit unsigned integer.
- **UInt64**: Converts a 16-character hex string to a 64-bit unsigned integer.
- **UInt224**: Converts a 56-character hex string to a 224-bit unsigned integer.
- **Hash256**: Validates and displays a 64-character hex string as a Hash256.
- **Public Key**: Validates and displays a 66-character hex string as a Public Key.
- **String**: Converts a hex string to a variable-length string.
- **Currency**: Validates and displays a 40-character hex string as a Currency.
- **XRP Address**: Validates and displays a 40-character hex string as an XRP Address.

## Technical Details

The tool is implemented using HTML and JavaScript. It includes functions to handle endianness conversion, XFL normalization, and various size checks for different data types.

## Limitations

- The tool assumes that the input hex string is valid and does not perform extensive validation.
- The tool is designed for specific hex string lengths corresponding to the data types it supports.

## Contributing

Contributions to improve the tool or add new features are welcome. Please feel free to fork the repository, make changes, and submit a pull request.

## License

This project is open-source and available under the [MIT License](LICENSE).

## Disclaimer

This tool is provided "as is" without warranty of any kind, either express or implied. Use at your own risk.