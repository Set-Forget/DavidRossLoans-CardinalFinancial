import { useState, useEffect } from "react"

export default function WebScrappingResult({searchItem, companies, avg, setEstimateValue }) {
    return(
        <>
        <div className="flex gap-2">
            <h4>Subject Property Address:</h4>
            <CopyToClip text={searchItem} />
        </div>
        <div className="flex flex-wrap place-content-center gap-8 w-full">
        {companies.map(
            (items, i) => {
            return <CardForValues 
             title={items.title} 
             img={items.img} 
             value={ items.estimatedValue } 
             link={items.link} 
             setEstimateValue={setEstimateValue}
             key={i}/>}
        )}
        </div>
        <p>Average: <span>{avg.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span></p>
        </>
    )
}

function CardForValues({title, img, value, link, setEstimateValue}) {
    const [editValue, setEditValue] = useState(value.toString());
    const [ isEditable, setIsEditable ] = useState(false)

    useEffect(() => {
        setEditValue(value.toString());
    }, [value]);

    const handleBlur = () => {
        const input = editValue.replace(/,/g, '')
        const numericValue = parseFloat(input) || 0;
        setEstimateValue(title, numericValue);
        setEditValue(numericValue.toString());
    };

    const handleChange = (e) => {
        let newValue = e.target.value
        setEditValue(newValue);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            setIsEditable(false)
            e.target.blur();
        }
    };

    return(
        <div className="relative w-48 h-48">
            <a href={link} target="_blank" >
                <div className="bg-gray-100 dark:bg-slate-700 border-solid border-2 border-[#00B1A4] p-4 rounded min-w-min w-48 h-48 flex flex-col relative items-end justify-between">
                <img src={img} alt={title} className="self-start justify-self-start h-12"/>
                </div>
            </a>
            <p className="font-semibold absolute bottom-2 right-2 flex flex-row gap-2 justify-end items-center"> 
            $ 
            <input
                className={`bg-transparent py-0 m-0 w-2/3 text-right disabled:border-none`}
                value={editValue}
                disabled={!isEditable}
                onBlur={handleBlur}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
            <MaterialSymbolsEdit setIsEditable={setIsEditable} isEditable={isEditable} />
            </p>
        </div>
    )
}

function MaterialSymbolsEdit(props) {
    const setIsEditable = props.setIsEditable
    const isEditable = props.isEditable

    return (
      <svg 
       xmlns="http://www.w3.org/2000/svg" 
       className="cursor-pointer"
       width="1em" 
       height="1em" 
       viewBox="0 0 24 24" 
       onClick={()=>setIsEditable(!isEditable)}
       ><path fill="currentColor" d="M3 21v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15q.4 0 .775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.138.763t-.437.662L7.25 21H3ZM17.6 7.8L19 6.4L17.6 5l-1.4 1.4l1.4 1.4Z"/></svg>
    )
}

function CopyToClip({text}) {
    const [isCopied, setIsCopied] = useState(false);
    
    const handleCopyClick = () => {
        navigator.clipboard.writeText(text)
          .then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000)
          })
          .catch((error) => {
            console.error('Error trying to copy the text: ', error);
          });
      };

    return (
        <p onClick={handleCopyClick} className="cursor-pointer flex items-center">
            {text}
            <span className="relative flex">
                <span className={`${isCopied ? "" : "hidden"} absolute -top-8 -left-4 text-sm bg-slate-600 p-1 rounded-lg`}>Copied!</span>
                <ion-icon name="clipboard-outline" size="small"></ion-icon>
            </span>
        </p>
    );
}