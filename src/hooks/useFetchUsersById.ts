import { useEffect, useState } from "react";
import { Users } from "@/entities/users";
import mockUsers from "@/mockData/mockUsers.json";

const useFetchUsersById = (id?: string) => {
  const [data, setData] = useState<Users>();
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
        const result = mockUsers.find(val => val.id === id);
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

export default useFetchUsersById;