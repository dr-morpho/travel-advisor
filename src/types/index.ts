import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../redux/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export interface DataStatus {
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

export interface MapProp {
    setCoordinates: React.Dispatch<
        React.SetStateAction<{
            lat: number;
            lng: number;
        }>
    >;
    setBounds: React.Dispatch<
        React.SetStateAction<{
            ne: {
                lat: number;
                lng: number;
            };
            sw: {
                lat: number;
                lng: number;
            };
        }>
    >;
    coordinates: { lat: number; lng: number };
}

export interface PlaceDetailsProp {
    place: {
        name: string;
    };
}


