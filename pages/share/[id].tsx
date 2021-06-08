import * as React from "react";
import Head from "next/head";
import {
  CloudUploadIcon,
  CloudDownloadIcon,
  ClipboardCopyIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { useDropzone } from "react-dropzone";

import toast, { Toaster } from "react-hot-toast";

let Globe = () => null;
if (typeof window !== "undefined") Globe = require("react-globe.gl").default;

const ShareScreen = () => {
  const router = useRouter();
  const { id } = router.query;
  const [imageUrl, setImageUrl] = React.useState(null);
  const globeRef: any = React.useRef(null);
  const inputRef: any = React.useRef(null);
  const linkRef: any = React.useRef(null);
  const arcsData = [1, 2, 3, 4, 5, 6].map(() => ({
    startLat: (Math.random() - 0.5) * 180,
    startLng: (Math.random() - 0.5) * 360,
    endLat: (Math.random() - 0.5) * 180,
    endLng: (Math.random() - 0.5) * 360,
    color: [["#000000"][0], ["#000000"][0]],
  }));

  React.useEffect(() => {
    if (id) {
      setImageUrl(`/api/download?id=${id}`);
    }
  }, [id]);

  const processFile = (files) => {
    const data = URL.createObjectURL(files[0]);
    setImageUrl(data);
  };

  const onDrop = React.useCallback((files) => {
    processFile(files);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="">
      <Head>
        <title>Globe 3D</title>
      </Head>

      <main className="" {...getRootProps()}>
        <div className="relative bg-white overflow-hidden min-h-screen">
          <nav className="bg-white">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div className="border-b border-gray-100">
                <div className="flex items-center justify-between h-16 px-4 sm:px-0">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 text-gray-900">
                      <a href="/">
                        <img
                          className="h-8 w-8"
                          src="/images/logoglobe.png"
                          alt="Globe 3D"
                        />
                      </a>
                    </div>
                    <div className="hidden md:flex flex-1">
                      <div className="ml-10 flex items-baseline space-x-4 justify-end items-end">
                        <a
                          href="https://figma.com/@sonny"
                          className="text-gray-900 hover:bg-blue-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        >
                          All Plugins
                        </a>
                        <a
                          href="https://twitter.com/sonnylazuardi"
                          className="text-gray-900 hover:bg-blue-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        >
                          Twitter
                        </a>
                        <a
                          href="https://github.com/sonnylazuardi/globe-3d"
                          className="text-gray-900 hover:bg-blue-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        >
                          Github
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
          <div className="w-96 mx-auto flex flex-col items-center justify-center">
            <div className="">
              <Globe
                //@ts-ignore
                ref={globeRef}
                width={480}
                height={480}
                backgroundColor={"rgba(0,0,0,0)"}
                globeImageUrl={imageUrl}
                arcColor={"color"}
                arcsData={arcsData}
                arcDashGap={0.6}
                arcDashLength={0.3}
                arcDashAnimateTime={4000 + 500}
                rendererConfig={{ preserveDrawingBuffer: true }}
              />
              <a className="hidden" ref={linkRef} />
            </div>
            <div className="py-10 px-10 rounded-xl bg-white border border-gray-100 shadow-xl bg-opacity-25 flex flex-col mb-12">
              <button
                onClick={() => {
                  inputRef?.current.click();
                }}
                type="button"
                className="inline-flex justify-center items-center px-6 py-3 border text-blue-500 font-semibold rounded-md transition dutation-150 ease-in-out transform hover:scale-105 bg-white mb-2"
              >
                <input
                  ref={inputRef}
                  onChange={(e) => processFile(e.target.files)}
                  type="file"
                  className="hidden"
                />
                <CloudUploadIcon className="h-5 w-5 text-blue-500 mr-2" />
                Upload Image
              </button>
              <button
                onClick={() => {
                  // console.log(globeRef.current);

                  const canvas = globeRef.current.renderer().domElement;
                  const link = linkRef.current;
                  link.setAttribute("download", "globe.png");
                  link.setAttribute(
                    "href",
                    canvas
                      .toDataURL("image/png")
                      .replace("image/png", "image/octet-stream")
                  );
                  link.click();
                }}
                type="button"
                className="inline-flex justify-center items-center px-6 py-3 border text-blue-500 font-semibold rounded-md transition dutation-150 ease-in-out transform hover:scale-105 bg-white mb-2"
              >
                <CloudDownloadIcon className="h-5 w-5 text-blue-500 mr-2" />
                Download Image
              </button>
              <button
                onClick={() => {
                  const dummy = document.createElement("input"),
                    text = window.location.href;

                  document.body.appendChild(dummy);
                  dummy.value = text;
                  dummy.select();
                  document.execCommand("copy");
                  document.body.removeChild(dummy);
                  toast.success("Copied Globe Share URL");
                }}
                type="button"
                className="inline-flex justify-center items-center px-6 py-3 border text-blue-500 font-semibold rounded-md transition dutation-150 ease-in-out transform hover:scale-105 bg-white"
              >
                <ClipboardCopyIcon className="h-5 w-5 text-blue-500 mr-2" />
                Copy Share Url
              </button>
            </div>
          </div>
          <footer className="bg-gradient-to-r from-blue-300 to-blue-500">
            <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
              <nav
                className="-mx-5 -my-2 flex flex-wrap justify-center"
                aria-label="Footer"
              >
                <div className="px-5 py-2">
                  <a
                    href="/"
                    className="text-base text-gray-200 hover:text-gray-100"
                  >
                    Home
                  </a>
                </div>
                <div className="px-5 py-2">
                  <a
                    href="https://twitter.com/sonnylazuardi"
                    className="text-base text-gray-200 hover:text-gray-100"
                  >
                    Twitter
                  </a>
                </div>
                <div className="px-5 py-2">
                  <a
                    href="https://github.com/sonnylazuardi/globe-3d"
                    className="text-base text-gray-200 hover:text-gray-100"
                  >
                    Github
                  </a>
                </div>
              </nav>
              <p className="mt-8 text-center text-base text-white">
                © 2021 Sonny Lazuardi. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
        {isDragActive ? (
          <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center ">
            <p className="text-3xl text-white text-center font-bold">
              Drop the file here ...
            </p>
          </div>
        ) : null}
      </main>

      <footer className=""></footer>
      <Toaster />
    </div>
  );
};

export default ShareScreen;
