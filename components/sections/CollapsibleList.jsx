"use client";

import React, { useState } from "react";
import { CollapsibleLight } from "./Collapsible";
import Copy from "@/app/content";

const CollapsibleListLight = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleOpen = (index) => {
    setOpenIndex(prev => (prev === index ? -1 : index));
  };

  return (
    <div className="w-full max-w-md mx-auto lg:max-w-xl lg:ml-0 flex flex-col gap-5">
      {Copy.faq.collapsibles.map((c) => (
        <CollapsibleLight
          key={c.index}
          isOpen={openIndex === c.index}
          toggleOpen={() => toggleOpen(c.index)}
        >
          <span>{c.title}</span>
          <p>
            <span className="font-regular">{c.emphasized_text}</span>{" "}
            {c.text}
          </p>
        </CollapsibleLight>
      ))}
    </div>
  );
};

export default CollapsibleListLight;