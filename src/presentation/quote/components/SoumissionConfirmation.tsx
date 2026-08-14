"use client";

import { useEffect, useId } from "react";
import { createPortal } from "react-dom";
import type { SoumissionFormValues } from "@/src/domain/quote/soumission";
import { FeedbackAlert } from "@/src/presentation/shared/components/FeedbackAlert";

type ReviewOption = {
  readonly value: string;
  readonly label: string;
};

type SoumissionConfirmationProps = {
  readonly data: SoumissionFormValues;
  readonly error?: string;
  readonly isSubmitting: boolean;
  readonly onCancel: () => void;
  readonly onConfirm: () => void;
  readonly serviceOptions: readonly ReviewOption[];
  readonly subjectOptions: readonly ReviewOption[];
};

function getOptionLabel(options: readonly ReviewOption[], value: string) {
  return options.find((option) => option.value === value)?.label ?? "Non renseigné";
}

function getWorkAtHeightsLabel(value: SoumissionFormValues["workAtHeights"]) {
  if (value === "yes") {
    return "Oui";
  }

  if (value === "no") {
    return "Non";
  }

  return "Non renseigné";
}

function getDisplayValue(value: string) {
  return value.trim() || "Non renseigné";
}

export function SoumissionConfirmation({
  data,
  error,
  isSubmitting,
  onCancel,
  onConfirm,
  serviceOptions,
  subjectOptions,
}: SoumissionConfirmationProps) {
  const titleId = useId();
  const descriptionId = useId();
  const portalTarget = typeof document === "undefined" ? null : document.body;
  const fullName = `${data.firstName} ${data.lastName}`.trim();
  const reviewItems = [
    { label: "Nom", value: getDisplayValue(fullName) },
    { label: "Courriel", value: getDisplayValue(data.email) },
    { label: "Téléphone", value: getDisplayValue(data.phone) },
    { label: "Entreprise", value: getDisplayValue(data.company) },
    { label: "Service", value: getOptionLabel(serviceOptions, data.service) },
    { label: "Sujet", value: getOptionLabel(subjectOptions, data.subject) },
    { label: "Travail en hauteur", value: getWorkAtHeightsLabel(data.workAtHeights) },
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
            <p className="section-eyebrow">Résumé de la demande</p>
            <h2 id={titleId}>Vérifiez votre demande</h2>
            <p id={descriptionId}>
              Voici le preview des informations qui seront envoyées à notre équipe.
            </p>
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
              <dt>Contexte</dt>
              <dd>{getDisplayValue(data.context)}</dd>
            </div>
          </dl>

          {error ? (
            <FeedbackAlert title="Envoi impossible" variant="error">
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
            Cancelar
          </button>
          <button
            className="button button--primary"
            disabled={isSubmitting}
            type="button"
            onClick={onConfirm}
          >
            {isSubmitting ? "Envoi en cours..." : "Envoyer la demande"}
          </button>
        </footer>
      </section>
    </div>
  );

  return portalTarget ? createPortal(dialog, portalTarget) : null;
}
