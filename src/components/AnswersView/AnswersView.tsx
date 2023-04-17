import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";

export type AnswerResults = {
  question: string;
  answer: React.ReactNode;
};

export type AnswerViewProps = {
  results: AnswerResults[];
};

export const AnswersView: FC<AnswerViewProps> = ({ results }) => {
  return (
    <div>
      {results && <h1 className="text-xl font-bold my-4">List of Answers</h1>}

      {results.map((result, index) => (
        <div
          className="border-2 border-blue-700 rounded-lg p-2 mb-4"
          key={String(index)}
        >
          <p className="mb-2 text-md">{result.question}</p>
          <p>
            <strong className="text-md font-black">Answer: </strong> <br />
            {result.answer}
          </p>
        </div>
      ))}
    </div>
  );
};
