import {useContext, useState} from "react";
import '../index.css'
import gitHubLogo from "../assets/github.svg";
import {useNavigate} from "react-router-dom";
import CredContext from "./CredentialsContext.jsx";

function SignupPage() {
    const {logIn} = useContext(CredContext)
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({username: '', password: ''})
    const [loginError, setLoginError] = useState('')
    const handleChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }
    const submitSignup = async function () {
        let jsonBdy = JSON.stringify(credentials);
        const response = await fetch('/Signup', {
            headers: {
                "Content-type": "application/json"
            },
            method: "POST",
            body: jsonBdy
        })
        if (response.ok) {
            //automatically take you to page once you sign in
            logIn(credentials.username)
            navigate('/')
        } else {
            const data = await response.text();
            setLoginError(data || "Signup Failed.");
        }
    }


    return (
        <div className="flex items-center justify-center min-h-screen font-sans font-semibold">
            <div className="bg-white p-8 rounded-lg shadow-lg w-80 ">
                <div
                    className='text-center underline decoration-[#7E4181] decoration-4 decoration-solid text-decor-skip-ink'>
                    <h2 id="Word" className="text-2xl font-semibold text-center text-gray-800 mb-6">Signup</h2>
                </div>


                <form>
                    <div className="mb-4">
                        <label htmlFor="username"
                               className="block text-gray-700 text-sm font-medium mb-2">Username:</label>
                        <input type="text" id="username" name="username" onChange={handleChange} required
                               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"/>
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password"
                               className="block text-gray-700 text-sm font-medium mb-2">Password:</label>
                        <input type="password" id="password" name="password" onChange={handleChange} required
                               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"/>
                    </div>

                    <button type="button" id="signup-button" onClick={submitSignup}
                            className="w-full py-2 bg-button text-black font-semibold border-2 border-[#7E4181] rounded-md hover:bg-[#e1b6e3] active:border-[#a16aa3] active:bg-[#a16aa3] cursor-pointer">
                        Signup
                    </button>
                </form>
                <div className="mt-4 mb-4 text-center">
                    <a href='/Login' id="switch-link"
                       className="text-accent hover:text-button-hover hover:text-blue-400 text-sm">
                        Login to view your flights!
                    </a>
                </div>

                <div className="mt-4 mb-4 text-center">
                    <a href='/auth/github'>
                        <button
                            className={'w-full py-2 bg-button bg-black text-white font-semibold border border-black rounded-md hover:bg-gray-900 hover:border-gray-900 cursor-pointer active:bg-gray-600'}>
                            <span className={"flex justify-center gap-2"}> <img src={gitHubLogo} alt={"GitHub_Logo"}
                                                                                width={"30px"}/> Login with GitHub </span>
                        </button>
                    </a>
                </div>
                {
                    loginError && (
                        <div
                            className="w-full py-2 flex justify-center items-center bg-red-300 text-red-700 border-2 border-red-800 rounded-md focus:outline-none focus:ring-2 focus:ring-red-800">
                            {loginError}
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default SignupPage;