export default function Footer() {
    return (
        <div className="bg-gradient-to-bl from-green-300 via-blue-500 to-purple-600 absolute bottom-0 w-full ">
            <div className="container mx-auto text-center pt-4">
                <p className="text-white text-sm">
                    © 2023 Your Company. All rights reserved.
                </p>
                <div className="flex justify-center space-x-4 mt-4">
                    <a href="#" className="text-white hover:text-gray-400">Home</a>
                    <a href="#" className="text-white hover:text-gray-400">About Us</a>
                    <a href="#" className="text-white hover:text-gray-400">Services</a>
                    <a href="#" className="text-white hover:text-gray-400">Contact</a>
                </div>
            </div>
        </div>
    )
}
