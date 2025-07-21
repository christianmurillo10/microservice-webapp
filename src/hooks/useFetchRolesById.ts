import { useEffect, useState } from "react";
import { Roles } from "@/entities/roles";
import mockRoles from "@/mockData/mockRoles.json";

const useFetchRolesById = (id?: number) => {
  const [data, setData] = useState<Roles>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<null | Error>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = mockRoles.find(val => val.id === id);
        setData(result);
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

export default useFetchRolesById;