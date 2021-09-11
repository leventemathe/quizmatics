import React from 'react';

export const useAsync = <Resource>(
  asyncFunc: () => Promise<Resource | Error>
) => {
  const [resource, setResource] = React.useState<Resource | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const callAsyncFunc = async () => {
    setIsLoading(true);
    const result = await asyncFunc();
    setIsLoading(false);

    if (result instanceof Error) {
      setError(result.message);
    } else {
      setResource(result);
    }
  };

  const clear = () => {
    setError(null);
  };

  return { resource, error, isLoading, callAsyncFunc, clear };
};
