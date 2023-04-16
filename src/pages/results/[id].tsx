import { AnswerResults, AnswersView } from "@/components/AnswersView";
import { QuestionView } from "@/components/QuestionView";
import { useRouter } from "next/router";
import React, { useState } from "react";

type Props = {
  id: string;
};

const ResultsPage: React.FC<Props> = () => {
  const { query } = useRouter();
  const { id } = query;
  const [results, setResults] = useState<AnswerResults[]>([]);
  const [loading, setLoading] = useState(false);

  const handleQueryAnswer = async (question: string) => {
    setLoading(true);
    const response = await fetch(`/api/question/${id}`, {
      method: "POST",
      body: JSON.stringify({ question }),
    });
    setLoading(false);
    const data = await response.json();
    setResults([...results, { question, answer: data.queryResponse.text }]);
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-r from-indigo-200 to-purple-300">
      <div className="max-w-5xl m-auto">
        <h1 className="text-3xl font-bold my-4">Your Questions</h1>
        <QuestionView loading={loading} onSubmitForm={handleQueryAnswer} />
        <AnswersView results={results} />
      </div>
    </div>
  );
};

export default ResultsPage;
