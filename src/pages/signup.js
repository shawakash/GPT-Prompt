import styles from '@/utils/styles'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useRef } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { CiPhone, CiUser } from 'react-icons/ci'
import { HiDevicePhoneMobile, HiOutlineMail } from 'react-icons/hi'
import { RiLockPasswordLine } from 'react-icons/ri'


const SignUp = () => {

    const router = useRouter();

    const nameRef = useRef('');
    const userRef = useRef('');
    const passRef = useRef('');
    const cpassRef = useRef('');
    const emailRef = useRef('');
    const phoneRef = useRef('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (nameRef.current.value == '') {
            toast.error('Name is required');
        } else if (userRef.current.value == '') {
            toast.error('Username is required');
        } else if (emailRef.current.value == '') {
            toast.error('Email is required');
        } else if (passRef.current.value == '') {
            toast.error('Please Enter Your Password');
        } else if (cpassRef.current.value == '') {
            toast.error('Re-Enter Your Password');
        }
        else {
            if (cpassRef.current.value !== passRef.current.value) {
                toast.error(`Passwords Doesn't matches :()`);
            }
            else {
                const body = {
                    name: nameRef.current.value,
                    username: userRef.current.value,
                    phone: phoneRef.current.value,
                    password: cpassRef.current.value,
                    email: emailRef.current.value,
                }
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/api/signup`, {
                    method: 'POST',
                    body: JSON.stringify(body)
                });

                const jsonData = await response.json();
                if(jsonData.statusCode == 500) {
                    toast.error('Internal Server Error :(');
                } 
                if(jsonData.status == 'error') {
                    toast.error(jsonData.message);
                }
                if(jsonData.status == 'success') {
                    const user = jsonData.result.user;
                    localStorage.setItem('user', {
                        name: user.name,
                        email: user.email,
                        username: user.username,
                    });
                    localStorage.setItem('accessToken', jsonData.result.accessToken);
                    toast.success(`Welocome ${user.name.split(' ')[0]}`);
                    setTimeout(() => {router.push(`/?${user.username}`)}, 1000);
                }
            }

        }

    }

    return (
        <>
            <section className={`flex items-center justify-center h-screen bg-slate-100`}>
                <div className="form ">
                    <form
                        onSubmit={handleSubmit}
                        className={`login-form flex gap-y-3 flex-col border-2 bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl tracking-wide transition-all  sm:w-72 sm:h-[400px] md:p-8 md:w-96 md:h-full  md:gap-y-5 lg:gap-y-8 `}
                    >
                        <div className={`head text-lg sm:text-xl md:text-2xl  font-semibold text-center mb-3`}>SignUp</div>
                        <div className="flex flex-col sm:w-64 md:w-full w-52 gap-y-4 sm:px-4 sm:gap-y-6 h-fit px-2 text-slate-500">
                            <div className="name flex relative flex-col">
                                <CiUser className='absolute top-1 right-3' />
                                <input ref={nameRef} type="text" name='name' required placeholder='Name' className={`md:text-base border-[1px] border-slate-300 rounded-xl outline-none hover:border-blue-500 focus:border-blue-600 px-3 text-sm tracking-wide py-[1px] w-full transition-all`} spellCheck='false' />
                            </div>
                            <div className="email flex relative flex-col">
                                <HiOutlineMail className='absolute top-1 right-3' />
                                <input ref={emailRef} type="email" required placeholder='Email' className={`md:text-base border-[1px] border-slate-300 rounded-xl outline-none hover:border-blue-500 focus:border-blue-600 px-3 text-sm tracking-wide py-[1px] w-full transition-all`} spellCheck='false' />
                            </div>
                            <div className="phone flex relative flex-col">
                                <CiPhone className='absolute top-1 right-3' />
                                <input ref={phoneRef} type="number" placeholder='Phone Number' className={`md:text-base border-[1px] border-slate-300 rounded-xl outline-none hover:border-blue-500 focus:border-blue-600 px-3 text-sm tracking-wide py-[1px] w-full transition-all`} spellCheck='false' />
                            </div>
                            <div className="username flex relative flex-col">
                                <CiUser className='absolute top-1 right-3' />
                                <input ref={userRef} type="text" required placeholder='Username' className={`md:text-base border-[1px] border-slate-300 rounded-xl outline-none hover:border-blue-500 focus:border-blue-600 px-3 text-sm tracking-wide py-[1px] w-full transition-all`} spellCheck='false' />
                            </div>
                            <div className="pass flex relative flex-col gap-y-3">
                                <div className="password">
                                    <RiLockPasswordLine className='absolute top-1 right-3' />
                                    <input ref={passRef} type="password" required placeholder='Password' className={`md:text-base border-[1px] border-slate-300 rounded-xl outline-none hover:border-blue-500 focus:border-blue-600 px-3 text-sm tracking-wide py-[1px] w-full transition-all`} spellCheck='false' />
                                </div>
                                <div className="confirmpassword flex relative flex-col">
                                    <RiLockPasswordLine className='absolute top-1 right-3' />
                                    <input ref={cpassRef} type="password" required placeholder='Confirm Password' className={`md:text-base border-[1px] border-slate-300 rounded-xl outline-none hover:border-blue-500 focus:border-blue-600 px-3 text-sm tracking-wide py-[1px] w-full transition-all`} spellCheck='false' />
                                </div>
                            </div>


                        </div>
                        <div className="submit flex gap-x-8 px-3 items-center my-2">
                            <button type="submit" onClick={handleSubmit} className="login-form-button px-3 py-1 mx-2 rounded-lg text-sm sm:text-base text-slate-100 font-medium bg-blue-500 hover:bg-white hover:text-blue-500 hover:border-1 hover:border-blue-500  border-1 border-transparent transition-all">SignUp</button>
                            <Link href="/login">Login ?</Link>
                        </div>
                    </form>
                </div>
            </section>
            <Toaster />

        </>
    )
}

export default SignUp