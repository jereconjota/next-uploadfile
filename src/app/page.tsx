"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";

function HomePage() {
  const [file, setFile] = useState<File | undefined>();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    try {
      const data = new FormData();
      data.set("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      console.log(res);

      if (res.ok) {
        console.log("File uploaded successfully");
        setFile(undefined);
        const input = document.querySelector("input[type=file]") as HTMLInputElement;
        input.value = "";
        toast.success("File uploaded successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setFile(e.target.files?.[0]);
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="bg-blue-800 p-5 rounded-md">
        <h1 className="text-4xl text-center my-4">Upload a file</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            className="bg-violet-950 text-zinc-100 p-2 rounded block mb-2"
            onChange={handleFileChange}
          />

          <button
            className="bg-teal-500 text-zinc-100 p-2 rounded block w-full disabled:opacity-50"
            disabled={!file}
          >
            Upload
          </button>
        </form>
        {file && (
          <Image
            src={URL.createObjectURL(file)}
            alt="Uploaded file"
            className="w-64 h-64 object-contain mx-auto mt-3 rounded-sm"
            width={256}
            height={256}
          />
        )}
      </div>
    </div>
  );
}

export default HomePage;
