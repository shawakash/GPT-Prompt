import Head from 'next/head'
import React, { useRef, useState } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from "antd"
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';

const Login = () => {

    const router = useRouter();

    const onFinish = async (values) => {
        const body = {
            username: values.username,
            password: values.password
        }
        console.log(body)
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/api/login`, {
            method: 'POST',
            body: JSON.stringify(body)
        });

        const jsonData = await response.json();

        if(jsonData.status == 'error') {
            toast.error(jsonData.message);
        }
        if(jsonData.status == 'success') {
            localStorage.setItem('accessToken', jsonData.result.accessToken);
            localStorage.setItem('user', JSON.stringify(jsonData.result.user));
            toast.success('Logged In');
            router.push('/');
        }
    };


    return (
        <>
            <Head>
                <title>Login  |  GPT-Prompt</title>
            </Head>
            <div className={`flex justify-center items-center h-screen`}>
                <div className="flex ">
                    <Form
                        name="normal_login"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        className={`login-form flex gap-y-3 flex-col border-2 p-4 rounded-lg shadow-lg hover:shadow-2xl tracking-wide transition-all sm:w-72 sm:h-80 md:p-8 md:w-96 md:h-full md:gap-y-5 lg:gap-y-8 `}
                        
                    >
                        <div className="head text-xl font-semibold text-center mb-3 ">Login</div>
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Username!',
                                },
                            ]}
                            className='my-1'
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Password!',
                                },
                            ]}
                            className='my-1'
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item
                            className='flex flex-row text-xs'
                        >
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>
                            {/* <div className=""> */}
                                <Link className="login-form-forgot text-xs ml-4" href="/forgotPassword">
                                    Forgot password
                                </Link>

                            {/* </div> */}
                        </Form.Item>

                        <Form.Item className=''>
                            <div className="flex gap-x-3 items-center justify-start ">
                                <button type="submit" className="login-form-button px-3 py-1 mx-2 rounded-lg text-slate-100 font-medium bg-blue-500 hover:bg-white hover:text-blue-500 hover:border-1 hover:border-blue-500  border-1 border-transparent transition-all">
                                    Log in
                                </button>
                                <div className="">
                                    Or <Link href="signup">register now!</Link>
                                </div>

                            </div>
                        </Form.Item>
                    </Form>
                </div>
            </div>
            <Toaster />
        </>
    )
}

export default Login