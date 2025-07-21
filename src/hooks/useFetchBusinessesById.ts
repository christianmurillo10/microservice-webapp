import { useEffect, useState } from "react";
import { Businesses } from "@/entities/businesses";
import mockBusinesses from "@/mockData/mockBusinesses.json";

const useFetchBusinessesById = (id?: number) => {
  const [data, setData] = useState<Businesses>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<null | Error>(null);

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = mockBusinesses.find(val => val.id === id);
        setData(result);
      } catch (err) {
        setIsError(true);
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { data, isLoading, isError, error };
};

export default useFetchBusinessesById;