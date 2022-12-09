import { ChildClicked, DataStatus, Status } from "../../types";

export const dataState: DataStatus = {
    items: [],
    status: Status.LOADING,
};

export const clickedState: ChildClicked = {
    childClicked: null,
};