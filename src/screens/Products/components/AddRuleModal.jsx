import React, { useState, useCallback, useEffect } from "react";
import { Modal, TextField, InlineGrid, Button, Icon } from "@shopify/polaris";
import DatePickerExample from "./SelectDate";
import { DeleteIcon } from "@shopify/polaris-icons";
import ErrorValidate from "./ErrorValidate";
function AddRuleModal({ active, toggleModal }) {
  const [state, setState] = useState({
    title: "",
    rule: [
      {
        buy_from: null,
        buy_to: null,
        discount: null,
      },
    ],
    start_date: new Date(),
    end_date: new Date(),
    error_start_date: false,
    error_end_date: false,
    error_buy_from: false,
    error_buy_to: false,
  });
  useEffect(() => {
    if (active) {
      setState((prev) => ({
        title: "",
        rule: [
          {
            buy_from: null,
            buy_to: null,
            discount: null,
          },
        ],
        start_date: new Date(),
        end_date: new Date(),
        error_start_date: false,
        error_end_date: false,
        error_buy_from: false,
        error_buy_to: false,
      }));
    }
  }, [active]);
  const handleSave = async () => {
    if (
      state.error_start_date ||
      state.error_end_date ||
      state.rule.some((item) => item.buy_from > item.buy_to)
    )
      return;
    const body = {
      title: state.title,
      start_date: state.start_date,
      end_date: state.end_date,
      rule: state.rule,
    };
    console.log("body", body);

    // toggleModal();
  };
  const handleTitleChange = useCallback(
    (value) => setState((prev) => ({ ...prev, title: value })),
    []
  );
  const handleRule = useCallback((field, index, value) => {
    setState((prev) => {
      const newRules = [...prev.rule];
      newRules[index][field] = +value;
      let buy_from;
      let buy_to;
      if (field === "buy_from") {
        buy_from = value > newRules[index].buy_to;
        buy_to = false;
      }
      if (field === "buy_to") {
        buy_to = value < newRules[index].buy_from;
        buy_from = false;
      }

      return {
        ...prev,
        rule: newRules,
        error_buy_from: { ...prev.error_buy_from, [index]: buy_from },
        error_buy_to: { ...prev.error_buy_to, [index]: buy_to },
      };
    });
  }, []);
  const handleAddRule = useCallback(() => {
    setState((prev) => {
      let newRules = [...prev.rule];
      newRules = [
        ...newRules,
        {
          buy_from: null,
          buy_to: null,
          discount: null,
        },
      ];
      return { ...prev, rule: newRules };
    });
  }, []);

  const handleDeleteRule = useCallback((index_delete) => {
    setState((prev) => ({
      ...prev,
      rule: prev.rule.filter((_, index) => index !== index_delete),
    }));
  }, []);

  const onChangeStartDate = (date) => {
    setState((prev) => ({
      ...prev,
      start_date: date,
      error_start_date: new Date(date) >= new Date(prev.end_date),
      error_end_date: false,
    }));
  };
  const onChangeEndDate = (date) => {
    setState((prev) => ({
      ...prev,
      end_date: date,
      error_end_date: new Date(date) <= new Date(prev.start_date),
      error_start_date: false,
    }));
  };
  return (
    <Modal
      open={active}
      onClose={toggleModal}
      title="Add rule"
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
        <div className="d-flex w-95p">
          <InlineGrid columns={3}>
            <div className="p-8">
              <TextField
                label="Title campaign"
                value={state.title}
                onChange={handleTitleChange}
                autoComplete="off"
              />
            </div>
            <div>
              <DatePickerExample
                label={"Start date"}
                key={"start"}
                onChange={onChangeStartDate}
              />
              {state.error_start_date && (
                <ErrorValidate
                  text={"The start date must be less than the end date"}
                />
              )}
            </div>
            <div>
              <DatePickerExample
                label={"End date"}
                key={"end"}
                onChange={onChangeEndDate}
              />
              {state.error_end_date && (
                <ErrorValidate
                  text={"The end date must be greater than the start date"}
                />
              )}
            </div>
          </InlineGrid>
        </div>
        <div>
          {state.rule.map((item, index) => (
            <div className="d-flex align-center" key={index}>
              <div className="w-95p">
                <InlineGrid columns={3}>
                  <div className="p-8">
                    <TextField
                      label="Buy from"
                      value={item.buy_from}
                      onChange={(e) => handleRule("buy_from", index, e)}
                      autoComplete="off"
                      type="number"
                      min={0}
                    />
                    {state.error_buy_from?.[index] && (
                      <ErrorValidate
                        text={"Buy from must be smaller than buy to"}
                      />
                    )}
                  </div>
                  <div className="p-8">
                    <TextField
                      label="Buy to"
                      value={item.buy_to}
                      onChange={(e) => handleRule("buy_to", index, e)}
                      autoComplete="off"
                      type="number"
                      min={0}
                    />
                    {state.error_buy_to?.[index] && (
                      <ErrorValidate
                        text={"Buy to must be greater than Buy from"}
                      />
                    )}
                  </div>
                  <div className="p-8">
                    <TextField
                      label="Discount per item (%)"
                      value={item.discount}
                      onChange={(e) => handleRule("discount", index, e)}
                      autoComplete="off"
                      type="number"
                      min={0}
                    />
                  </div>
                </InlineGrid>
              </div>
              <div
                className="mt-4p cusor-pointer"
                onClick={() => handleDeleteRule(index)}
              >
                <Icon source={DeleteIcon} tone="base" />
              </div>
            </div>
          ))}
        </div>
        <div className="ml-8">
          <Button onClick={handleAddRule}>+ Add</Button>
        </div>
      </Modal.Section>
    </Modal>
  );
}

export default AddRuleModal;
