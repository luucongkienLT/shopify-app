import React, { useState, useRef, useEffect } from "react";
import {
  BlockStack,
  Box,
  DatePicker,
  Card,
  Icon,
  TextField,
  Popover,
} from "@shopify/polaris";
import { CalendarIcon } from "@shopify/polaris-icons";
function DatePickerExample({ label, key, onChange }) {
  const [visible, setVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [{ month, year }, setDate] = useState({
    month: selectedDate.getMonth(),
    year: selectedDate.getFullYear(),
  });

  const datePickerRef = useRef(null);

  function handleInputValueChange() {
    console.log("handleInputValueChange");
  }
  function handleOnClose({ relatedTarget }) {
    setVisible(false);
  }
  function handleMonthChange(month, year) {
    setDate({ month, year });
  }

  function handleDateSelection({ end: newSelectedDate }) {
    setSelectedDate(newSelectedDate);

    onChange(newSelectedDate);
    setVisible(false);
  }
  useEffect(() => {
    if (selectedDate) {
      setDate({
        month: selectedDate.getMonth(),
        year: selectedDate.getFullYear(),
      });
    }
  }, [selectedDate]);
  return (
    <BlockStack inlineAlign="center" gap="400">
      <Box minWidth="100" padding={{ xs: 200 }} width="300">
        <Popover
          active={visible}
          autofocusTarget="none"
          preferredAlignment="left"
          fullWidth
          preferInputActivator={false}
          preferredPosition="below"
          preventCloseOnChildOverlayClick
          onClose={handleOnClose}
          activator={
            <TextField
              role="combobox"
              label={label}
              prefix={<Icon source={CalendarIcon} />}
              value={selectedDate.toLocaleDateString()}
              onFocus={() => setVisible(true)}
              onChange={handleInputValueChange}
              autoComplete="off"
            />
          }
        >
          <Card ref={datePickerRef}>
            <DatePicker
              month={month}
              year={year}
              selected={selectedDate}
              onMonthChange={handleMonthChange}
              onChange={handleDateSelection}
            />
          </Card>
        </Popover>
      </Box>
    </BlockStack>
  );
}
export default React.memo(DatePickerExample);
