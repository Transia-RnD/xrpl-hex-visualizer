import React from 'react';

// Define the shape of the results prop
export type ConversionResultsProps = {
  results: Record<string, any>;
};

const ConversionResults: React.FC<ConversionResultsProps> = ({ results }) => {
  console.log(results);

  // Check if there are any valid results other than string
  const hasOtherValidResults = Object.entries(results).some(
    ([type, value]) => type !== 'string' && value !== 'Invalid size' && value !== ''
  );

  const resultMap = Object.entries(results).map(([type, value]) => {
    // Exclude string if there are other valid results
    if (type === 'string' && hasOtherValidResults) {
      return null;
    }
    if (value !== 'Invalid size' && value !== '') {
      if (type === 'xflDecimal') {
        return <p key={type}>{`${type} (uint64): ${value}`}</p>;
      } else {
        return <p key={type}>{`${type}: ${value}`}</p>;
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