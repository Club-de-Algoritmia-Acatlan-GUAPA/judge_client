import Image from 'next/image'
const DropFiles = () => {
  const boxStyle = {
    width: '100%',
    height: '10vh',
    border: '1px solid var(--border-color)',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center',
  } as React.CSSProperties
  function handleFile(e:any) {
          console.log(e.target)
  }
  return (
    <>
        <input onChange={handleFile} type='file' id='inputCode' />
      <div style={boxStyle}>

        <Image
          width={33.65}
          height={37.39}
          src='/import_doc.svg'
          alt='import file logo'
        />

      </div>
    </>
  )
}

export default DropFiles
