import { useEffect, useRef, useState } from 'react';
import { DocumentNode } from 'graphql';
import { useLazyQuery, LazyQueryHookOptions } from '@apollo/react-hooks';
import Query from '@ui/api/Query';

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

    console.log(settings);
  }, [setting]);

  if (settings[settingName]) {
    return [settings[settingName], setSetting];
  }

  return [setting, setSetting];
};

interface GraphQLQueryOptions extends LazyQueryHookOptions<any, any> {
  loadOnMount?: boolean;
  isPaginated?: boolean;
}

export const useGraphQLQuery = (query: DocumentNode, options?: GraphQLQueryOptions) => {
  const [fetchData, { data, fetchMore }] = useLazyQuery(query, options);

  const anyQuery: any = query;

  const queryName = anyQuery.definitions[0].name.value;

  const formattedData = data ? Object.assign({}, data[queryName]) : undefined;

  useEffect(() => {
    if (options?.loadOnMount) {
      fetchData();
    }
  }, []);

  const fetchMoreData = (vars?: any) => {
    const variables = vars || options?.variables;

    if (options?.isPaginated && variables && formattedData) {
      variables.pagination = { ...variables.pagination, cursor: formattedData.pageInfo.cursor };

      if (variables.pagination.cursor) {
        return fetchMore({
          query,
          variables,
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const prevData = previousResult[queryName].data;
            const newData = fetchMoreResult[queryName].data;

            return {
              [queryName]: {
                ...fetchMoreResult[queryName],
                data: [...prevData, ...newData],
              },
            };
          },
        });
      }
    }

    return () => undefined;
  };

  const result: [() => void, any, { fetchMore: () => any }] = [
    fetchData,
    formattedData,
    { fetchMore: fetchMoreData },
  ];

  return result;
};

/* export const useQuery = <T>(query: Query<T>, options?: GraphQLQueryOptions) => {
  const [fetchData, { data, fetchMore }] = useLazyQuery(query.query);

  if (query.onFetchMore) {
    return fetchMore({
      query,
      variables
    })
  }
}; */
