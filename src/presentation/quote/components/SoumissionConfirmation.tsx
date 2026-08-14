"use client";

import { useEffect, useId } from "react";
import { createPortal } from "react-dom";
import type { AppDictionary } from "@/src/domain/i18n/dictionaries";
import type { SoumissionFormValues } from "@/src/domain/quote/soumission";
import { FeedbackAlert } from "@/src/presentation/shared/components/FeedbackAlert";

type ReviewOption = {
  readonly value: string;
  readonly label: string;
};

type SoumissionConfirmationProps = {
  readonly copy: AppDictionary["confirmation"];
  readonly data: SoumissionFormValues;
  readonly error?: string;
  readonly isSubmitting: boolean;
  readonly labels: AppDictionary["common"];
  readonly onCancel: () => void;
  readonly onConfirm: () => void;
  readonly serviceOptions: readonly ReviewOption[];
  readonly subjectOptions: readonly ReviewOption[];
};

function getOptionLabel(options: readonly ReviewOption[], value: string, fallback: string) {
  return options.find((option) => option.value === value)?.label ?? fallback;
}

function getWorkAtHeightsLabel(
  value: SoumissionFormValues["workAtHeights"],
  labels: AppDictionary["common"],
) {
  if (value === "yes") {
    return labels.yes;
  }

  if (value === "no") {
    return labels.no;
  }

  return labels.notProvided;
}

function getDisplayValue(value: string, fallback: string) {
  return value.trim() || fallback;
}

export function SoumissionConfirmation({
  copy,
  data,
  error,
  isSubmitting,
  labels,
  onCancel,
  onConfirm,
  serviceOptions,
  subjectOptions,
}: SoumissionConfirmationProps) {
  const titleId = useId();
  const descriptionId = useId();
  const portalTarget = typeof document === "undefined" ? null : document.body;
  const fullName = `${data.firstName} ${data.lastName}`.trim();
  const fallback = labels.notProvided;
  const reviewItems = [
    { label: copy.labels.name, value: getDisplayValue(fullName, fallback) },
    { label: copy.labels.email, value: getDisplayValue(data.email, fallback) },
    { label: copy.labels.phone, value: getDisplayValue(data.phone, fallback) },
    { label: copy.labels.company, value: getDisplayValue(data.company, fallback) },
    { label: copy.labels.service, value: getOptionLabel(serviceOptions, data.service, fallback) },
    { label: copy.labels.subject, value: getOptionLabel(subjectOptions, data.subject, fallback) },
    { label: copy.labels.workAtHeights, value: getWorkAtHeightsLabel(data.workAtHeights, labels) },
  ];

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && !isSubmitting) {
        onCancel();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isSubmitting, onCancel]);

  const dialog = (
    <div
      aria-describedby={descriptionId}
      aria-labelledby={titleId}
      aria-modal="true"
      className="soumission-review"
      role="dialog"
    >
      <div className="soumission-review__overlay" aria-hidden="true" />
      <section className="soumission-review__panel">
        <header className="soumission-review__header">
          <div>
            <p className="section-eyebrow">{copy.eyebrow}</p>
            <h2 id={titleId}>{copy.title}</h2>
            <p id={descriptionId}>{copy.description}</p>
          </div>
        </header>

        <div className="soumission-review__body">
          <dl className="soumission-review__grid">
            {reviewItems.map((item) => (
              <div className="soumission-review__item" key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
            <div className="soumission-review__item soumission-review__item--full">
              <dt>{copy.labels.context}</dt>
              <dd>{getDisplayValue(data.context, fallback)}</dd>
            </div>
          </dl>

          {error ? (
            <FeedbackAlert title={copy.errorTitle} variant="error">
              {error}
            </FeedbackAlert>
          ) : null}
        </div>

        <footer className="soumission-review__actions">
          <button
            className="button button--outline"
            disabled={isSubmitting}
            type="button"
            onClick={onCancel}
          >
            {copy.cancel}
          </button>
          <button
            className="button button--primary"
            disabled={isSubmitting}
            type="button"
            onClick={onConfirm}
          >
            {isSubmitting ? copy.sending : copy.confirm}
          </button>
        </footer>
      </section>
    </div>
  );

  return portalTarget ? createPortal(dialog, portalTarget) : null;
}
