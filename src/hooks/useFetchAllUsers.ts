import { useEffect, useState } from "react";
import { Users } from "@/entities/users";
import mockUsers from "@/mockData/mockUsers.json";

const useFetchAllUsers = () => {
  const [data, setData] = useState<Users[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<null | Error>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setData(mockUsers);
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

export default useFetchAllUsers;