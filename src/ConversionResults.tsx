import React from 'react';
import { flipHex } from './utils/binary-model';

// Define the shape of the results prop
export type ConversionResultsProps = {
  results: Record<string, any>;
};

const isInt = [
  'uint8',
  'uint16',
  'uint32',
  'uint64'
]

const carrayList = [
  'namespace',
  'hash',
  'xrpCurrency',
  'xrpAddress'
]

const createCArray = (value: string) => {
  // split the string into bytes and return as c array 0x00, 0x01, 0x02, ...
  // uint8_t array[] = {0x00, 0x01, 0x02, ...};
  const bytes = value.match(/.{1,2}/g);
  if (bytes) {
    return `uint8_t array[] = {${bytes.map((byte) => `0x${byte}`).join(', ')}};`;
  }
}

const ConversionResults: React.FC<ConversionResultsProps> = ({ results }) => {
  const resultMap = Object.entries(results).map(([type, value]) => {
    // Exclude string if there are other valid results
    if (type === 'xrpCurrency' && value.length !== 40) {
      return null
    }
    if (value !== 'Invalid size' && value !== '') {
      if (type === 'xflDecimal') {
        return <p key={type}>{`${type} (uint64): ${value}`}</p>;
      } else {
        if (isInt.includes(type)) {
          return <p key={type}>
            {`${type}: BE=${value} LE=${flipHex(value)}`}
          </p>;
        }
        return <p key={type}>
          {`${type}: ${value}`}
          {carrayList.includes(type) && (
            <div>
              <p>{`${type} array: `}</p>
              <textarea
                value={createCArray(value)}
                placeholder={`${type} array: `}
                rows={2}
                cols={110}
                style={{ fontFamily: 'monospace' }}
              />
            </div>
          )}
        </p>;
      }
    }
    return null; // or you could return a placeholder if you want to show something for invalid sizes
  }).filter((m: any) => m !== null);

  return (
    <div id="conversionResults">
      {resultMap.length > 0 ? resultMap : 'No Results'}
    </div>
  );
};

export default ConversionResults;