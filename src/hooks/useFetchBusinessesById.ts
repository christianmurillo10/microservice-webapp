import { useEffect, useState } from "react";
import { Businesses } from "@/entities/businesses";
import mockBusinesses from "@/mockData/mockBusinesses.json";

const useFetchBusinessesById = (id?: number) => {
  const [data, setData] = useState<Businesses>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<null | Error>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const business = mockBusinesses.find(val => val.id === id);
        setData(business);
      } catch (err) {
        setIsError(true);
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  return { data, isLoading, isError, error };
};

export default useFetchBusinessesById;