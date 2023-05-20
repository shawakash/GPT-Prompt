import styles from '@/utils/styles'
import Link from 'next/link'
import React from 'react'
import { CiPhone, CiUser } from 'react-icons/ci'
import { HiDevicePhoneMobile, HiOutlineMail  } from 'react-icons/hi'
import { RiLockPasswordLine  } from 'react-icons/ri'


const SignUp = () => {
    return (
        <>
            <section className={`flex items-center justify-center h-screen bg-slate-100`}>
                <div className="form ">
                    <form
                        className={`login-form flex gap-y-3 flex-col border-2 bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl tracking-wide transition-all  sm:w-72 sm:h-[400px] md:p-8 md:w-96 md:h-full  md:gap-y-5 lg:gap-y-8 `}
                    >
                        <div className={`head text-lg sm:text-xl md:text-2xl  font-semibold text-center mb-3`}>SignUp</div>
                        <div className="flex flex-col sm:w-64 md:w-full w-52 gap-y-4 sm:px-4 sm:gap-y-6 h-fit px-2">
                            <div className="name flex relative flex-col">
                                <CiUser className='absolute top-1 right-3'/>
                                <input type="text" name='name' placeholder='Name' className={`md:text-base border-[1px] border-slate-300 rounded-xl outline-none hover:border-blue-500 focus:border-blue-600 px-3 text-sm tracking-wide py-[1px] w-full transition-all`} spellCheck='false'/>
                            </div>
                            <div className="email flex relative flex-col">
                                <HiOutlineMail className='absolute top-1 right-3'/>
                                <input type="email" placeholder='Email' className={`md:text-base border-[1px] border-slate-300 rounded-xl outline-none hover:border-blue-500 focus:border-blue-600 px-3 text-sm tracking-wide py-[1px] w-full transition-all`} spellCheck='false'/>
                            </div>
                            <div className="phone flex relative flex-col">
                                <CiPhone className='absolute top-1 right-3'/>
                                <input type="number" placeholder='Phone Number' className={`md:text-base border-[1px] border-slate-300 rounded-xl outline-none hover:border-blue-500 focus:border-blue-600 px-3 text-sm tracking-wide py-[1px] w-full transition-all`} spellCheck='false'/>
                            </div>
                            <div className="username flex relative flex-col">
                            <CiUser className='absolute top-1 right-3'/>
                                <input type="text" placeholder='username' className={`md:text-base border-[1px] border-slate-300 rounded-xl outline-none hover:border-blue-500 focus:border-blue-600 px-3 text-sm tracking-wide py-[1px] w-full transition-all`} spellCheck='false'/>
                            </div>
                            <div className="pass flex relative flex-col gap-y-3">
                                <div className="password">
                                    <RiLockPasswordLine className='absolute top-1 right-3'/>
                                    <input type="password" placeholder='Password' className={`md:text-base border-[1px] border-slate-300 rounded-xl outline-none hover:border-blue-500 focus:border-blue-600 px-3 text-sm tracking-wide py-[1px] w-full transition-all`} spellCheck='false'/>
                                </div>
                                <div className="confirmpassword flex relative flex-col">
                                    <RiLockPasswordLine className='absolute top-1 right-3'/>
                                    <input type="password" placeholder='Confirm Password' className={`md:text-base border-[1px] border-slate-300 rounded-xl outline-none hover:border-blue-500 focus:border-blue-600 px-3 text-sm tracking-wide py-[1px] w-full transition-all`} spellCheck='false'/>
                                </div>
                            </div>


                        </div>
                        <div className="submit flex gap-x-8 px-3 items-center my-2">
                            <button type="submit" className="login-form-button px-3 py-1 mx-2 rounded-lg text-sm sm:text-base text-slate-100 font-medium bg-blue-500 hover:bg-white hover:text-blue-500 hover:border-1 hover:border-blue-500  border-1 border-transparent transition-all">SignUp</button>
                            <Link href="/login">Login ?</Link>
                        </div>
                    </form>
                </div>
            </section>

        </>
    )
}

export default SignUp