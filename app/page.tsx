"use client";

import { useState } from "react";
import LoadingComponent from "./components/LoadingComponent";
import { Button } from "@nextui-org/react";
import "@/styles/globals.css";

export default function Home() {
  // const [videoUrl, setVideoUrl]: any = useState(null);
  const [loading, setLoading] = useState(false);
  const [urls, setUrls]: any[] = useState([]);
  const [error, setError] = useState(null);

  const removeElementByIndex = (index: any) => {
    setUrls((prevItems: any) => {
      const newItems = [...prevItems];
      if (index >= 0 && index < newItems.length) {
        newItems.splice(index, 1);
      }
      console.log(newItems);
      return newItems;
    });
  };

  const handleUpload = async (event: any) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      console.log("data:", data);
      // setVideoUrl(`http://localhost:5000${data.video_url}`);
      let list: string[] = urls;
      list.push(`http://localhost:5000${data.video_url}`);
      setUrls(list);

      console.log(`http://localhost:5000${data.video_url}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="custom-background p-10 flex flex-col min-w-screen min-h-screen items-center">
      <h1 className="text-4xl font-bold mb-10 text-black">
        Convert Image to Video
      </h1>
      <div className="flex flex-col  p-4 isolate aspect-video w-full rounded-xl bg-white/50 shadow-lg ring-1 ring-black/5">
        {!loading && (
          <div className="relative">
            <input
              id="file-input"
              className="absolute opacity-0 w-0 h-0"
              type="file"
              accept="image/*"
              onChange={handleUpload}
            />
            <Button
              variant="light"
              type="button"
              className="px-4 text-blue-600 font-semibold hover:scale-[1.03]"
              onClick={() => document.getElementById("file-input").click()}
            >
              + Upload Image
            </Button>
          </div>
        )}
        {loading && <LoadingComponent />}
        {error && <p>Error: {error}</p>}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {urls.length > 0 && (
            <>
              {urls.map((url: string, index: number) => (
                <div className="flex flex-col justify-start" key={index}>
                  {/* <Button
                    variant="light"
                    type="button"
                    className="p-0 m-0 text-red-600 font-semibold hover:scale-[1.03] mr-auto"
                    onClick={() => {
                      removeElementByIndex(index);
                    }}
                  >
                    Remove
                  </Button> */}
                  <video
                    onContextMenu={(e) => e.preventDefault()}
                    controls
                    width="640"
                    height="480"
                  >
                    <source src={url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
