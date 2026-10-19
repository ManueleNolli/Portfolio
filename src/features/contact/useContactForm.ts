import React, { useRef, useState } from 'react'
import { Toast } from 'primereact/toast'
import { config } from '@/config'

export type FieldName = 'name' | 'email' | 'subject' | 'message'

const EMAIL_REGEX = /^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/
const isNotEmpty = (value: string) => value.length > 0

const validators: Record<FieldName, (value: string) => boolean> = {
  name: isNotEmpty,
  email: (value) => EMAIL_REGEX.test(value),
  subject: isNotEmpty,
  message: isNotEmpty,
}

const emptyValues: Record<FieldName, string> = { name: '', email: '', subject: '', message: '' }

export default function useContactForm() {
  const toast = useRef<Toast>(null)
  const [values, setValues] = useState(emptyValues)
  // fields are not flagged as invalid before the user starts typing
  const [isTouched, setIsTouched] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const isValid = (field: FieldName) => validators[field](values[field])
  const showInvalid = (field: FieldName) => isTouched && !isValid(field)
  const isFormValid = isTouched && (Object.keys(validators) as FieldName[]).every(isValid)

  const onChange = (field: FieldName) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((previous) => ({ ...previous, [field]: event.target.value }))
    setIsTouched(true)
  }

  const onFormSubmit = async () => {
    const { name, email, subject, message } = values
    setIsLoading(true)

    const response = await fetch(config.api.mail, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        source: config.mail.from,
        to: config.mail.to,
        subject: `New message from ${name} - ${email} - ${new Date().toLocaleString()} by manuelenolli.ch`,
        message: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
      }),
    }).catch(() => null)

    setIsLoading(false)

    if (response?.ok) {
      toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Message Sent' })
      setValues(emptyValues)
      setIsTouched(false)
    } else {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Error during sending message, please try again' })
    }
  }

  return { toast, values, onChange, showInvalid, isFormValid, onFormSubmit, isLoading }
}
