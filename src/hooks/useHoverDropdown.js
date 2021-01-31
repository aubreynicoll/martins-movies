import { useState } from 'react'

const useHoverDropdown = () => {
  const [show, setShow] = useState(false)

  const onMouseEnter = (event) => {
    setShow(true)
  }

  const onMouseLeave = (event) => {
    setShow(false)
  }

  return {
    show,
    onMouseEnter,
    onMouseLeave
  }
}

export default useHoverDropdown