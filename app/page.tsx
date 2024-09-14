"use client";

import { useState } from "react";
import type { MouseEventHandler } from "react";
import { LazyImage } from "../components/RamdonFox";
import { random } from "lodash";
import Head from "next/head";

const myRandom = (): number => random(1, 123)

const generateId = (): string => Math.random().toString(36).substring(2, 9);
export default function Home() {
  const [images, setImages] = useState<Array<IFoxImageItem>>([])

  const addNewFox: MouseEventHandler<HTMLButtonElement> = (event) => {
    const newImageItem: IFoxImageItem = {id: generateId(), url: `https://randomfox.ca/images/${myRandom()}.jpg`}
    setImages([...images, newImageItem])
  }

 window.plausible("add_fox")
  return (
    <div >
      <Head >
        <title >Ramdon Fox</title>
        <script
          defer
          data-domain="yourdomain.com"
          src="https://plausible.io/js/script.js"
        ></script>
      </Head>
      <main >
        <h1>Hello</h1>
        <button onClick={addNewFox}>Add new fox</button>
        {images.map(({ id, url }, index) => (
          <div key={id} className="p-4">
            <LazyImage
              src={url}
              title="random fox"
              alt="random fox"
              width={320}
              height="auto"
              className="rounded bg-gray-300"
              onLazyLoad={(img) => {
                console.log("onLazyLoad", index, img);
              }}
              />
          </div>
        ))}
      </main>
      <footer >
      </footer>
    </div>
  );
}
