import React from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = ({ code, onChange, language }) => {
  return (
    <div className="w-full h-[500px] border border-slate-800 rounded-xl overflow-hidden shadow-2xl bg-[#1E1E1E]">
      <Editor
        height="100%"
        language={language}
        theme="vs-dark"
        value={code}
        onChange={onChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: "on",
          roundedSelection: true,
          scrollBeyondLastLine: false,
          readOnly: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;