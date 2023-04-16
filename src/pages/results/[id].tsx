import { QuestionView } from "@/components/QuestionView/QuestionView";
import { useRouter } from "next/router";
import React from "react";

type Props = {
  id: string;
};

const ResultsPage: React.FC<Props> = () => {
  const {
    query: { id },
  } = useRouter();
  const handleQueryAnswer = async (question: string) => {
    const results = await fetch(`/api/question/${id}`, {
      method: "POST",
      body: JSON.stringify({ question }),
    });
    console.log(results);
  };

  return (
    <div className="h-screen p-10">
      <QuestionView onSubmitForm={handleQueryAnswer} />
      <h1 className="text-4xl font-bold mb-4">Results</h1>
      {/* display insights using Material or Ant Design components */}
    </div>
  );
};

export default ResultsPage;
