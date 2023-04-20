import { FcManager } from "react-icons/fc";
import { FC } from "react";
import Image from 'next/image'
export type AnswerResults = {
  question: string;
  answer: React.ReactNode;
};

export type AnswerViewProps = {
  results: AnswerResults[];
};

export const AnswersView: FC<AnswerViewProps> = ({ results }) => {
  if (results.length === 0) {
    return <></>
  }
  return (
    <div className="p-2 border-2 border-blue-700 rounded-lg">
      <h1 className="text-xl font-bold my-4">List of Answers</h1>
      {results.map((result, index) => (
        <div
          className="mb-4"
          key={String(index)}
        >
          <p className="mb-2 text-md"><FcManager className="inline mr-2 text-xl"></FcManager>{result.question}</p>
          <p>
            <strong className="text-md font-black">Answer: </strong><br />
            <p className="">
              <Image 
                className="inline mr-2 h-6 w-auto"
                src="/chat-bot.png"
                alt="chat-bot"
                width={300}
                height={300}
              />
              <span className="text-base">{result.answer}</span></p>
          </p>
        </div>
      ))}
    </div>
  );
};
