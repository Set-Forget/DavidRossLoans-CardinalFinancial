export default function RequestAuth({user}) {
    function handleReqAuth(e) {
        e.preventDefault()
        const userEmail = user.email
        const userLastName = user.family_name
        const userFirstName = user.given_name
        const userName = user.name
        console.log(user)
    }

    return(
        <section className="flex flex-col items-center gap-4 mt-10">
            <h3 className="uppercase font-bold text-rose-600">Unauthorized user</h3>
            <p>Account {user.email} need access?</p>
            <button
                id="requestAccess"
                onClick={handleReqAuth}
                className="relative flex justify-center items-center montserrat w-60 h-[42px] bg-[#243746] text-white border border-gray-300 rounded-full shadow-md px-6 py-2 text-sm font-medium hover:bg-[#4F5664] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
                Request access
            </button>
        </section>
    )
}