export interface DataStatusDef {
    items: DataFetch[];
    status: Status;
}

export enum Status {
    LOADING = 'loading',
    RESOLVE = 'resolve',
    REJECT = 'reject',
}

export interface DataFetch {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
}

export interface QuizType {
    title: string;
    correct: boolean;
    isClicked: boolean;
}

export interface AnswerType {
    answer: QuizType[];
}