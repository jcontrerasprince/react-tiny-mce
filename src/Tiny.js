import React, { useState, useRef, useEffect } from "react";
import "tinymce/tinymce";
import "tinymce/icons/default";
import "tinymce/themes/silver";
import "tinymce/plugins/paste";
import "tinymce/plugins/link";
import "tinymce/plugins/image";
import "tinymce/plugins/table";
import "tinymce/plugins/code";
import "tinymce/skins/ui/oxide/skin.min.css";
import "tinymce/skins/ui/oxide/content.min.css";
import "tinymce/skins/content/default/content.min.css";
import { Editor } from "@tinymce/tinymce-react";

// Primer ejemplo de TinyMCE para TpBook. En este ejemplo se puede renderizar script,
// la condición es que se debe extraer la etiqueta <scritp> del elemento guardado en
// la db y añadirlo al DOM usando useEffect. Verificar si se está renderizando uno por
// uno en el front o todos al mismo tiempo

const Tiny = () => {
  const [contentEditor, setContentEditor] = useState();
  const [contentScript, setContentScript] = useState();
  const handleEditorChange = () => {
    if (editorRef.current) {
      var text = editorRef.current.getContent();
      console.log(text);
      var wrapper = document.createElement("div");
      wrapper.innerHTML = text;
      var script = wrapper.querySelector("script");
      document.getElementById("text").innerHTML = text;
      setContentScript(script.innerText);
    }
  };
  const editorRef = useRef(null);

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.innerText = contentScript;
    console.log(contentScript);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [contentScript]);

  return (
    <>
      <Editor
        initialValue="<p>This is the initial content of the editor</p>"
        onInit={(evt, editor) => (editorRef.current = editor)}
        init={{
          skin: false,
          content_css: false,
          height: 500,
          menubar: true,
          selector: "textarea",
          plugins: ["link image", "table paste", "code"],
          toolbar:
            "undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help",
          extended_valid_elements:
            "button[onclick],script[src|async|defer|type|charset|language]",
          valid_children: "+body[style]",
        }}
        value={contentEditor}
        // onEditorChange={handleEditorChange}
      />
      <button onClick={handleEditorChange}>Log editor content</button>
      <div id="text"></div>
    </>
  );
};

export default Tiny;
