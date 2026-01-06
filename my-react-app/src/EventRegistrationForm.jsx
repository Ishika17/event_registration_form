import React, { useMemo, useState } from "react";
import "./eventRegistrationForm.css";
import FormHeader from "./FormHeader";
import AlertMessage from "./AlertMessage";
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";
import FormActions from "./FormActions";

const EVENT_OPTIONS = [
  { value: "", label: "Select an event" },
  { value: "react_workshop", label: "React Workshop" },
  { value: "js_bootcamp", label: "JavaScript Bootcamp" },
  { value: "ui_masterclass", label: "UI Masterclass" },
];

const REGISTRATION_TYPES = [
  { value: "", label: "Select type" },
  { value: "attendee", label: "Attendee" },
  { value: "speaker", label: "Speaker" },
  { value: "guest", label: "Guest" },
];

export default function EventRegistrationForm() {
  const [formState, setFormState] = useState({
    fullName: "",
    emailAddress: "",
    mobileNumber: "",
    eventSelection: "",
    registrationType: "",
  });

  const [formTouched, setFormTouched] = useState({});
  const [submitState, setSubmitState] = useState({ type: "", message: "" });

  const validationErrors = useMemo(() => {
    const errors = {};

    if (!formState.fullName.trim()) errors.fullName = "Full name is required.";
    else if (formState.fullName.trim().length < 3)
      errors.fullName = "Name must be at least 3 characters.";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!formState.emailAddress.trim())
      errors.emailAddress = "Email is required.";
    else if (!emailRegex.test(formState.emailAddress))
      errors.emailAddress = "Invalid email address.";

    if (formState.mobileNumber.replace(/\D/g, "").length !== 10)
      errors.mobileNumber = "Mobile number must be 10 digits.";

    if (!formState.eventSelection)
      errors.eventSelection = "Select an event.";

    if (!formState.registrationType)
      errors.registrationType = "Select registration type.";

    return errors;
  }, [formState]);

  const isFormValid = Object.keys(validationErrors).length === 0;

  function handleChange(e) {
    setFormState({ ...formState, [e.target.name]: e.target.value });
    setSubmitState({ type: "", message: "" });
  }

  function handleBlur(e) {
    setFormTouched({ ...formTouched, [e.target.name]: true });
  }

  function showError(name) {
    return formTouched[name] && validationErrors[name];
  }

  function handleSubmit(e) {
    e.preventDefault();
    setFormTouched({
      fullName: true,
      emailAddress: true,
      mobileNumber: true,
      eventSelection: true,
      registrationType: true,
    });

    if (!isFormValid) {
      setSubmitState({
        type: "error",
        message: "Please fix errors before submitting.",
      });
      return;
    }

    setSubmitState({
      type: "success",
      message: "Registration successful! Email sent.",
    });

    setFormState({
      fullName: "",
      emailAddress: "",
      mobileNumber: "",
      eventSelection: "",
      registrationType: "",
    });
    setFormTouched({});
  }

  return (
    <main className="page">
      <section className="card">
        <FormHeader />

        <AlertMessage submitState={submitState} />

        <form className="form" onSubmit={handleSubmit} noValidate>
          <TextInput
            label="Full Name"
            name="fullName"
            value={formState.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={showError("fullName")}
          />

          <TextInput
            label="Email Address"
            name="emailAddress"
            type="email"
            value={formState.emailAddress}
            onChange={handleChange}
            onBlur={handleBlur}
            error={showError("emailAddress")}
          />

          <TextInput
            label="Mobile Number"
            name="mobileNumber"
            type="tel"
            value={formState.mobileNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            error={showError("mobileNumber")}
          />

          <div className="grid2">
            <SelectInput
              label="Event Selection"
              name="eventSelection"
              value={formState.eventSelection}
              options={EVENT_OPTIONS}
              onChange={handleChange}
              onBlur={handleBlur}
              error={showError("eventSelection")}
            />

            <SelectInput
              label="Registration Type"
              name="registrationType"
              value={formState.registrationType}
              options={REGISTRATION_TYPES}
              onChange={handleChange}
              onBlur={handleBlur}
              error={showError("registrationType")}
            />
          </div>

          <FormActions
            onReset={() => {
              setFormState({
                fullName: "",
                emailAddress: "",
                mobileNumber: "",
                eventSelection: "",
                registrationType: "",
              });
              setFormTouched({});
              setSubmitState({ type: "", message: "" });
            }}
          />
        </form>
      </section>
    </main>
  );
}
