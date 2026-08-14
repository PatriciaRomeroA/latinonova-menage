import { AppIcon } from "@/src/shared/icons/AppIcon";
import { QuoteTrigger } from "@/src/presentation/quote/components/QuoteTrigger";

type QuoteBannerProps = {
  readonly copy: {
    readonly body: string;
    readonly cta: string;
    readonly eyebrow: string;
    readonly note: string;
    readonly title: string;
  };
};

export function QuoteBanner({ copy }: QuoteBannerProps) {
  return (
    <section className="quote-banner" id="soumission" aria-labelledby="quote-title">
      <div className="container quote-banner__inner">
        <div className="quote-banner__content">
          <p className="quote-banner__eyebrow">{copy.eyebrow}</p>
          <h2 id="quote-title">{copy.title}</h2>
          <p>{copy.body}</p>
          <QuoteTrigger
            className="button button--light"
          >
            {copy.cta}
            <span className="button__icon-slot" aria-hidden="true">
              <AppIcon className="button__icon" name="arrowRight" size={14} />
            </span>
          </QuoteTrigger>
          <small>{copy.note}</small>
        </div>
      </div>
    </section>
  );
}
