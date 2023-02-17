import React from 'react';
import axios from 'axios';
import useAsync from '../useAsync';

async function getQuestions() {
  const response = await axios.get(
    process.env.REACT_APP_SERVER_URL+"/api/question/list"
    );
  return response.data;
}

function Home() {
  const [state, refetch] = useAsync(getQuestions, []);
  const { loading, data: questions, error } = state; // state.data 를 questions 키워드로 조회

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!questions) return null;
  return (
    <>
      <ul>
        {questions.map(question => (
          <li key={question.id}>
            {question.subject}
          </li>
        ))}
      </ul>
      <button onClick={refetch}>다시 불러오기</button>
    </>
  );
}

export default Home;