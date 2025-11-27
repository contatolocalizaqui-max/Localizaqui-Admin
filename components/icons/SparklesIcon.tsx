
import React from 'react';

export const SparklesIcon: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  const src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAD6ElEQVR4nO2aS0hWQRTHf+rCnkJQZi+IgoKybFWLAuurTbVqUVlBq95RYYvARSK0CVoFFT2gJxW0KQh6GS6iRVlUZOaiFlERloJSmdrDLwaOcPnw887cO/fOWP7hwMf95s6cc+6c5wwMYxhpYSawE7gCPAPagZ9C7fLssoyZwT+CIqAKeAj0AVlN6pN31gOFDFGsAFoMhM5HzUCGIYSRwCkLgufSCWAEnmMC0JiA8P30CBiPx8K/TlD4oEmM93HbN6YgfHAneGUOp1IUvp+O45G3zzqijA9xvsWhAppd5wlVEZh+CewD5gKjhebKs6YI861zqYCHBoz2SJo72BdT/+0Ceg3mfYDD3L7PQPhlBnNnDJSgeJiOA+w0+Eo7Isy/22D+7TjAZQObL4zoYF9prnEJB3iuydzeGGtUa67xFAdo12RuTow1yjXX+IID9GoyNybGGmMNnGzq6ElBASWaa3TjAJ89MoFWHKBRkzmV4UXFfoPqMHWc02SuSUJakmFQ8ZI6tmgyl5X01hR7DOZXvDhJhbOa1GtYui43rAectdGfGyphd4g5FMmXNxH+BQ5xwIDRfnolGV65hMgx8rvawOaDVONSAeOA7xGYtkUqFynFMU46VMBpPMAs4I8jBczHE1x3IPxNPMJsOeVNS/jf0kf0CsdSVIDyO14ejX1NQXgVdcrwCAVyOHLT8A5AHFLd6LURawxrKAY2R0xebNFbqTbV2UJqmAjUAW0OBc+lTuAoMC1JwSuA8yF5ujKBewk5xDPA/ZAxircLwIK07bsXuAjMC7x3w6LwDQF7r5DT6B9J+olise9mjW7sYWBKnjrhnQXhW/N4/VJNUzT2E5uATyGTqpsgW+VixGBYAvyKmfCEHakpHrZpnFIrmTaGCV+nYd8rZYvroiaGAg4arKN4WgXUh8xZO1gXJpun5DwbsG9TKMauRhD+mqGig5gvPOdr3Q/YnbqbM0g5mUOWsi61TR8bCP9Ew7x0UCYy5DrM2wMNbssZVIldTAI+agivxky2vHalzlFaW8IK6N+aHYMI3yFhzjaW6ijgToImEMRioGsA4bskathEPhO4NdDgTIgTtNl9WZ3TP/gpz2whzAnmDa21IfZZL6EmqncOYg3wAXgvv+NCNwyGhtYNGolQi1xLseGp42Kk8KKTCKlbbVZT4U6pwqaSPnRT4TdxSuYCg2JIJS4LSR6pFENeLezbh5iYxtYbCqZYrNkSi8KcqZJH4RAFhttzkYaZdTswM6ttsx6NDs8auQRVIr8bQt7pkbmTSJWdhSgdchlqnbbOvbBvF4cn3tq3zULliNwe+ybUJM+8Oe4eBv8J/gLzKIVYigsb7AAAAABJRU5ErkJggg==";
  
  return (
    <div 
      {...props}
      className={`bg-current ${props.className || ''}`} 
      style={{
        maskImage: `url(${src})`,
        maskSize: 'contain',
        maskRepeat: 'no-repeat',
        maskPosition: 'center',
        WebkitMaskImage: `url(${src})`,
        WebkitMaskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        ...props.style
      }}
    />
  );
};
