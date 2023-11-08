export default function RequestAuth({user, setLoading, reqSend, setReqSend}) {

    function handleReqAuth(e) {
        e.preventDefault()
        setLoading(true)
        const userEmail = user.email
        const userName = user.name
        let url = `https://script.google.com/macros/s/AKfycbwOyHzbGCIfZ5PmHh8vs8PdNUxBUWqELB2lwuVNMvRv3Py6ipOXQe2d9Lq8e1-ONWqo/exec?action=req&&userEmail=${encodeURI(userEmail)}&&userName=${encodeURI(userName)}`
        fetch(url).then(res => {
            setReqSend(true)
            setLoading(false)

            setTimeout(() => {
                setReqSend(false)
            }, 5000);

        })
        .catch(err => {
            console.error(err)
            setLoading(false)
        })
    }

    return(
        <section className="flex flex-col items-center gap-4 mt-10">
            {
                reqSend ? 
                <>
                <p className="text-green-500">Request send</p>
                </>:
                <>
                <h3 className="uppercase font-bold text-rose-600">Unauthorized user</h3>
                <p>Account {user.email} need access?</p>
                <button
                    id="requestAccess"
                    onClick={handleReqAuth}
                    className="relative flex justify-center items-center montserrat w-60 h-[42px] bg-[#243746] text-white border border-gray-300 rounded-full shadow-md px-6 py-2 text-sm font-medium hover:bg-[#4F5664] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                    Request access
                </button>
                </>
            }
        </section>
    )
}