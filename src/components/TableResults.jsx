export default function WebScrappingResult({searchItem, companies, webInfo }) {
    return(
        <>
        <p>Subject Property Address: {searchItem}</p>
        <div className="flex flex-wrap place-content-center gap-8 w-full">
        {companies.map(
            (items, i) => {
            const itemInfo = webInfo.find(web => web.websiteName == items.title)
            const value = itemInfo ? itemInfo?.estimatedValue ? itemInfo?.estimatedValue: "0" : "0"
            return <CardForValues title={items.title} img={items.img} value={ value } key={i}/>}
        )}
        </div>
        </>
    )
}

function CardForValues({title, img, value}) {
    const formatted = parseFloat(value).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
    return(
        <div className="bg-gray-100 dark:bg-slate-700 border-solid border-2 border-sky-500 p-4 rounded min-w-min w-48 h-48 flex flex-col relative items-end justify-between">
        <img src={img} alt={title} className="self-start justify-self-start h-12"/>
        <p className="font-semibold ">{formatted}</p>
        </div>
    )
}