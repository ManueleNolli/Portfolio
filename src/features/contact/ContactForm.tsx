import { FloatLabel } from 'primereact/floatlabel'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import useContactForm, { FieldName } from '@/features/contact/useContactForm'

const fields: { name: FieldName; label: string; multiline?: boolean }[] = [
  { name: 'name', label: 'Name' },
  { name: 'email', label: 'Email' },
  { name: 'subject', label: 'Subject' },
  { name: 'message', label: 'Message', multiline: true },
]

export default function ContactForm() {
  const { toast, values, onChange, showInvalid, isFormValid, onFormSubmit, isLoading } = useContactForm()

  return (
    <div className="space-y-8 pt-5 md:pt-2">
      <Toast ref={toast} />
      {fields.map(({ name, label, multiline }) => {
        const inputProps = { id: name, className: 'w-full', value: values[name], onChange: onChange(name), invalid: showInvalid(name) }

        return (
          <FloatLabel key={name}>
            {multiline ? <InputTextarea rows={6} {...inputProps} /> : <InputText {...inputProps} />}
            <label htmlFor={name}>{label}</label>
          </FloatLabel>
        )
      })}

      <Button
        className="text-white bg-primary-600 hover:bg-primary-700 border-primary-600 rounded-md text-lg px-4 py-3 w-full !mt-6"
        size="large"
        disabled={!isFormValid}
        onClick={onFormSubmit}
        loading={isLoading}
      >
        <div className="flex items-center justify-center w-full">Send</div>
      </Button>
    </div>
  )
}
