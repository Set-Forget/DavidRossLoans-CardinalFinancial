import { useState } from "react"

export default function WebScrappingResult({searchItem, companies, webInfo, avg }) {
    return(
        <>
        <div className="flex gap-2">
            <h4>Subject Property Address:</h4>
            <CopyToClip text={searchItem} />
        </div>
        <div className="flex flex-wrap place-content-center gap-8 w-full">
        {companies.map(
            (items, i) => {
            const itemInfo = webInfo.find(web => web.websiteName == items.title)
            const value = itemInfo ? itemInfo?.estimatedValue ? itemInfo?.estimatedValue: "0" : "0"
            return <CardForValues title={items.title} img={items.img} value={ value } link={items.link} key={i}/>}
        )}
        </div>
        <p>Average: <span>{avg.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span></p>
        </>
    )
}

function CardForValues({title, img, value, link}) {
    const formatted = parseFloat(value).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
    return(
        <a href={link} target="_blank">
            <div className="bg-gray-100 dark:bg-slate-700 border-solid border-2 border-[#00B1A4] p-4 rounded min-w-min w-48 h-48 flex flex-col relative items-end justify-between">
            <img src={img} alt={title} className="self-start justify-self-start h-12"/>
            <p className="font-semibold ">{formatted}</p>
            </div>
        </a>
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