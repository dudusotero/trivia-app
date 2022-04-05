import { useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Quiz } from "../components/Quiz";

import { useStore } from "../context";

export const QuizPage = () => {
  const { selectedQuestionIndex, questions, loadingState, dispatch } =
    useStore();

  const fetchQuestions = useCallback(async () => {
    try {
      dispatch({ type: "RESET" });
      dispatch({ type: "FETCH_QUESTIONS" });
      const response = await fetch(
        "https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean"
      );
      const data = await response.json();
      dispatch({
        type: "FETCH_QUESTIONS_SUCCESS",
        payload: data.results,
      });
    } catch (error) {
      console.error(error);
      dispatch({ type: "FETCH_QUESTIONS_ERROR" });
    }
  }, [dispatch]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const renderContent = () => {
    switch (loadingState) {
      case "loading":
        return <div className="loading-block">Loading...</div>;
      case "error":
        return (
          <div className="container">
            <header>
              <h1>Something went wrong! Try again later.</h1>
            </header>
            <footer>
              <Link to="/">Back to home</Link>
            </footer>
          </div>
        );
      case "loaded":
        return (
          <Quiz
            numberOfQuestions={questions.length}
            question={questions[selectedQuestionIndex]}
            questionNumber={selectedQuestionIndex + 1}
          />
        );
      default:
        return null;
    }
  };

  return renderContent();
};
