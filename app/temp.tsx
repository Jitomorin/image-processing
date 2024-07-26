"use client";

import { useState } from "react";
import axios from "axios";
import { Button, Input, Progress, Snippet } from "@nextui-org/react";

export default function Home() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [videoUrl, setVideoUrl]: any = useState(null);

  const handleSubmit = async (event: any) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (response.ok) {
        setVideoUrl(`http://localhost:5000${data.video_url}`);
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="flex flex-col w-screen h-screen justify-center align-middle items-center">
      <h1 className="mb-10 text-4xl font-semibold">Upload Image</h1>
      <form onSubmit={handleSubmit}>
        <div className=" flex-col mx-auto w-[340px] h-[240px] px-8 rounded-2xl flex justify-center items-center bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg">
          <input
            className="mx-auto mb-10"
            type="file"
            accept="image/*"
            // onChange={handleFileChange}
          />
          <Button
            className="text-white mb-10 font-bold text-xl"
            variant="light"
            type="submit"
          >
            Generate
          </Button>
          <Progress
            size="sm"
            radius="sm"
            className="mt=5"
            classNames={{
              base: "max-w-md",
              track: "drop-shadow-md border border-default",
              indicator: "bg-gradient-to-r from-pink-500 to-yellow-500",
              label: "tracking-wider font-medium text-default-600",
              value: "text-foreground/60",
            }}
            label="Lose weight"
            value={65}
            showValueLabel={true}
          />
          {videoUrl && (
            <div>
              <h2>Generated Video</h2>
              <video controls width="640" height="480">
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </div>
      </form>
      {message && <p>{message}</p>}

      {/* <Snippet className="mt-10" size="lg">
        https://github.com/Jitomorin
      </Snippet> */}
    </div>
  );
}
