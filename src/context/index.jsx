import { useContext, createContext, useReducer } from "react";

const Context = createContext();

const initialState = {
  questions: null,
  selectedQuestionIndex: 0,
  answers: null,
  loadingState: "idle",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_QUESTIONS":
      return {
        ...state,
        loadingState: "loading",
      };
    case "FETCH_QUESTIONS_SUCCESS":
      return {
        ...state,
        questions: action.payload,
        loadingState: "loaded",
      };
    case "FETCH_QUESTIONS_ERROR":
      return {
        ...state,
        loadingState: "error",
      };
    case "ANSWER_QUESTION":
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.payload.questionIndex]: action.payload.answer,
        },
      };
    case "NEXT_QUESTION":
      return {
        ...state,
        selectedQuestionIndex: state.selectedQuestionIndex + 1,
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

export const useStore = () => useContext(Context);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ dispatch, ...state }}>
      {children}
    </Context.Provider>
  );
};
