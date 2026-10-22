import { useRef, useState } from 'react';
import { Alert, Box, Button, CircularProgress, Stack, TextField } from '@mui/material';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { profile } from '../data/profile';
import { isConfigured } from '../utils/links';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const initialValues = { name: '', email: '', message: '' };

function validateField(name, value) {
  const text = value.trim();
  if (name === 'name') {
    if (!text) return 'Please enter your name.';
    if (text.length < 2) return 'Your name should be at least 2 characters.';
  }
  if (name === 'email') {
    if (!text) return 'Please enter your email address.';
    if (!EMAIL_PATTERN.test(text)) return 'Please enter a valid email address, e.g. name@example.com.';
  }
  if (name === 'message') {
    if (!text) return 'Please write a message.';
    if (text.length < 10) return 'Your message should be at least 10 characters.';
  }
  return '';
}

function validateAll(values) {
  const errors = {};
  Object.keys(values).forEach((key) => {
    const message = validateField(key, values[key]);
    if (message) errors[key] = message;
  });
  return errors;
}

/**
 * Honest contact form. Delivery depends on what you configure in data/profile.js:
 *  1. contact.formEndpoint set → POSTs JSON to that service (Formspree, Getform, Web3Forms…)
 *  2. else social.email set     → opens the visitor's email app with the message pre-filled
 *  3. else                      → validates, then tells the user the form isn't connected (it never fakes a send)
 */
export default function ContactForm() {
  const formRef = useRef(null);
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState({ type: 'idle', message: '' });

  const endpoint = isConfigured(profile.contact.formEndpoint) ? profile.contact.formEndpoint.trim() : '';
  const email = isConfigured(profile.social.email) ? profile.social.email.trim() : '';
  const submitting = status.type === 'submitting';

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    if (status.type !== 'idle' && status.type !== 'submitting') setStatus({ type: 'idle', message: '' });
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submitting) return;

    const nextErrors = validateAll(values);
    setErrors(nextErrors);
    setTouched({ name: true, email: true, message: true });

    const firstInvalid = Object.keys(nextErrors)[0];
    if (firstInvalid) {
      setStatus({ type: 'error', message: 'Please fix the highlighted fields and try again.' });
      formRef.current?.elements?.[firstInvalid]?.focus();
      return;
    }

    const payload = { name: values.name.trim(), email: values.email.trim(), message: values.message.trim() };

    if (endpoint) {
      setStatus({ type: 'submitting', message: '' });
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
        setValues(initialValues);
        setTouched({});
        setErrors({});
        setStatus({ type: 'success', message: 'Thanks! Your message was sent — I’ll get back to you soon.' });
      } catch {
        setStatus({
          type: 'error',
          message: email
            ? `Something went wrong while sending. Please try again, or email me directly at ${email}.`
            : 'Something went wrong while sending. Please check your connection and try again.',
        });
      }
      return;
    }

    if (email) {
      const subject = encodeURIComponent(`Portfolio message from ${payload.name}`);
      const body = encodeURIComponent(`${payload.message}\n\n— ${payload.name} (${payload.email})`);
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
      setStatus({
        type: 'info',
        message: `Your email app should open with the message ready to send. If nothing happens, write to ${email} directly.`,
      });
      return;
    }

    setStatus({
      type: 'warning',
      message:
        'This form isn’t connected to an email service yet, so nothing was sent. (Site owner: set contact.formEndpoint or social.email in src/data/profile.js.)',
    });
  };

  return (
    <Box component="form" ref={formRef} onSubmit={handleSubmit} noValidate aria-label="Contact form">
      <Stack spacing={2.5}>
        <TextField
          id="contact-name"
          name="name"
          label="Name"
          autoComplete="name"
          required
          fullWidth
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(errors.name)}
          helperText={errors.name || ' '}
          disabled={submitting}
          slotProps={{ htmlInput: { maxLength: 80 } }}
        />
        <TextField
          id="contact-email"
          name="email"
          type="email"
          label="Email"
          autoComplete="email"
          required
          fullWidth
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(errors.email)}
          helperText={errors.email || ' '}
          disabled={submitting}
          slotProps={{ htmlInput: { maxLength: 120 } }}
        />
        <TextField
          id="contact-message"
          name="message"
          label="Message"
          required
          fullWidth
          multiline
          minRows={5}
          value={values.message}
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(errors.message)}
          helperText={errors.message || ' '}
          disabled={submitting}
          slotProps={{ htmlInput: { maxLength: 2000 } }}
        />

        <Box aria-live="polite">
          {status.type !== 'idle' && status.type !== 'submitting' && (
            <Alert
              severity={status.type}
              variant="outlined"
              role={status.type === 'error' || status.type === 'warning' ? 'alert' : 'status'}
              sx={{ borderRadius: 3 }}
            >
              {status.message}
            </Alert>
          )}
        </Box>

        <Box>
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={submitting}
            endIcon={submitting ? <CircularProgress size={18} color="inherit" /> : <SendRoundedIcon />}
          >
            {submitting ? 'Sending…' : 'Send message'}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
