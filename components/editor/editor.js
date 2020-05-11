import React from "react";
import { useState } from "react";

import ReactQuill, { Quill } from "react-quill";
import MarkdownShortcuts from "quill-markdown-shortcuts";

Quill.register("modules/markdownShortcuts", MarkdownShortcuts);

const modules = {
  markdownShortcuts: {},
};

const Editor = ({}) => {
  const [contents, setContents] = useState("");

  return (
    <ReactQuill
      theme="bubble"
      modules={modules}
      value={contents}
      onChange={setContents}
    />
  );
};

export default Editor;
