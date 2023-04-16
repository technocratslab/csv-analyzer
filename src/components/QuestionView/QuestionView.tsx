import { FC, useState } from "react";

type QuestionViewProps = {
  onSubmitForm: (question: string) => void;
};

export const QuestionView: FC<QuestionViewProps> = ({ onSubmitForm }) => {
  const [question, setQuestion] = useState("This is my default question");

  const onQuestionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(event.target.value);
  };

  const handleSubmitForm = () => {
    onSubmitForm(question);
  };

  return (
    <form className="grid gap-2">
      <div>
        <label
          htmlFor="first_name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          What would you like to ask from CSV Data?
        </label>

        <input
          type="text"
          id="question"
          value={question}
          onChange={onQuestionChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Please type your question here."
          required
        />
      </div>

      <button
        onClick={handleSubmitForm}
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Ask Question
      </button>
    </form>
  );
};
