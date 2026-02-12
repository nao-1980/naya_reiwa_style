'use client';

import { useState, FormEvent } from 'react';
import styles from './Contact.module.css';
import InfoCard from '@/components/cards/InfoCard';
import { useScrollReveal } from '@/hooks/useScrollReveal';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function Contact() {
  const containerRef = useScrollReveal<HTMLDivElement>();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '送信に失敗しました');
      }

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : '送信に失敗しました');
    }
  };

  return (
    <section id="contact" className={styles.contact}>
      <div className={`${styles.contactContainer} reveal`} ref={containerRef}>
        <div className="section-header">
          <span className="section-label">Contact</span>
          <h2 className={styles.contactTitle}>まずは、お気軽にご相談ください</h2>
        </div>

        <form onSubmit={handleSubmit} className={styles.contactForm}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.formLabel}>
              お名前 <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className={styles.formInput}
              placeholder="山田 太郎"
              disabled={status === 'submitting'}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.formLabel}>
              メールアドレス <span className={styles.required}>*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className={styles.formInput}
              placeholder="example@email.com"
              disabled={status === 'submitting'}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="message" className={styles.formLabel}>
              お問い合わせ内容 <span className={styles.required}>*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              className={styles.formTextarea}
              placeholder="ご相談内容をお聞かせください"
              rows={6}
              disabled={status === 'submitting'}
            />
          </div>

          {status === 'error' && (
            <div className={styles.errorMessage}>
              <i className="fas fa-exclamation-circle"></i>
              {errorMessage}
            </div>
          )}

          {status === 'success' && (
            <div className={styles.successMessage}>
              <i className="fas fa-check-circle"></i>
              お問い合わせを送信しました。ありがとうございます。
            </div>
          )}

          <button
            type="submit"
            className={`btn btn-primary ${styles.submitBtn}`}
            disabled={status === 'submitting'}
          >
            {status === 'submitting' ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                送信中...
              </>
            ) : (
              <>
                送信する
                <i className="fas fa-paper-plane"></i>
              </>
            )}
          </button>
        </form>

        <div className={styles.contactInfoGrid}>
          <InfoCard
            icon="fa-map-marker-alt"
            iconType="location"
            label="所在地"
            text="神奈川県横浜市"
          />
          <InfoCard
            icon="fa-clock"
            iconType="time"
            label="営業時間"
            text="営業時間：10:00–18:00<br>定休日：月曜日"
          />
          <InfoCard
            icon=""
            iconType="about"
            label="About"
            text="NAYA WORKS"
            href="/about"
            isPlantIcon
          />
        </div>
      </div>
    </section>
  );
}
