const formatQuiz = (quizData) => {
    const tmp = [];
    for (let i = 1; i <= quizData.length; i++) {
        tmp.push({
            id: i,
            question: quizData[i - 1].QuestionText,
            answers: quizData[i - 1].AnswerList.map((answer) => {
                return { answer: answer.AnswerText, weight: answer.IsCorrect };
            }),
        });
    }

    return tmp;
}

export { formatQuiz }