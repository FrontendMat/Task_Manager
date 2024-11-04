import { API_URL } from "../assets/consts";
import { ITask } from "../types/types";

export const addTask = async (data: ITask) => {
    const formData = new FormData();
    formData.append("title", data.title!);
    formData.append("description", data.description!);
    formData.append("file", data.file!);

    console.log(formData);

    const newTask = await fetch(`${API_URL}/task`, {
        // headers: {
        //     'Content-Type': 'application/json',
        // },
        method: "POST",
        body: formData,
    }).catch((e) => console.log(e));

    return newTask;
};
