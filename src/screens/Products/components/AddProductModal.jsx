import { useState, useCallback, useEffect } from "react";
import {
  Modal,
  TextField,
  DropZone,
  Text,
  LegacyStack,
  Thumbnail,
  Icon,
  Button,
} from "@shopify/polaris";
import { DeleteIcon, NoteIcon } from "@shopify/polaris-icons";
import "@shopify/polaris/build/esm/styles.css";
function AddProductModal({ active, toggleModal }) {
  const [files, setFiles] = useState([]);
  const [state, setState] = useState({
    title: "",
    price: "",
    description: "",
  });

  useEffect(() => {
    if (active)
      setState((prev) => ({
        title: "",
        price: "",
        description: "",
      }));
    setFiles([]);
  }, [active]);

  const handleDropZoneDrop = useCallback(
    (_dropFiles, acceptedFiles, _rejectedFiles) =>
      setFiles((files) => [...files, ...acceptedFiles]),
    []
  );

  const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
  const handleRemoveFile = useCallback((index) => {
    setFiles((files) => files.filter((_, i) => i !== index));
  }, []);
  const fileUpload = !files.length && (
    <>
      <DropZone.FileUpload
        actionTitle="Upload Files"
        actionHint="Accepts .gif, .jpg, and .png"
      />
    </>
  );

  const uploadedFiles = files.length > 0 && (
    <div>
      {files.map((file, index) => (
        <div key={index}>
          <div className="d-flex justify-between m-15">
            <div className="d-flex">
              <Thumbnail
                size="small"
                alt={file.name}
                source={
                  validImageTypes.includes(file.type)
                    ? window.URL.createObjectURL(file)
                    : NoteIcon
                }
              />

              <div>
                {file.name}{" "}
                <Text variant="bodySm" as="p">
                  {file.size} bytes
                </Text>
              </div>
            </div>
            <Button
              icon={<Icon source={DeleteIcon} tone="success" />}
              onClick={() => handleRemoveFile(index)}
              accessibilityLabel={`Remove ${file.name}`}
            />
          </div>
        </div>
      ))}
    </div>
  );
  const handleTitleChange = useCallback(
    (value) => setState((prev) => ({ ...prev, title: value })),
    []
  );
  const handlePriceChange = useCallback(
    (value) => setState((prev) => ({ ...prev, price: value })),
    []
  );
  const handleDescriptionChange = useCallback(
    (value) => setState((prev) => ({ ...prev, description: value })),
    []
  );

  const handleSave = () => {
    console.log({
      title: state.title,
      price: state.price,
      description: state.description,
      files,
    });
    toggleModal();
  };

  return (
    <Modal
      open={active}
      onClose={toggleModal}
      title="Add product"
      primaryAction={{
        content: "Save",
        onAction: handleSave,
      }}
      secondaryActions={[
        {
          content: "Cancel",
          onAction: toggleModal,
        },
      ]}
    >
      <Modal.Section>
        <div className="mb-20">
          <TextField
            label="Title"
            value={state.title}
            onChange={handleTitleChange}
            autoComplete="off"
          />
        </div>
        <div className="mb-20">
          <TextField
            label="Price"
            value={state.price}
            onChange={handlePriceChange}
            type="number"
            autoComplete="off"
          />
        </div>
        <div className="mb-20">
          <Text>Image</Text>
          <DropZone onDrop={handleDropZoneDrop} variableHeight>
            {uploadedFiles}
            {fileUpload}
          </DropZone>
        </div>
        <TextField
          label="Description"
          value={state.description}
          onChange={handleDescriptionChange}
          autoComplete="off"
          multiline={4}
        />
      </Modal.Section>
    </Modal>
  );
}

export default AddProductModal;
