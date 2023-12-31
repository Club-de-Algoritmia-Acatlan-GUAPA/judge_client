import { Lato, Inter } from "@next/font/google"
import type { ReactNode } from "react"
import Link from "next/link"

interface TProps {
    font?: "inter" | "lato",
    type: string,
    weight?: "light" | "regular" | "bold" | "black",
    href?: string,
    color?: "blue" | "green" | "black" | "white" | "red" | "primary" | "secondary",
    children?: ReactNode,
    clickable?: boolean,
    light?: boolean,
    onClick?: () => any,
    style?: any,
    className?: string,
    onChange? : (e:any) => any,
    inputType? : string,
    sz? : "sm" | "md" 
}

const colorPick = {
    green: "#4BD37B",
    blue: "#0076ED",
    black: "#000",
    white: "#fff",
    red : "#ef4643",
    primary : "var(--font-primary-color)",
    secondary : "var(--font-secondary-color)",
}

const weightPick = {
    "light": 300,
    "regular": 500,
    "bold": 400,
    "black": 900,
}

export default function Ty({
    type,
    href,
    color = "black",
    weight = "regular",
    font = "inter",
    sz = "sm",
    children,
    style = {},
    className = "",
    inputType = "",
    clickable = false,
    onClick = undefined,
    onChange = undefined,
}: TProps) {
    let node;
    switch (type) {
        case "h1":
            node = (<h1
                className={className}
                style={{
                    ...{
                        font: "inter",
                        fontSize: "35px",
                        fontWeight: "900",
                        lineHeight: '42px',
                        color: `${colorPick[color]}`
                    }, ...style
                }}>{children}</h1>)
            break;

        case "h2":
            node = <h2
                className={className}
                style={{
                    ...{
                        font: "inter",
                        fontSize: "22px",
                        fontWeight: "700",
                        lineHeight: "27px",
                        color: `${colorPick[color]}`
                    }, ...style
                }}>{children}</h2>
            break;

        case "h3":
            node = <h3
                className={className}
                style={{
                    ...{
                        font: "inter",
                        fontSize: "18px",
                        fontWeight: "700",
                        lineHeight: "22px",
                        color: `${colorPick[color]}`
                    }, ...style
                }}>{children}</h3>
            break;
        case "h4":
            node = <h4
                className={className}
                style={{
                    ...{
                        font: "inter",
                        fontSize: "15px",
                        fontWeight: "700",
                        lineHeight: "18px",
                        color: `${colorPick[color]}`
                    }, ...style
                }}>{children}</h4>
            break;
        case "text":
            switch(sz) {

                case "md":
                    node = <p
                        className={className}
                        style={{
                            ...{
                                font: "lato",
                                fontSize: "18px",
                                fontWeight: "400",
                                lineHeight: "22px",
                                color: `${colorPick[color]}`
                            }, ...style
                        }}>{children}</p>
                case "sm":
                    node = <p
                        className={className}
                        style={{
                            ...{
                                font: "lato",
                                fontSize: "11px",
                                fontWeight: "400",
                                lineHeight: "12px",
                                color: `${colorPick[color]}`
                            }, ...style
                        }}>{children}</p>
            }
            break;

        case "subtitle":
            node = <h1 style={{
                fontSize: "33px",
                fontWeight: "900",
                color: `${colorPick[color]}`
            }}>{children}</h1>
            break;
        case "input":
            node = <input 
                type={inputType}
                style={{
                fontSize: "15px",
                fontWeight: `${weightPick[weight]}`,
                color: `${colorPick[color]}`,
                border: '1px solid black',
                borderRadius: '5px',
                padding: '5px'
            }}
                onChange={onChange}
            />
            break;
        default:
            node = <h1>k</h1>
    }
    if (!clickable) return node

    if (onClick) {
        return <a style={{ cursor: "pointer" }} onClick={() => onClick()}>{node}</a>
    }
    return (
        <Link href={`${href}`} >
            {node}
        </Link>
    );
}
