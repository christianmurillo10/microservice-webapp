import { useEffect, useState } from "react";
import { Roles } from "@/entities/roles";
import mockRoles from "@/mockData/mockRoles.json";

const useFetchAllRoles = () => {
  const [data, setData] = useState<Roles[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<null | Error>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setData(mockRoles);
      } catch (err) {
        setIsError(true);
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, dataCount: data.length, isLoading, isError, error };
};

export default useFetchAllRoles;