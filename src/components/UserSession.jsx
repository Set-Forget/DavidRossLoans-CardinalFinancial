export default function UserSession({user, setUser}) {

    function logout(event) {
        event.preventDefault()
        const logOutURL = 'https://accounts.google.com/Logout'
        const changeAccountURL = 'https://accounts.google.com/AccountChooser'
        const projectURL = "https://script.google.com/macros/s/AKfycby8oSIvGn32RGAS5nd6-l9r9hI4FQq7pxxowtYJ0y_VsieMiETXeHRKVPR_3tZDtl4R/exec"
        window.open(logOutURL + '?continue=' + projectURL, '_blank');
        setUser({
            email:null
          })
      }

    return (
        <article className="text-center text-sm flex place-content-center gap-2">
            <p>Logged In as <span className="font-bold"> {user.email} </span></p>
            <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={logout}>log out</button>
        </article>
    )
}