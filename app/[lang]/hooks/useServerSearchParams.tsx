import { Dictionary, identity, pickBy } from "lodash";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo } from "react";
import { MapOptionKeys } from "../types/maps.types";
import { regionKeys } from "../types/region.types";

type FilterOptions = {
  search?: string | undefined | null;
  map?: string | undefined | null;
  region?: string | undefined | null;
  isEmptyServer?: boolean | undefined | null;
};

export const useServerSearchParams = (
  mapOptionKeys: readonly MapOptionKeys[]
) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  let currentSearch = useMemo(() => searchParams.get("search"), [searchParams]);
  let currentMap = useMemo(() => searchParams.get("map"), [searchParams]);
  let region = useMemo(() => searchParams.get("region"), [searchParams]);
  let currentIsEmptyServer = useMemo(
    () => searchParams.get("isEmptyServer"),
    [searchParams]
  );

  const filterOptions: FilterOptions = useMemo(() => {
    let options: FilterOptions = {};

    if (!currentSearch && !currentMap && !currentIsEmptyServer && !region)
      return {};

    if (currentSearch) {
      options.search = currentSearch;
    }

    if (currentMap && mapOptionKeys.some((x) => x === currentMap)) {
      options.map = currentMap;
    }

    if (currentIsEmptyServer) {
      options.isEmptyServer = currentIsEmptyServer === "true" ? true : false;
    }

    if (region) {
      options.region = region;
    }

    return options;
  }, [currentIsEmptyServer, currentMap, currentSearch, mapOptionKeys, region]);

  const setFilterOptions = useCallback(
    (key: keyof FilterOptions, value: string | null | undefined) => {
      let newFilterOptions: FilterOptions = filterOptions;

      switch (key) {
        case "map": {
          newFilterOptions.map = value;
          break;
        }
        case "search": {
          newFilterOptions.search = value;
          break;
        }
        case "region": {
          newFilterOptions.region = value;
          break;
        }
        case "isEmptyServer": {
          newFilterOptions.isEmptyServer = value === "true" ? true : false;
          break;
        }
      }

      const cleanedFilterOptions = pickBy(
        newFilterOptions,
        identity
      ) as Dictionary<string>;

      router.replace(`servers?${new URLSearchParams(cleanedFilterOptions)}`);
    },
    [filterOptions, router]
  );

  return { filterOptions, setFilterOptions };
};
