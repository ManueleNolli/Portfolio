import { useState } from 'react'
import { Dialog as DialogPR } from 'primereact/dialog'
import { Button } from 'primereact/button'
import React from 'react'

export type DialogProps = {
  label: string
  children: React.ReactNode
}

// a text button that opens its children in a bottom dialog
export default function Dialog({ label, children }: DialogProps) {
  const [isVisible, setIsVisible] = useState(false)
  const toggleVisibility = () => setIsVisible((visible) => !visible)

  return (
    <div>
      <Button text label={label} className="text-primary-50" onClick={toggleVisibility} />
      <DialogPR header={label} className="max-w-[80%] md:max-w-[60%]" visible={isVisible} onHide={toggleVisibility} position="bottom">
        {children}
      </DialogPR>
    </div>
  )
}
