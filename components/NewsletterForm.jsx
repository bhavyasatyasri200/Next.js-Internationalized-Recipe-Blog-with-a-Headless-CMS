import { useState } from 'react';
// 
import ReactHookForm from 'react-hook-form';
const { useForm } = ReactHookForm;
import { useTranslation } from 'next-i18next';

export default function NewsletterForm() {
  const { t } = useTranslation('common');
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Simulate submission - no real backend needed
    console.log('Newsletter subscription:', data.email);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-sage-400/10 border border-sage-400/30 rounded-2xl p-8 text-center">
        <div className="text-4xl mb-3">✉️</div>
        <p data-testid="newsletter-success" className="text-sage-600 font-semibold text-lg">
          {t('newsletter_success')}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-cream-100 border border-amber-200 rounded-2xl p-8">
      <h3 className="font-display text-2xl font-bold text-espresso-800 mb-2">
        {t('newsletter_title')}
      </h3>
      <p className="text-gray-500 mb-6 text-sm">{t('newsletter_subtitle')}</p>

      <form
        data-testid="newsletter-form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <input
              data-testid="newsletter-email"
              type="email"
              placeholder={t('newsletter_email_placeholder')}
              className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-400 transition-all ${
                errors.email
                  ? 'border-red-400 bg-red-50'
                  : 'border-amber-200 bg-white'
              }`}
              {...register('email', {
                required: t('newsletter_error_required'),
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: t('newsletter_error_invalid'),
                },
              })}
            />
            {errors.email && (
              <p
                data-testid="newsletter-error"
                className="mt-1.5 text-xs text-red-500"
              >
                {errors.email.message}
              </p>
            )}
          </div>

          <button
            data-testid="newsletter-submit"
            type="submit"
            className="px-6 py-2.5 bg-terracotta-500 hover:bg-terracotta-600 text-white font-semibold rounded-xl text-sm transition-colors whitespace-nowrap"
          >
            {t('newsletter_submit')}
          </button>
        </div>
      </form>
    </div>
  );
}