import { useEffect, useState } from "react";
import { Businesses } from "@/entities/businesses";
import mockBusinesses from "@/mockData/mockBusinesses.json";

const useFetchAllBusinesses = () => {
  const [data, setData] = useState<Businesses[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<null | Error>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setData(mockBusinesses);
      } catch (err) {
        setIsError(true);
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, isLoading, isError, error };
};

export default useFetchAllBusinesses;