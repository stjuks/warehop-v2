import { useEffect, useRef, useState } from 'react';
import { DocumentNode } from 'graphql';
import { useLazyQuery, LazyQueryHookOptions, useMutation } from '@apollo/react-hooks';
import Query from '@ui/api/Query';
import Mutation from '@ui/api/Mutation';

export function useDebounce<A extends any[]>(callback: (...args: A) => void, wait: number) {
  // track args & timeout handle between calls
  const argsRef = useRef<A>();
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  function cleanup() {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
  }

  // make sure our timeout gets cleared if
  // our consuming component gets unmounted
  useEffect(() => cleanup, []);

  return function debouncedCallback(...args: A) {
    // capture latest args
    argsRef.current = args;

    // clear debounce timer
    cleanup();

    // start waiting again
    timeout.current = setTimeout(() => {
      if (argsRef.current) {
        callback(...argsRef.current);
      }
    }, wait);
  };
}

export const useLocalSetting = (defaultValue: any, settingName: string) => {
  const [setting, setSetting] = useState(defaultValue);

  const settings = JSON.parse(localStorage.getItem('settings') || '{}');

  useEffect(() => {
    if (settings[settingName]) {
      setSetting(settings[settingName]);
    } else {
      settings[settingName] = defaultValue;
      localStorage.setItem('settings', JSON.stringify(settings));
    }
  }, [setting]);

  if (settings[settingName]) {
    return [settings[settingName], setSetting];
  }

  return [setting, setSetting];
};

interface GraphQLQueryOptions extends LazyQueryHookOptions {
  loadOnMount?: boolean;
  isPaginated?: boolean;
}

export const useGraphQLQuery = (query: Query, options?: GraphQLQueryOptions) => {
  const [fetchData, { data, fetchMore, ...restTuple }] = useLazyQuery(query.query, options);

  let transformedData: any = undefined;

  if (data && query.transformResult) {
    transformedData = query.transformResult(data);
  }

  useEffect(() => {
    if (options?.loadOnMount) {
      fetchData();
    }
  }, []);

  const fetchMoreData = (variables) => {
    if (query.onFetchMore && query.fetchMoreOptions) {
      if (transformedData)
        return fetchMore({
          query: query.query,
          variables: variables || options?.variables,
          ...query.fetchMoreOptions(transformedData, options?.variables),
          updateQuery: (prevResult, { fetchMoreResult }) => {
            const transformedPrev = query.transformResult
              ? query.transformResult(prevResult)
              : prevResult;

            const transformedNew = query.transformResult
              ? query.transformResult(fetchMoreResult)
              : fetchMoreResult;

            return query.onFetchMore
              ? query.onFetchMore(transformedPrev, transformedNew)
              : fetchMoreResult;
          },
        });
    }

    return () => undefined;
  };

  const customFetchData = async (variables) => {
    await fetchData({ variables });
  };

  const result: [any, [any, any], typeof restTuple] = [
    transformedData,
    [fetchMoreData, customFetchData],
    restTuple,
  ];

  return result;
};

export const useGraphQLMutation = <InputValues>(mutation: Mutation) => {
  const [mutate, { client }] = useMutation(mutation.mutation, {
    update: (cache, result) => {
      if (mutation.updateCache) mutation.updateCache(cache, result);
    },
  });

  const customMutate = async (variables: InputValues, customValues?: any) => {
    try {
      const omitTypename = (key, value) => (key === '__typename' ? undefined : value);
      const newVariables = JSON.parse(JSON.stringify(variables), omitTypename);
      const result = await mutate({
        variables: newVariables,
      });

      client?.cache.reset();

      if (mutation.onMutate) mutation.onMutate({ client, customValues, result });

      return result;
    } catch (err) {
      throw mutation.parseError(err);
    }
  };

  return [customMutate];
};
