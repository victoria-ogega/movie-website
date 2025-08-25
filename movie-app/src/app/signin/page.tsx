"use client";
import { useState } from "react";
import Button from "../shared-components/button";
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import Link from "next/link";
function SignIn() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div>
            <div className="relative ">
                <div className="absolute inset-0">
                    <h1 className=" text-6xl mt-15 ml-140 font-bold">M<span className="text-yellow-500">00</span>VIE</h1>
                    <div>
                        <form className="bg-black w-130 h-155 m-auto mt-4 p-10 rounded-xl">
                            <div className="">
                                <h1 className="text-yellow-500 ml-40 font-bold mb-10 text-4xl">Sign In</h1>
                                <div>
                                    <input type="text" name="email" placeholder="Email or Phone Number" value={formData.email} onChange={handleInputChange}
                                        className=" border border-neutral-400 text-white rounded-md  placeholder:text-neutral-400 w-70 p-3 mb-15 ml-25" />
                                </div>
                                <div className="relative ml-5 mb-15 w-100">
                                    <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={formData.password} onChange={handleInputChange}
                                        className="border border-neutral-400 text-white rounded-md placeholder:text-neutral-400 w-70  p-3 ml-20" />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-12 top-4 text-white">
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                                <div className="ml-40">
                                    <Button
                                        buttonText={
                                            <li className="list-none" >
                                                <Link href="/Sign in" className="text-sm">Sign in</Link>
                                            </li>
                                        }
                                        variant="secondary"
                                        onClickHandler={() => alert("Click was successful")}
                                    />
                                </div>

                            </div>
                            <p className="mt-3 text-yellow-400 hover:cursor-pointer underline ml-40 mt-10">Forgot password?</p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SignIn;