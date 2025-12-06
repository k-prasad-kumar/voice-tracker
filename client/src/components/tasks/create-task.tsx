// /* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { ChevronDownIcon, MicIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React, { useEffect, useState } from "react";
import { Separator } from "../ui/separator";
import { useCreateTask, useParseTask } from "@/hooks/taks-hooks";
import FormError from "../form-error";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { parseDueDate } from "@/lib/parse-date";

const CreateTask = () => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState<string | undefined>("");

  const { mutate: parseTask, data } = useParseTask();
  const createTask = useCreateTask();

  // Speech recognition hooks and functions
  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
  const stopListening = () => {
    SpeechRecognition.stopListening();
    parseTask(transcript);
  };

  const { transcript, listening, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  useEffect(() => {
    if (data) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTitle(data.title);
      setDescription(data.description ? data.description : transcript);
      setPriority(data.priority ? data.priority : "Low");
      setStatus(data.status ? data.status : "To Do");

      if (data.dueDate) {
        const parsed = parseDueDate(data.dueDate);
        if (parsed) setDate(parsed);
        else console.log("Invalid AI date:", data.dueDate);
      }
    }
  }, [data]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Your browser does not support speech recognition.</span>;
  }

  // create task hook
  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !priority || !status || !date) {
      setError("Please fill in all mandatory fields.");
      return;
    }
    createTask.mutate({
      title,
      description,
      priority,
      status,
      dueDate: date,
      transcript: transcript,
    });
  };

  return (
    <section className="w-full max-w-4xl mx-auto my-5">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Create New Task</CardTitle>
          <CardDescription className="text-lg">
            Start by filling in the details below to create a new task.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full bg-[#f4f7fa] mb-4">
            <p className="p-4 text-sm text-slate-600">{transcript}</p>
          </div>

          <form className="w-full" onSubmit={handleCreate}>
            <div className="grid w-full items-center gap-3">
              <Label htmlFor="picture">Title</Label>
              <Input
                id="title"
                type="text"
                placeholder="Enter title"
                className="w-full"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </div>
            <div>
              <Label htmlFor="description" className="mt-4 mb-2">
                Description
              </Label>
              <Textarea
                placeholder="Type your message here."
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </div>
            <div className="w-full grid grid-col-2 sm:grid-cols-3 gap-4">
              <div className="w-full">
                <Label htmlFor="priority" className="mb-2 mt-4">
                  Priority
                </Label>
                <Select onValueChange={(e) => setPriority(e)} value={priority}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full">
                <Label htmlFor="priority" className="mb-2 mt-4">
                  Status
                </Label>
                <Select onValueChange={(e) => setStatus(e)} value={status}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="To Do">To Do</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Done">Done</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full">
                <Label htmlFor="date" className="mb-2 mt-4">
                  Due Date
                </Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild className="w-full border">
                    <Button
                      variant="outline"
                      id="date"
                      className="w-full justify-between font-normal text-slate-500"
                    >
                      {date ? date.toLocaleDateString() : "Select due date"}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={date}
                      captionLayout="dropdown"
                      onSelect={(date) => {
                        setDate(date);
                        setOpen(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="mt-4">
              <FormError message={error} />
            </div>

            <Separator className="mt-6" />
            {/* Mic Button - Controlled by the listening state and new functions */}
            <div className="flex justify-center flex-col items-center">
              <div
                className={`w-18 h-18 ${
                  listening ? "bg-red-600 animate-pulse" : "bg-blue-600"
                } rounded-full flex items-center justify-center cursor-pointer hover:shadow-lg transition mt-6 p-4`}
                onClick={listening ? stopListening : startListening}
              >
                <MicIcon color="white" size={30} />
              </div>
              <p className="text-blue-400 mt-1">
                {listening ? "Listening... Speak now!" : "Tap mic to speak"}
              </p>
            </div>

            <Separator className="mt-4" />
            <div>
              <Button className="mt-6 w-full cursor-pointer" type="submit">
                Create Task
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};
export default CreateTask;
