import React, { useState } from "react";

export function UploadTable() {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles.map(file => ({ file, preview: URL.createObjectURL(file) })));
  };

  const handleUpload = async (fileObj) => {
    const formData = new FormData();
    formData.append("file", fileObj.file);

    try {
      setUploading(true);
      const res = await fetch("http://localhost:5529/upload", {
        method: "POST",
        body: formData,
      });

      const result = await res.json(); // server jau grąžina JSON
      console.log("Server response:", result);
      setMessage(result.message || "Upload complete!");
    } catch (err) {
      console.error("Klaida siunčiant failą:", err);
      setMessage("Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container mt-3">
      <h2>Upload Files</h2>
      <input type="file" multiple onChange={handleFileChange} />
      {files.length > 0 && (
        <table className="table mt-3">
          <thead>
            <tr>
              <th>Preview</th>
              <th>Filename</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {files.map((f, idx) => (
              <tr key={idx}>
                <td>
                  <img src={f.preview} alt="preview" width={100} />
                </td>
                <td>{f.file.name}</td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => handleUpload(f)}
                    disabled={uploading}
                  >
                    Upload
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
}