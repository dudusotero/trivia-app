import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useStore } from "../context";

export const Quiz = ({ question, questionNumber, numberOfQuestions }) => {
  const { dispatch } = useStore();
  const navigate = useNavigate();

  function handleAnswerClick(answer) {
    dispatch({
      type: "ANSWER_QUESTION",
      payload: {
        questionIndex: questionNumber - 1,
        answer,
      },
    });
    if (questionNumber === numberOfQuestions) {
      navigate("/result");
    } else {
      dispatch({ type: "NEXT_QUESTION" });
    }
  }

  useEffect(() => {
    document.title = `Question #${questionNumber} | Trivia Challenge`;
  }, [question]);

  return (
    <div className="container">
      <header>
        <h1>{question.category}</h1>
      </header>
      <main>
        <h2 dangerouslySetInnerHTML={{ __html: question.question }}></h2>
        <small>{`${questionNumber} of ${numberOfQuestions}`}</small>
      </main>
      <footer>
        <button onClick={() => handleAnswerClick("False")}>False</button>
        <button onClick={() => handleAnswerClick("True")}>True</button>
      </footer>
    </div>
  );
};
