import * as React from "react";
import Head from "next/head";
import TweetEmbed from "react-tweet-embed";
import {
  CloudUploadIcon,
  CloudDownloadIcon,
  CodeIcon,
} from "@heroicons/react/outline";

let Globe = () => null;
if (typeof window !== "undefined") Globe = require("react-globe.gl").default;

const Home = () => {
  const [imageUrl, setImageUrl] = React.useState("/images/texture.png");
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

  return (
    <div className="">
      <Head>
        <title>Globe 3D</title>
      </Head>

      <main className="">
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
          <main className="mt-16 pb-16">
            <div className="mx-auto max-w-7xl">
              <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                <div className="px-4 sm:px-6 sm:text-center md:max-w-2xl md:mx-auto lg:col-span-7 lg:text-left lg:flex lg:items-center">
                  <div>
                    <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-black sm:mt-5 sm:leading-none lg:mt-6 lg:text-5xl xl:text-6xl">
                      <span className="md:block">Convert your design to</span>{" "}
                      <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-500 md:block">
                        3D Globe
                      </span>
                    </h1>
                    <p className="mt-3 text-base text-gray-900 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                      Create an Interactive 3D globe based on your flat world
                      map design. Try the figma plugin or upload an image to see
                      it live in action.
                    </p>
                    <p className="mt-8 text-sm text-white uppercase tracking-wide font-semibold sm:mt-10 lg:justify-start md:justify-center flex flex-wrap">
                      <a
                        href="https://www.figma.com/community/plugin/977567760148608604/Globe-3D"
                        className="mr-5 inline-flex items-center px-6 py-3 border bg-gradient-to-r from-blue-300 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white font-semibold rounded-md transition dutation-150 ease-in-out transform hover:scale-105"
                      >
                        <CloudDownloadIcon className="h-5 w-5 text-white mr-2" />
                        Figma Plugin
                      </a>
                      <a
                        href="https://github.com/sonnylazuardi/globe-3d"
                        className="mr-5 inline-flex items-center px-6 py-3 border text-blue-500 font-semibold rounded-md transition dutation-150 ease-in-out transform hover:scale-105"
                      >
                        <CodeIcon className="h-5 w-5 text-blue-500 mr-2" />
                        Github
                      </a>
                    </p>
                    <div className="py-6">
                      <p className="text-xs cursor-pointer hover:underline leading-5 text-gray-500">
                        This project is free and open source and built for fun.
                      </p>
                      <p className="text-xs leading-5 text-gray-500">
                        Support the creator by giving star on github and a
                        follow on twitter.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-16 sm:mt-24 lg:mt-0 lg:col-span-5 mx-auto px-5 relative">
                  <div className="absolute left-0 bottom-0 flex z-50">
                    <div className="py-10 px-10 rounded-xl bg-white border border-gray-100 shadow-xl bg-opacity-25 flex flex-col">
                      <button
                        onClick={() => {
                          inputRef?.current.click();
                        }}
                        type="button"
                        className="inline-flex justify-center items-center px-6 py-3 border text-blue-500 font-semibold rounded-md transition dutation-150 ease-in-out transform hover:scale-105 bg-white mb-2"
                      >
                        <input
                          ref={inputRef}
                          onChange={(e) => {
                            const data = URL.createObjectURL(e.target.files[0]);
                            setImageUrl(data);
                          }}
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
                        className="inline-flex justify-center items-center px-6 py-3 border text-blue-500 font-semibold rounded-md transition dutation-150 ease-in-out transform hover:scale-105 bg-white"
                      >
                        <CloudDownloadIcon className="h-5 w-5 text-blue-500 mr-2" />
                        Download Image
                      </button>
                    </div>
                  </div>
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
              </div>
            </div>
            <div className="mt-24">
              <h2 className="text-gray-700 text-center text-3xl font-bold">
                Quick Figma Plugin Demo
              </h2>
              <div className="pt-10">
                <div
                  style={{ width: 580, maxWidth: "100%" }}
                  className="mx-auto p-4"
                >
                  <TweetEmbed
                    id="1395404831116849160"
                    options={{
                      theme: "light",
                      conversation: "none",
                      width: 580,
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="mt-24">
              <h2 className="text-gray-700 text-center text-3xl font-bold">
                How is it possible?
              </h2>
              <div className="p-4 text-center">
                This project is powered by React Globe GL
              </div>
              <div className="">
                <div
                  style={{ width: 580, maxWidth: "100%" }}
                  className="mx-auto p-4"
                >
                  <TweetEmbed
                    id="1396007498134417410"
                    options={{
                      theme: "light",
                      conversation: "none",
                      width: 580,
                    }}
                  />
                </div>
              </div>
            </div>
          </main>
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
      </main>

      <footer className=""></footer>
    </div>
  );
};

export default Home;
