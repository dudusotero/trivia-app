import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useStore } from "../context";

export const ResultPage = () => {
  const { questions, answers } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!answers) {
      navigate("/", { replace: true });
    }
  }, [answers]);

  useEffect(() => {
    document.title = "Result | Trivia Challenge";
  }, []);

  return (
    <div className="container">
      <header>
        <h1>
          <span>You scored</span>
          <br />
          <span>{`${
            questions?.filter((q, i) => q.correct_answer === answers[i])?.length
          } / ${questions?.length}`}</span>
        </h1>
      </header>

      <main>
        {questions?.map((question, index) => (
          <div key={index} className="answer-item">
            <p dangerouslySetInnerHTML={{ __html: question.question }} />
            <strong>
              <small>
                {question.correct_answer === answers[index]
                  ? "Correct"
                  : "Incorrect"}
              </small>
            </strong>
          </div>
        ))}
      </main>

      <footer>
        <Link to="/quiz">Play Again?</Link>
        <br />
        <Link to="/">Back to home</Link>
      </footer>
    </div>
  );
};
