import { useState } from 'react'
export const SelectionBar = ({
  elements,
  backgroundColor,
  onSelection,
  selected
}: {
  elements: string[]
  backgroundColor: string
  onSelection: (e: any) => void
  selected: string
}) => {
  const ulStyle = {
    all: 'unset',
    display: 'flex',
    backgroundColor,
    width: '100%',
    gap: '40px',
    borderBottom: '1px solid var(--border-color)',
  } as React.CSSProperties
  //const [_selected, setSelected] = useState<string>(selected)
  console.log('Seleccionad' ,selected)
  //console.log('Selected' ,_selected)
  function handleSelection(el: string) {
    //setSelected(el)
    onSelection(el)
  }
  console.log(selected)
  return (
    <>
      <ul style={ulStyle}>
        {elements.map((el) => (
          <BarItem
            key={el}
            selected={el == selected}
            element={el}
            onClick={handleSelection}
          />
        ))}
      </ul>
    </>
  )
}

export const BarItem = ({
  element,
  onClick,
  selected,
}: {
  element: string
  onClick: (a: any) => void
  selected: boolean
}) => {
  const liStyle = {
    all: 'unset',
    fontFamily: 'inter',
    fontSize: '20px',
    fontWeight: '700',
    color: selected ? 'var(--blue-primary)' : 'var(--font-primary-color)',
    cursor: 'pointer',
  } as React.CSSProperties
  console.log(selected, element)
  return (
    <>
      <li style={liStyle} key={element}>
        <a
          key={element}
          className={selected ? 'problemBarItemSelected' : ''}
          onClick={(_) => onClick(element)}
        >
          {element}
        </a>
      </li>
    </>
  )
}
