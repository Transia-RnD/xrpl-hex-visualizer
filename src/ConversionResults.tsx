import React from 'react';

// Define the shape of the results prop
export type ConversionResultsProps = {
  results: Record<string, any>;
};

const ConversionResults: React.FC<ConversionResultsProps> = ({ results }) => {
  const resultMap = Object.entries(results).map(([type, value]) => {
    // Exclude string if there are other valid results
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