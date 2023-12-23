import React, { useState } from "react";
import { convertHexToString } from "xrpl";
import {
  hexToUInt8,
  hexToUInt16,
  hexToUInt32,
  hexToUInt64,
  hexToUInt224,
  hexToCurrency,
  hexToXRPAddress,
  flipBeLe,
  hexToXfl,
  flipHex,
} from "./utils/binary-model";
import ConversionResults, { ConversionResultsProps } from "./ConversionResults";

const HexConversion: React.FC = () => {
  const [hexInput, setHexInput] = useState<string>("");
  const [conversionResults, setConversionResults] = useState<ConversionResultsProps>(
    undefined
  );

  function convertHex(): void {
    const hex = hexInput
    let results: Record<string, any> = {};
    try {
      // Check if the input is a valid XFL or XLF hex
      if (hex.length === 16) {
        // XFL Hex: 16 digits, flip endianness then get the int
        // @ts-ignore
        const value = flipHex(hex);
        const xflDecimal = hexToUInt64(value.slice(0, 16));
        const xflInt = hexToXfl(hex);
        if (xflInt !== -0) {
          results.xflDecimal = xflDecimal;
          results.xflInt = xflInt;
        }
      } else if (hex.length === 19) {
        // @ts-ignore
        const xflHex = flipBeLe(BigInt(hex));
        const xflDecimal = hexToXfl(xflHex);
        if (xflDecimal !== -0) {
          results.xflHex = xflHex;
          results.xflDecimal = xflDecimal;
        }
      } else if (hex.length === 40) {
        // @ts-ignore
        const xrpAddress = hexToXRPAddress(hex);
        if (xrpAddress) {
          results.xrpAddress = xrpAddress;
        }
      }
    } catch (error) {
      console.log(error);
    }
    if (Object.keys(results).length === 0) {
      // If not XFL or XLF, perform other conversions
      results.uint8 = hex.length === 2 ? hexToUInt8(hex) : "Invalid size";
      results.uint16 = hex.length === 4 ? hexToUInt16(hex) : "Invalid size";
      results.uint32 = hex.length === 8 ? hexToUInt32(hex) : "Invalid size";
      results.uint64 = hex.length === 16 ? hexToUInt64(hex) : "Invalid size";
      results.uint224 = hex.length === 56 ? hexToUInt224(hex) : "Invalid size";
      results.hash256 = hex.length === 64 ? hex : "Invalid size";
      results.publicKey = hex.length === 66 ? hex : "Invalid size";
      results.string = convertHexToString(hex);
      results.currency =
        hex.length === 40 ? hexToCurrency(hex) : "Invalid size";
      results.xrpAddress =
        hex.length === 40 ? hexToXRPAddress(hex) : "Invalid size";
    }
    console.log(results);
    
    setConversionResults(results as ConversionResultsProps);
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    setHexInput(event.target.value);
  };

  return (
    <div>
      <h1>Xrpl Hex Visualizer</h1>
      <p>Paste a hex string below to convert it in various types.</p>
      <input
        type="text"
        value={hexInput}
        onChange={handleInputChange}
        placeholder="Enter hex string"
        size={50}
      />
      <button onClick={convertHex}>Convert</button>

      <h2>Conversion Results</h2>
      <div>
        {conversionResults && <ConversionResults results={conversionResults} />}
      </div>
    </div>
  );
};

export default HexConversion;
