import { useEffect, useState } from "react";
import { Businesses } from "@/entities/businesses";
import businessesData from "../../mockData/businesses.json";

export const useFetchBusinessesById = (id?: number) => {
  const [data, setData] = useState<Businesses>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<null | Error>(null);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const business = businessesData.find(val => val.id === id);
        setData(business);
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
