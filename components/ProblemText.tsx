export const SubTitle = ({ text }: { text: string }) => {
    const style = {
        fontFamily: "'Inter', 'sans-serif'",
        fontWeight: '700',
        fontSize: '25px',
        lineHeight: '30.26px',
        color: 'var(--font-tertiary-color)',
    }
    const divStyle = {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    } as React.CSSProperties
    return (
        <>
            <div style={divStyle}>
                <h2 style={style}>{text}</h2>
                <hr />
            </div>
        </>
    )
}
export const Title = ({ text }: { text: string }) => {
    const style = {
        fontFamily: "'Inter', 'sans-serif'",
        fontWeight: '900',
        fontSize: '30px',
        lineHeight: '36.31px',
        color: 'var(--font-tertiary-color)',
    }
    const divStyle = {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    } as React.CSSProperties
    return (
        <>
            <div style={divStyle}>
                <h2 style={style}>{text}</h2>
            </div>
        </>
    )
}

export const Metadata = ({
    timeLimit,
    memoryLimit,
}: {
    timeLimit: number
    memoryLimit: number
}) => {
    const subTitleStyle = {
        fontFamily: "'Inter', 'sans-serif'",
        fontWeight: '300',
        fontSize: '15px',
        lineHeight: '24.2px',
        color: 'var(--font-primary-color)',
    }
    const subTitleStrongStyle = {
        fontFamily: "'Inter', 'sans-serif'",
        fontWeight: '700',
        fontSize: '15px',
        lineHeight: '24.2px',
        color: 'var(--font-tertiary-color)',
    }
    const divStyle = {
        display: 'flex',
        flexDirection: 'row',
        gap: '10px',
    } as React.CSSProperties
    return (
        <>
            <div style={divStyle}>
                <h3 style={subTitleStyle}>
                    Tiempo Limite:{' '}
                    <strong style={subTitleStrongStyle}>{timeLimit.toString()} s</strong>
                </h3>
                <h3 style={subTitleStyle}>
                    Limite de memoria:{' '}
                    <strong style={subTitleStrongStyle}>
                        {memoryLimit.toString()} MB
                    </strong>
                </h3>
            </div>
        </>
    )
}
