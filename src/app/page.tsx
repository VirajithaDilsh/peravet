"use client";
import Image from 'next/image'
import { useRouter } from 'next/navigation';

export default function Home(){
    const router = useRouter();

  return (
      <main className="font-sans">
        <div
            className="bg-cover bg-top min-h-screen opacity-90"
            style={{ backgroundImage: "url('/cow.png')" }}
        >
          {/* Header */}
          <section id={"home"} className="flex justify-between items-center p-6 my-0">
              <div className="flex-shrink-100"> <Image src="/logo.png" alt="logo" width={100} height={30} className="rounded-lg"/></div>
                  <div className="flex items-center space-x-6">
                      {/* Navigation */}
                      <nav className="flex space-x-6">
                          <a href="#home" className="  text-black font-bold">Home</a>
                          <a href="#features" className=" text-shadow text-black font-bold">Features</a>
                          <a href="#about" className="text-shadow text-black font-bold">About</a>
                          <a href="#contact" className="text-shadow text-black font-bold">Contact</a>
                      </nav>

                      {/* Buttons */}
                      <div className="flex gap-x-3">
                          <button onClick={() => router.push('/login')} className="text-black border border-black font-bold px-6 py-2 rounded-xl">Login</button>
                          <button onClick={() => router.push('/register')} className="bg-green-600 text-white  font-bold px-4 py-2 rounded-xl">Register</button>
                      </div>
                  </div>

          </section>

          {/* Hero */}
          <section className="flex flex-col md:flex-row items-center justify-between p-10">
              <div className="absolute bottom-30 left-20 max-w-xl">
              <h1 className="text-5xl font-bold mb-4">Manage Your Farm <br/>Smarter</h1>
              <p className="text-base mb-6">This website is designed to help veterinary doctors and farm staff manage animals more easily.<br/>
                  You can view animal details, track vaccinations, monitor treatments, and improve communication — all in one place.</p>
              <button onClick={() => router.push('/login')} className="bg-green-600 text-white px-6 py-3 rounded-xl" >Get Started</button>
            </div>
          </section>
        </div>


        {/* Features */}
          <div className={"bg-white"}>
              <section id={"features"} className="p-10 text-center">
                  <h2 className="text-2xl font-bold text-black mt-10 mb-10">Features</h2>
                  <div className="grid md:grid-cols-3 gap-6 mt-10 mb-30">
                      <div className={"flex flex-col items-center text-center  text-black hover:bg-gray-100 hover:rounded-3xl  hover:scale-105"}>
                          <Image src="/features/Activity.svg" alt="Activity" width={93} height={93} className="rounded-lg"/>
                          <p className="text-xl font-semibold mt-4">Centralized Platform</p>
                          <p>Connect vets & farmers <br/> for better care.</p>
                      </div>
                      <div className={"flex flex-col items-center text-center text-black hover:bg-gray-100 hover:rounded-3xl  hover:scale-105"}>
                          <Image src="/features/Heart.svg" alt="Heart" width={93} height={93} className="rounded-lg"/>
                          <p className="text-xl font-semibold mt-4">Improves Animal Care</p>
                          <p>Veterinary tracking and animal <br/>history records.</p>
                      </div>
                      <div className={"flex flex-col items-center text-center text-black hover:bg-gray-100 hover:rounded-3xl  hover:scale-105"}>
                          <Image src="/features/Work.svg" alt="Work" width={93} height={93} className="rounded-lg"/>
                          <p className="text-xl font-semibold mt-4">Enhanced Tech Skills</p>
                          <p>Empower users to learn modern<br/> farm management.</p>
                      </div>
                  </div>
              </section>
          </div>


        {/* About */}
          <div className={"bg-[#E7E7E7]"}>
              <section id={"about"} className=" p-10 text-black">
                  <h2 className="text-2xl font-bold mt-10 mb-10">About Us</h2>
                  <p className="text-xl mb-10">
                      Farm Management System is a simple and smart platform designed to help veterinary doctors and farm staff manage animal information easily.<br/>
                      We help track animal health, vaccinations, treatments, and improve communication between doctors and farm workers.<br/>
                      Our goal is to make animal care better and more organized.
                  </p>
              </section>
          </div>

        {/* Contact Us */}
      <div className={"bg-[#5FBFCA]"}>
        <section id={"contact"} className="p-10 grid md:grid-cols-2 gap-0">
          <div>
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <form className="space-y-4">
                <label>Name</label><input className="border p-2 w-full" placeholder="Name" />
                <input className="border p-2 w-full" placeholder="Email" />
                <textarea className="border p-2 w-full" rows={4} placeholder="Type Message here"></textarea>
              <button className="bg-[#20B15A] text-white px-4 py-2 rounded">Submit</button>
            </form>
          </div>
                <div className="flex items-center justify-center mt-30 mb-30 ">
                    <Image
                        src="/Tech support call on the computer.png"
                        alt="Tech"
                        width={407}
                        height={374}
                        className="rounded-lg"
                    />
                </div>
        </section>
      </div>

        {/* Footer */}
          <footer className="bg-green-500 text-black py-10 px-8">
              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-50">
                  {/* About Section */}
                  <div>
                      <p className="mb-4">
                          Some footer text about the Agency. Just a little description to help people understand you better
                      </p>
                      <div className="flex space-x-4 mb-4">
                          <a href="#" className={" hover:scale-120"}> <Image src="/social/fb.svg" alt="facebook" width={40} height={40} className="rounded-lg"/></a>
                          <a href="#" className={" hover:scale-120"}> <Image src="/social/twitter.svg" alt="twitter" width={40} height={40} className="rounded-lg"/></a>
                          <a href="#" className={" hover:scale-120"}> <Image src="/social/linkin.svg" alt="linkin" width={40} height={40} className="rounded-lg"/></a>
                          <a href="#" className={" hover:scale-120"}> <Image src="/social/insta.svg" alt="instagram" width={40} height={40} className="rounded-lg"/></a>
                      </div>
                      <p>Copyright Team codeX 2025</p>
                  </div>

                  {/* Quick Links */}
                  <div>
                      <h3 className="font-bold mb-4">Quick Links</h3>
                      <ul className="space-y-2">
                          <li><a href="#home" className="hover:underline">Home</a></li>
                          <li><a href="#features" className="hover:underline">Features</a></li>
                          <li><a href="#about" className="hover:underline">About Us</a></li>
                          <li><a href="#contact" className="hover:underline">Contact Us</a></li>
                      </ul>
                  </div>

                  {/* Address */}
                  <div>
                      <h3 className="font-bold mb-4">Address</h3>
                      <p>Design Agency Head Office.<br />
                          Airport Road<br />
                          United Arab Emirate
                      </p>
                  </div>
              </div>
          </footer>

      </main>
  )
}
