import React, { useEffect, useState } from "react";

type Props = {
  id: string;
};
const ResultsPage: React.FC<Props> = ({ id }) => {
  const [insights, setInsights] = useState([]);

  // function to fetch insights from API
  const fetchInsights = async () => {
    try {
      const res = await fetch("/api/summaries/" + id);
      const data = await res.json();
      setInsights(data);
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect hook to fetch insights when component mounts
  useEffect(() => {
    fetchInsights();
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold mb-4">Results</h1>
      {/* display insights using Material or Ant Design components */}
    </div>
  );
};

export default ResultsPage;