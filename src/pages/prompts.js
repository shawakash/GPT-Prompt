import React from 'react'

const Prompts = () => {
    return (
        <>
            <input type="text" placeholder='Username' className={`md:text-base border-[1px] border-slate-300 rounded-xl outline-none hover:border-blue-500 focus:border-blue-600 px-3 text-sm tracking-wide py-[1px] w-full transition-all`} spellCheck='false' />
        </>
    )
}


export async function getServerSideProps(context) {

    const { user } = context.query;
    // Return the data as props to be used in the page component
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/api/prompts`, {
        method: 'POST',
        body: JSON.stringify({ username: user })
    });
    const data = await response.json();
    console.log(data)

    return {
        props: {
            // data,
        },
    };
}

export default Prompts