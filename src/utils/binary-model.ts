/* eslint-disable no-throw-literal */
import { convertHexToString, convertStringToHex, decodeAccountID, encodeAccountID } from "xrpl";

const minMantissa = 1000000000000000n;
const maxMantissa = 9999999999999999n;
const minExponent = -96;
const maxExponent = 80;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function makeXfl(exponent: any, mantissa: any) {
  // convert types as needed
  if (typeof exponent != "bigint") exponent = BigInt(exponent);

  if (typeof mantissa != "bigint") mantissa = BigInt(mantissa);

  // canonical zero
  if (mantissa === 0n) return 0n;

  // normalize
  const is_negative = mantissa < 0;
  if (is_negative) mantissa *= -1n;

  while (mantissa > maxMantissa) {
    mantissa /= 10n;
    exponent++;
  }
  while (mantissa < minMantissa) {
    mantissa *= 10n;
    exponent--;
  }

  // canonical zero on mantissa underflow
  if (mantissa === 0) return 0n;

  // under and overflows
  if (exponent > maxExponent || exponent < minExponent) return -1; // note this is an "invalid" XFL used to propagate errors

  exponent += 97n;

  let xfl = !is_negative ? 1n : 0n;
  xfl <<= 8n;
  xfl |= BigInt(exponent);
  xfl <<= 54n;
  xfl |= BigInt(mantissa);

  return xfl;
}

export function floatToXfl(fl: any) {
  let e = 0;
  let d = "" + parseFloat("" + fl);
  d = d.toLowerCase();
  let s = d.split("e");
  if (s.length === 2) {
    e = parseInt(s[1]);
    d = s[0];
  }
  s = d.split(".");
  if (s.length === 2) {
    d = d.replace(".", "");
    e -= s[1].length;
  } else if (s.length > 2) d = BigInt(0).toString();

  return makeXfl(e, d);
}

export function flipBeLe(endian: bigint): string {
  const hexString = endian.toString(16).toUpperCase();
  let flippedHex = "";
  for (let i = hexString.length - 2; i >= 0; i -= 2) {
    flippedHex += hexString.slice(i, i + 2);
  }
  return flippedHex;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getExponent(xfl: any) {
  if (xfl < 0n) throw "Invalid XFL";
  if (xfl === 0n) return 0n;
  return ((xfl >> 54n) & 0xffn) - 97n;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getMantissa(xfl: any) {
  if (xfl < 0n) throw "Invalid XFL";
  if (xfl === 0n) return 0n;
  return xfl - ((xfl >> 54n) << 54n);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isNegative(xfl: any) {
  if (xfl < 0n) throw "Invalid XFL";
  if (xfl === 0n) return false;
  return ((xfl >> 62n) & 1n) === 0n;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function toString(xfl: any) {
  if (xfl < 0n) throw "Invalid XFL";
  if (xfl === 0n) return "<zero>";
  return (
    (isNegative(xfl) ? "-" : "+") +
    getMantissa(xfl).toString() +
    "E" +
    getExponent(xfl).toString()
  );
}

export function flipHex(hexString: string): string {
  let flippedHex = "";
  for (let i = hexString.length - 2; i >= 0; i -= 2) {
    flippedHex += hexString.slice(i, i + 2);
  }
  return flippedHex;
}

export function hexToUInt8(hex: string): any {
  return parseInt(hex, 16);
}

export function hexToUInt16(hex: string): any {
  return parseInt(hex, 16);
}

export function hexToUInt32(hex: string): any {
  return parseInt(hex, 16);
}

export function hexToUInt64(hex: string): any {
  return BigInt(`0x${hex}`);
}

export function hexToUInt224(hex: string): any {
  return BigInt(`0x${hex}`);
}

export function hexToXfl(hex: string): any {
  if (hex === "0000000000000000") {
    return 0;
  }
  const value = flipHex(hex);
  const xfl = hexToUInt64(value.slice(0, 16));
  return parseFloat(toString(xfl));
}

export function xflToHex(value: any): string {
  if (value === 0) {
    return "0000000000000000";
  }
  return floatToLEXfl(String(value));
}

export function floatToLEXfl(fl: string): string {
  const xfl = floatToXfl(fl);
  return flipBeLe(xfl as bigint);
}

export function hexToCurrency(hex: string): any {
  const cleanHex = hex.replace(/0/g, " ").trim().replace(/ /g, "0");
  const value = convertHexToString(cleanHex);
  return value.replace(/\0[\s\S]*$/g, "");
}

export function hexToXRPAddress(hex: string): any {
  const value = encodeAccountID(Buffer.from(hex, "hex"));
  return value.slice(0, 40);
}


export function uint8ToHex(value: any): string {
  if (value < 0 || value > 255) {
    throw Error(`Integer ${value} is out of range for uint8 (0-255)`)
  }
  return value.toString(16).padStart(2, '0').toUpperCase()
}

export function uint16ToHex(value: any): string {
  if (value < 0 || value > 2 ** 16 - 1) {
    throw Error(`Integer ${value} is out of range for uint32 (0-4294967295)`)
  }
  return value.toString(16).padStart(4, '0').toUpperCase()
}

export function uint32ToHex(value: any): string {
  if (value < 0 || value > 2 ** 32 - 1) {
    throw Error(`Integer ${value} is out of range for uint32 (0-4294967295)`)
  }
  return value.toString(16).padStart(8, '0').toUpperCase()
}

export function uint64ToHex(value: any): string {
  if (value < 0 || value > BigInt(18446744073709551615n)) {
    throw Error(
      `Integer ${value} is out of range for uint64 (0-18446744073709551615)`
    )
  }
  return value.toString(16).padStart(16, '0').toUpperCase()
}

export function uint224ToHex(value: any): string {
  if (
    value < 0 ||
    value >
      BigInt(
        26959946667150639794667015087019630673637144422540572481103610249215n
      )
  ) {
    throw Error(
      `Integer ${value} is out of range for uint224 (0-26959946667150639794667015087019630673637144422540572481103610249215)`
    )
  }
  return value.toString(16).padStart(56, '0').toUpperCase()
}

export function currencyToHex(value: any): string {
  const content = convertStringToHex(value)
  return content.padEnd(16, '0').padStart(40, '0') // 40
}

export function xrpAddressToHex(value: any): string {
  const content = decodeAccountID(value)
  return Buffer.from(content).toString('hex').toUpperCase() // 40
}
