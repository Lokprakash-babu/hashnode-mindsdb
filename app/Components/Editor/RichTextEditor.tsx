"use client";
import "froala-editor/css/froala_style.min.css";

import "froala-editor/css/froala_editor.pkgd.min.css";
import dynamic from "next/dynamic";

import { useEffect, useState } from "react";
const FroalaEditorComponent = dynamic(() => import("react-froala-wysiwyg"), {
  ssr: false,
});
import Froalaeditor from "froala-editor";
import EditorPrompt from "./EditorPrompt";
import { useDisclosure } from "@nextui-org/react";

const OPTIONS = {
  attribution: false,
  toolbarButtons: [
    "ask_ai",
    "bold",
    "italic",
    "underline",
    "outdent",
    "indent",
    "undo",
    "redo",
    "clearFormatting",
    "selectAll",
  ],

  heightMin: 250,
};

const RichTextEditor = (props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  Froalaeditor.DefineIcon("ask_ai", { NAME: "magic" });
  Froalaeditor.RegisterCommand("ask_ai", {
    title: "Ask AI",
    focus: false,
    undo: false,
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 mr-1"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path><path d="M5 3v4"></path><path d="M19 17v4"></path><path d="M3 5h4"></path><path d="M17 19h4"></path></svg>',
    refreshAfterCallback: false,
    callback: function () {
      onOpen();
    },
  });

  return (
    <>
      <FroalaEditorComponent config={OPTIONS} {...props} />
      <EditorPrompt showPrompt={isOpen} setShowPrompt={onOpenChange} />
    </>
  );
};

export default RichTextEditor;
