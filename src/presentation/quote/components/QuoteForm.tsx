"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { Service } from "@/src/domain/services/models";
import type { ServiceSlug } from "@/src/domain/services/services";
import { AppIcon } from "@/src/shared/icons/AppIcon";

type QuoteFormProps = {
  readonly initialService?: ServiceSlug;
  readonly services: readonly Service[];
};

type WorkAtHeights = "" | "yes" | "no";

type QuoteFormValues = {
  readonly firstName: string;
  readonly lastName: string;
  readonly company: string;
  readonly email: string;
  readonly phone: string;
  readonly service: string;
  readonly workAtHeights: WorkAtHeights;
  readonly subject: string;
  readonly context: string;
};

type QuoteFormErrors = Partial<Record<keyof QuoteFormValues, string>>;

const SUBJECT_OPTIONS = [
  { value: "soumission", label: "Demande de soumission" },
  { value: "information", label: "Demande d'information" },
  { value: "visite", label: "Planifier une visite" },
] as const;

const emptyValues: QuoteFormValues = {
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

function validate(values: QuoteFormValues): QuoteFormErrors {
  const errors: QuoteFormErrors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^[+\d().\-\s]{7,}$/;

  if (!values.firstName.trim()) {
    errors.firstName = "Le prénom est requis.";
  }

  if (!values.lastName.trim()) {
    errors.lastName = "Le nom est requis.";
  }

  if (!values.company.trim()) {
    errors.company = "L'entreprise est requise.";
  }

  if (!values.email.trim()) {
    errors.email = "Le courriel est requis.";
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = "Entrez un courriel valide.";
  }

  if (!values.phone.trim()) {
    errors.phone = "Le téléphone est requis.";
  } else if (!phonePattern.test(values.phone.trim())) {
    errors.phone = "Entrez un numéro de téléphone valide.";
  }

  if (!values.subject) {
    errors.subject = "Le sujet est requis.";
  }

  if (!values.context.trim()) {
    errors.context = "Le contexte est requis.";
  }

  return errors;
}

export function QuoteForm({ initialService, services }: QuoteFormProps) {
  const formId = useId();
  const [values, setValues] = useState<QuoteFormValues>({
    ...emptyValues,
    service: initialService ?? "",
  });
  const [errors, setErrors] = useState<QuoteFormErrors>({});
  const [hasTriedSubmit, setHasTriedSubmit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  const serviceOptions = useMemo(
    () => services.map((service) => ({ value: service.slug, label: service.title })),
    [services],
  );

  function updateValue<K extends keyof QuoteFormValues>(
    key: K,
    value: QuoteFormValues[K],
  ) {
    setValues((current) => ({ ...current, [key]: value }));
    if (hasTriedSubmit) {
      setErrors(validate({ ...values, [key]: value }));
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const nextErrors = validate(values);
    setErrors(nextErrors);
    setHasTriedSubmit(true);
    setSubmitMessage(null);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    console.log("Soumission form payload:", values);
    await Promise.resolve();
    setIsSubmitting(false);
    setSubmitMessage(
      "L'envoi en ligne est prêt côté interface. Il reste à connecter le service d'envoi pour transmettre cette demande automatiquement.",
    );
  }

  return (
    <form className="quote-form" onSubmit={handleSubmit} noValidate>
      <div className="quote-form__grid quote-form__grid--two">
        <Field
          error={errors.firstName}
          id={`${formId}-first-name`}
          label="First Name"
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
          label="Last Name"
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

      <Field error={errors.company} id={`${formId}-company`} label="Company" required>
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

      <Field error={errors.email} id={`${formId}-email`} label="Email" required>
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

      <Field error={errors.phone} id={`${formId}-phone`} label="Phone Number" required>
        <input
          id={`${formId}-phone`}
          name="phone"
          type="tel"
          autoComplete="tel"
          value={values.phone}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? `${formId}-phone-error` : undefined}
          onChange={(event) => updateValue("phone", event.target.value)}
        />
      </Field>

      <Field id={`${formId}-service`} label="Service">
        <FormListbox
          id={`${formId}-service`}
          name="service"
          options={serviceOptions}
          placeholder="Sélectionner un service"
          value={values.service}
          onChange={(value) => updateValue("service", value)}
        />
      </Field>

      <fieldset className="quote-form__fieldset">
        <legend>Will any work at heights be required?</legend>
        <label>
          <input
            type="radio"
            name="workAtHeights"
            value="yes"
            checked={values.workAtHeights === "yes"}
            onChange={() => updateValue("workAtHeights", "yes")}
          />
          Yes
        </label>
        <label>
          <input
            type="radio"
            name="workAtHeights"
            value="no"
            checked={values.workAtHeights === "no"}
            onChange={() => updateValue("workAtHeights", "no")}
          />
          No
        </label>
      </fieldset>

      <Field error={errors.subject} id={`${formId}-subject`} label="Subject" required>
        <FormListbox
          id={`${formId}-subject`}
          name="subject"
          ariaDescribedBy={errors.subject ? `${formId}-subject-error` : undefined}
          ariaInvalid={Boolean(errors.subject)}
          options={SUBJECT_OPTIONS}
          placeholder="Choisir"
          value={values.subject}
          onChange={(value) => updateValue("subject", value)}
        />
      </Field>

      <Field error={errors.context} id={`${formId}-context`} label="Context" required>
        <textarea
          id={`${formId}-context`}
          name="context"
          rows={4}
          placeholder="Adresse du bâtiment, dimensions approximatives, contexte ou raison de la demande"
          value={values.context}
          aria-invalid={Boolean(errors.context)}
          aria-describedby={errors.context ? `${formId}-context-error` : undefined}
          onChange={(event) => updateValue("context", event.target.value)}
        />
      </Field>

      {submitMessage ? (
        <p className="quote-form__status" role="status">
          {submitMessage}
        </p>
      ) : null}

      <button className="button button--primary quote-form__submit" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Envoi en cours..." : "Send my request"}
      </button>
    </form>
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
