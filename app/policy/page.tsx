import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='p-5'>
        <Link href={'/sign-in'} className='text-sm my-2 underline'>Go Back</Link>
    <h1 className='text-2xl font-bold bg-green-600 rounded-md px-2 py-1 w-fit'>Privacy Policy</h1>
    <p className='text-xs text-zinc-400'>Effective Date:09-07-24</p>
    
    <h2 className='policy-h2 font-bold text-lg underline'>1. Introduction</h2>
    <p className='text-zinc-300'>
      Welcome to Global Chat. We are committed to protecting and respecting your privacy. 
      This Privacy Policy explains how we collect, use, and safeguard your information when you use our global chat web 
      application.
    </p>
    <h2  className='policy-h2 font-bold text-lg underline'>2. Information We Collect</h2>
    <p>
      When you use the Service, we may collect the following information:
    </p>
    <ul className='p-1 border-2 border-zinc-700 bg-gray-900'>
      <li><strong>Personal Information:</strong> Information you provide when creating an account, such as your name and email address.</li>
      <li><strong>Usage Data:</strong> Information about your interactions with the Service, including chat logs and usage patterns.</li>
    </ul>
    
    <h2  className='policy-h2 font-bold text-lg underline'>3. How We Use Your Information</h2>
    <p>
      We use the information we collect to:
    </p>
    <ul className='p-1 border-2 border-zinc-700 bg-gray-900'>
      <li>Provide, operate, and maintain the Service.</li>
      <li>Improve, personalize, and expand the Service.</li>
      <li>Understand and analyze how you use the Service.</li>
      <li>Develop new products, services, features, and functionality.</li>
    </ul>
    
    <h2  className='policy-h2 font-bold text-lg underline'>4. Sharing Your Information</h2>
    <p>
      We do not sell, trade, or otherwise transfer your personal information to outside parties except as described below:
    </p>
    <ul className='p-1 border-2 border-zinc-700 bg-gray-900'>
      <li>With service providers who assist us in operating the Service.</li>
      <li>When required by law or to protect our rights.</li>
    </ul>
    
    <h2  className='policy-h2 font-bold text-lg underline'>5. Security</h2>
    <p>
      We use administrative, technical, and physical measures to safeguard your personal information against unauthorized access, theft, and loss.
    </p>
    
    <h2  className='policy-h2 font-bold text-lg underline'>6. Your Choices</h2>
    <p>
      You can choose not to provide certain information, but this may limit your ability to use certain features of the Service. You can also contact us to update or delete your personal information.
    </p>
    
    <h2  className='policy-h2 font-bold text-lg  bg-red-800 w-fit px-1' >7. Children's Privacy</h2>
    <p>
      The Service is not intended for individuals under the age of 13. We do not knowingly collect personal information from children under 13.
    </p>
    
    <h2  className='policy-h2 font-bold text-lg underline'>8. Changes to This Privacy Policy</h2>
    <p>
      We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
    </p>
    
    <h2  className='policy-h2 font-bold text-lg underline'>9. Contact Us</h2>
    <p>
      If you have any questions about this Privacy Policy, please contact us at <a href='mailto:musheeran165@gmail.com' className=' bg-red-500 px-1'>developer email</a>.
    </p>
    
    <h2  className='policy-h2 font-bold text-lg px-1 bg-yellow-500 w-fit'>10. Disclaimer</h2>
    <p>
      The company is not responsible for anything happening in the chat or with users. Users are solely responsible for their interactions on the Service.
    </p>
    <p>
      Additionally, we are not responsible for any cyber attacks, account hacks, or any other issues related to account security. Users are encouraged to use strong passwords and take necessary precautions to protect their accounts.
    </p>
    <p className='w-full text-center text-zinc-600'> &copy; global chat</p>
  </div>
  )
}

export default page