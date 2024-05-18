import { useState } from "react";

type Options = { name: string, value: JSX.Element }[]

export default function SelectTab({ options }: { options: Options }) {
    const [index, setIndex] = useState(0)

    return (
        <>
            <div>
            {options.map((option, index) => (
                <button className="m-2 p-2 hover:bg-blue-300" key={index} onClick={() => setIndex(index)}>{option.name}</button>
            ))}
            </div>
            <div>
                {options[index].value}
            </div>
        </>
    );
}
