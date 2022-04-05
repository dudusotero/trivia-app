import { useEffect } from "react";
import { Link } from "react-router-dom";

export const WelcomePage = () => {
  useEffect(() => {
    document.title = "Trivia Challenge";
  }, []);

  return (
    <div className="container">
      <header>
        <h1>Welcome to the Trivia Challenge!</h1>
      </header>

      <main>
        <h2>You will be presented with 10 True or False questions.</h2>
        <h3>Can you score 100%?</h3>
      </main>

      <footer>
        <Link to="/quiz">Begin</Link>
      </footer>
    </div>
  );
};
