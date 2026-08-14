"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { AppDictionary } from "@/src/domain/i18n/dictionaries";
import type { SoumissionFormValues } from "@/src/domain/quote/soumission";
import type { Service } from "@/src/domain/services/models";
import type { ServiceSlug } from "@/src/domain/services/services";
import { sendSoumission } from "@/src/infrastructure/email/send-soumission";
import { FeedbackAlert } from "@/src/presentation/shared/components/FeedbackAlert";
import { SoumissionConfirmation } from "@/src/presentation/quote/components/SoumissionConfirmation";
import { AppIcon } from "@/src/shared/icons/AppIcon";

type QuoteFormProps = {
  readonly confirmationCopy: AppDictionary["confirmation"];
  readonly copy: AppDictionary["quoteForm"];
  readonly initialService?: ServiceSlug;
  readonly labels: AppDictionary["common"];
  readonly services: readonly Service[];
};

type QuoteFormErrors = Partial<Record<keyof SoumissionFormValues, string>>;

type SubmitState = "idle" | "success" | "error";

const PHONE_DIGIT_LIMIT = 10;

const emptyValues: SoumissionFormValues = {
  firstName: "",
  lastName: "",
  company: "",
  email: "",
  phone: "",
  service: "",
  workAtHeights: "",
  subject: "",
  context: "",
};

function validate(
  values: SoumissionFormValues,
  copy: AppDictionary["quoteForm"],
): QuoteFormErrors {
  const errors: QuoteFormErrors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneDigits = getPhoneDigits(values.phone);

  if (!values.firstName.trim()) {
    errors.firstName = copy.errors.firstName;
  }

  if (!values.lastName.trim()) {
    errors.lastName = copy.errors.lastName;
  }

  if (!values.email.trim()) {
    errors.email = copy.errors.emailRequired;
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = copy.errors.emailInvalid;
  }

  if (!values.phone.trim()) {
    errors.phone = copy.errors.phoneRequired;
  } else if (phoneDigits.length !== PHONE_DIGIT_LIMIT) {
    errors.phone = copy.errors.phoneInvalid;
  }

  if (!values.subject) {
    errors.subject = copy.errors.subject;
  }

  if (!values.context.trim()) {
    errors.context = copy.errors.context;
  }

  return errors;
}

function getPhoneDigits(value: string) {
  return value.replace(/\D/g, "");
}

function normalizePhoneInput(value: string) {
  return getPhoneDigits(value).slice(0, PHONE_DIGIT_LIMIT);
}

export function QuoteForm({
  confirmationCopy,
  copy,
  initialService,
  labels,
  services,
}: QuoteFormProps) {
  const formId = useId();
  const [values, setValues] = useState<SoumissionFormValues>({
    ...emptyValues,
    service: initialService ?? "",
  });
  const [errors, setErrors] = useState<QuoteFormErrors>({});
  const [hasTriedSubmit, setHasTriedSubmit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pendingSubmission, setPendingSubmission] = useState<SoumissionFormValues | null>(null);
  const [confirmationError, setConfirmationError] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  const serviceOptions = useMemo(
    () => services.map((service) => ({ value: service.slug, label: service.title })),
    [services],
  );
  const phoneDigitCount = getPhoneDigits(values.phone).length;

  useEffect(() => {
    if (submitState === "idle") {
      return;
    }

    const timeoutId = window.setTimeout(() => setSubmitState("idle"), 4000);
    return () => window.clearTimeout(timeoutId);
  }, [submitState]);

  function updateValue<K extends keyof SoumissionFormValues>(
    key: K,
    value: SoumissionFormValues[K],
  ) {
    const nextValues = { ...values, [key]: value };
    setValues(nextValues);
    setSubmitState("idle");
    setConfirmationError("");
    if (hasTriedSubmit) {
      setErrors(validate(nextValues, copy));
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const nextErrors = validate(values, copy);
    setErrors(nextErrors);
    setHasTriedSubmit(true);
    setSubmitState("idle");

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setPendingSubmission(values);
    setConfirmationError("");
  }

  function handleCancelSubmission() {
    if (isSubmitting) {
      return;
    }

    setPendingSubmission(null);
    setConfirmationError("");
  }

  async function handleConfirmSubmission() {
    if (isSubmitting || !pendingSubmission) {
      return;
    }

    setIsSubmitting(true);
    setConfirmationError("");
    try {
      await sendSoumission(pendingSubmission);
      setValues({
        ...emptyValues,
        service: initialService ?? "",
      });
      setErrors({});
      setHasTriedSubmit(false);
      setPendingSubmission(null);
      setSubmitState("success");
    } catch {
      setConfirmationError(copy.errors.send);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <form className="quote-form" onSubmit={handleSubmit} noValidate>
      <div className="quote-form__grid quote-form__grid--two">
        <Field
          error={errors.firstName}
          id={`${formId}-first-name`}
          label={copy.fields.firstName}
          required
        >
          <input
            id={`${formId}-first-name`}
            name="firstName"
            autoComplete="given-name"
            value={values.firstName}
            aria-invalid={Boolean(errors.firstName)}
            aria-describedby={errors.firstName ? `${formId}-first-name-error` : undefined}
            onChange={(event) => updateValue("firstName", event.target.value)}
          />
        </Field>
        <Field
          error={errors.lastName}
          id={`${formId}-last-name`}
          label={copy.fields.lastName}
          required
        >
          <input
            id={`${formId}-last-name`}
            name="lastName"
            autoComplete="family-name"
            value={values.lastName}
            aria-invalid={Boolean(errors.lastName)}
            aria-describedby={errors.lastName ? `${formId}-last-name-error` : undefined}
            onChange={(event) => updateValue("lastName", event.target.value)}
          />
        </Field>
      </div>

      <Field error={errors.company} id={`${formId}-company`} label={copy.fields.company}>
        <input
          id={`${formId}-company`}
          name="company"
          autoComplete="organization"
          value={values.company}
          aria-invalid={Boolean(errors.company)}
          aria-describedby={errors.company ? `${formId}-company-error` : undefined}
          onChange={(event) => updateValue("company", event.target.value)}
        />
      </Field>

      <Field error={errors.email} id={`${formId}-email`} label={copy.fields.email} required>
        <input
          id={`${formId}-email`}
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? `${formId}-email-error` : undefined}
          onChange={(event) => updateValue("email", event.target.value)}
        />
      </Field>

      <Field error={errors.phone} id={`${formId}-phone`} label={copy.fields.phone} required>
        <div className="quote-form__phone-control">
          <input
            id={`${formId}-phone`}
            name="phone"
            type="tel"
            inputMode="numeric"
            pattern="[0-9]*"
            autoComplete="tel"
            maxLength={PHONE_DIGIT_LIMIT}
            value={values.phone}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={`${formId}-phone-counter${errors.phone ? ` ${formId}-phone-error` : ""}`}
            onChange={(event) => updateValue("phone", normalizePhoneInput(event.target.value))}
          />
          <span
            className="quote-form__phone-counter"
            id={`${formId}-phone-counter`}
            aria-live="polite"
          >
            {phoneDigitCount}/{PHONE_DIGIT_LIMIT}
          </span>
        </div>
      </Field>

      <Field id={`${formId}-service`} label={copy.fields.service}>
        <FormListbox
          id={`${formId}-service`}
          name="service"
          options={serviceOptions}
          placeholder={copy.placeholders.service}
          value={values.service}
          onChange={(value) => updateValue("service", value)}
        />
      </Field>

      <fieldset className="quote-form__fieldset">
        <legend>{copy.fields.workAtHeights}</legend>
        <label>
          <input
            type="radio"
            name="workAtHeights"
            value="yes"
            checked={values.workAtHeights === "yes"}
            onChange={() => updateValue("workAtHeights", "yes")}
          />
          {labels.yes}
        </label>
        <label>
          <input
            type="radio"
            name="workAtHeights"
            value="no"
            checked={values.workAtHeights === "no"}
            onChange={() => updateValue("workAtHeights", "no")}
          />
          {labels.no}
        </label>
      </fieldset>

      <Field error={errors.subject} id={`${formId}-subject`} label={copy.fields.subject} required>
        <FormListbox
          id={`${formId}-subject`}
          name="subject"
          ariaDescribedBy={errors.subject ? `${formId}-subject-error` : undefined}
          ariaInvalid={Boolean(errors.subject)}
          options={copy.subjects}
          placeholder={copy.placeholders.subject}
          value={values.subject}
          onChange={(value) => updateValue("subject", value)}
        />
      </Field>

      <Field error={errors.context} id={`${formId}-context`} label={copy.fields.context} required>
        <textarea
          id={`${formId}-context`}
          name="context"
          rows={4}
          placeholder={copy.placeholders.context}
          value={values.context}
          aria-invalid={Boolean(errors.context)}
          aria-describedby={errors.context ? `${formId}-context-error` : undefined}
          onChange={(event) => updateValue("context", event.target.value)}
        />
      </Field>

      <button className="button button--primary quote-form__submit" type="submit" disabled={isSubmitting}>
        {isSubmitting ? copy.submitting : copy.submit}
      </button>

      {submitState === "success" ? (
        <FeedbackAlert mode="toast" title={copy.successTitle} variant="success">
          {copy.successBody}
        </FeedbackAlert>
      ) : null}

      {submitState === "error" ? (
        <FeedbackAlert mode="toast" title={copy.errorTitle} variant="error">
          {copy.errorBody}
        </FeedbackAlert>
      ) : null}

      </form>

      {pendingSubmission ? (
        <SoumissionConfirmation
          data={pendingSubmission}
          error={confirmationError}
          isSubmitting={isSubmitting}
          copy={confirmationCopy}
          labels={labels}
          serviceOptions={serviceOptions}
          subjectOptions={copy.subjects}
          onCancel={handleCancelSubmission}
          onConfirm={handleConfirmSubmission}
        />
      ) : null}
    </>
  );
}

type FieldProps = {
  readonly children: React.ReactNode;
  readonly error?: string;
  readonly id: string;
  readonly label: string;
  readonly required?: boolean;
};

function Field({ children, error, id, label, required = false }: FieldProps) {
  return (
    <div className="quote-form__field">
      <label htmlFor={id}>
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>
      {children}
      {error ? (
        <p className="quote-form__error" id={`${id}-error`}>
          {error}
        </p>
      ) : null}
    </div>
  );
}

type ListboxOption = {
  readonly value: string;
  readonly label: string;
};

type FormListboxProps = {
  readonly ariaDescribedBy?: string;
  readonly ariaInvalid?: boolean;
  readonly id: string;
  readonly name: string;
  readonly onChange: (value: string) => void;
  readonly options: readonly ListboxOption[];
  readonly placeholder: string;
  readonly value: string;
};

function FormListbox({
  ariaDescribedBy,
  ariaInvalid = false,
  id,
  name,
  onChange,
  options,
  placeholder,
  value,
}: FormListboxProps) {
  const listboxId = `${id}-listbox`;
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const selectedIndex = options.findIndex((option) => option.value === value);
  const fallbackIndex = selectedIndex >= 0 ? selectedIndex : 0;
  const [activeIndex, setActiveIndex] = useState(fallbackIndex);
  const selectedOption = selectedIndex >= 0 ? options[selectedIndex] : undefined;

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen]);

  function chooseOption(option: ListboxOption) {
    onChange(option.value);
    setIsOpen(false);
  }

  function openListbox() {
    setActiveIndex(fallbackIndex);
    setIsOpen(true);
  }

  function toggleListbox() {
    if (isOpen) {
      setIsOpen(false);
      return;
    }

    openListbox();
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!isOpen) {
        openListbox();
      }
      setActiveIndex((current) => {
        const direction = event.key === "ArrowDown" ? 1 : -1;
        return (current + direction + options.length) % options.length;
      });
      return;
    }

    if (event.key === "Home") {
      event.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      }
      setActiveIndex(0);
      return;
    }

    if (event.key === "End") {
      event.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      }
      setActiveIndex(options.length - 1);
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (isOpen) {
        chooseOption(options[activeIndex]);
        return;
      }

      openListbox();
      return;
    }

    if (event.key === "Escape") {
      setIsOpen(false);
    }
  }

  return (
    <div className="quote-listbox" ref={containerRef}>
      <input name={name} type="hidden" value={value} />
      <button
        aria-controls={listboxId}
        aria-describedby={ariaDescribedBy}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className="quote-listbox__trigger"
        data-invalid={ariaInvalid ? "true" : undefined}
        id={id}
        type="button"
        onClick={toggleListbox}
        onKeyDown={handleKeyDown}
      >
        <span className={selectedOption ? undefined : "quote-listbox__placeholder"}>
          {selectedOption?.label ?? placeholder}
        </span>
        <AppIcon className="quote-listbox__chevron" name="chevronDown" size={14} />
      </button>

      {isOpen ? (
        <div
          aria-activedescendant={`${id}-option-${activeIndex}`}
          className="quote-listbox__menu"
          id={listboxId}
          role="listbox"
          tabIndex={-1}
        >
          {options.map((option, index) => {
            const isSelected = option.value === value;
            const isActive = index === activeIndex;

            return (
              <button
                aria-selected={isSelected}
                className={`quote-listbox__option${isSelected ? " is-selected" : ""}${isActive ? " is-active" : ""}`}
                id={`${id}-option-${index}`}
                key={option.value}
                role="option"
                type="button"
                onClick={() => chooseOption(option)}
                onMouseEnter={() => setActiveIndex(index)}
              >
                <span>{option.label}</span>
                {isSelected ? (
                  <AppIcon className="quote-listbox__check" name="check" size={14} />
                ) : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
