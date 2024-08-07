import Link from "next/link"

const infobox = ({
    heading,
    button,
    textColor,
    backgroundColor,
    children
}) => {
    return (
        <div className={` ${backgroundColor} p-6 rounded-lg shadow-md`}>
            <h2 className="text-2xl font-bold">{heading}</h2>
            <p className={` ${textColor} mt-2 mb-4`}>
                {children}
            </p>
            <Link
                href={button.link}
                className={`inline-block ${button.Color} text-white rounded-lg px-4 py-2 hover:opacity-80`}
            >
                {button.text}
            </Link>
        </div>
    )
}

export default infobox
