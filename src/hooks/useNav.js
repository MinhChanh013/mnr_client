import useSWR from "swr";
import { fetcher } from "../services/BaseService";

const useNav = () => {
  const { data, error, isLoading } = useSWR("/nav", fetcher);

  return {
    data,
    isLoading,
    error,
  };
};

export default useNav;
