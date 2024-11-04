import { memo, useCallback, useState } from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { Modal } from "../ui/Modal";
import { ITask } from "../types/types";

interface TaskFormProps {
    data?: ITask;
    onClose: () => void;
    formTitle: string;
    callback: (data: ITask) => void;
    successBtnText: string;
}

export const TaskForm = memo((props: TaskFormProps) => {
    const { data, onClose, formTitle, callback, successBtnText } = props;

    const [title, setTitle] = useState(data?.title || "");
    const [description, setDescription] = useState(data?.description || "");
    const [status, setStatus] = useState(data?.status || false);
    const [file, setFile] = useState<File | null>(data?.file || null);
    const [fileName, setFileName] = useState(data?.file?.name || "");

    const onTitleHandler = useCallback((value: string) => {
        setTitle(value);
    }, []);

    const onDescriptionHandler = useCallback((value: string) => {
        setDescription(value);
    }, []);

    const onStatusHandler = useCallback(() => {
        setStatus(!status);
    }, [status]);

    const onFileHandler = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files) {
                const file = e.target.files[0];
                setFileName(file.name);
                setFile(file);
            }
        },
        []
    );

    const onSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
    }, []);

    const onFormSubmit = useCallback(() => {
        if (!title) {
            return alert("task title is required");
        }
        
        const formData = { id: data?.id, title, description, status, file };
        callback(formData);

        setTitle("");
        setDescription("");
        onClose();
    }, [callback, title, description, status, data?.id, onClose, file]);

    return (
        <Modal>
            <form className="flex flex-col gap-4" onSubmit={onSubmit}>
                <h1 className="text-violet-700 font-extrabold text-2xl">
                    {formTitle}
                </h1>
                <Input
                    onChange={onTitleHandler}
                    value={title}
                    placeholder="Enter Title"
                />
                <Input
                    onChange={onDescriptionHandler}
                    value={description}
                    placeholder="Enter Description"
                />
                <div className="flex items-center justify-between">
                    <input type="file" onChange={onFileHandler} />
                    <label
                        className="text-ellipsis text-red-600"
                        htmlFor="file"
                    >
                        {fileName}
                    </label>
                </div>
                {data && (
                    <Button
                        onClick={onStatusHandler}
                        bgColor={status ? "bg-green-600" : "bg-red-600"}
                    >
                        {status ? "Completed" : "Mark as Completed"}
                    </Button>
                )}
                <div className="w-full flex items-center justify-between">
                    <Button onClick={onClose} bgColor="bg-red-700">
                        Close
                    </Button>
                    <Button onClick={onFormSubmit}>{successBtnText}</Button>
                </div>
            </form>
        </Modal>
    );
});
