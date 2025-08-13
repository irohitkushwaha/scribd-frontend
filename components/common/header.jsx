// "use client";
// import { useState } from "react";
// import Link from "next/link";

// export default function Header() {
//   return (
//     <header className="text-[#0c76f8] bg-white shadow-2xl shadow-gray-900 ">
//       <nav
//         aria-label="Global"
//         className="flex px-[15px] py-[10px] lg:px-8 lg:py-2 justify-between items-center"
//       >
//         <div className="flex lg:flex">
//           <Link href="/">
//             <img
//               alt="Instagramaudiodownloader Logo"
//               src="/logo-instagramaudiodownloader.webp"
//               className="md:h-14 h-12 w-auto"
//             />
//           </Link>
//         </div>
//         {/* <div className="flex lg:hidden">
//           <button
//             type="button"
//             onClick={() => setMobileMenuOpen(true)}
//             className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-[#0c76f8]"
//           >
//             <span className="sr-only">Open main menu</span>
//             <Bars3Icon aria-hidden="true" className="size-7 text-[#0c76f8]" />
//           </button>
//         </div> */}
//         {/* <PopoverGroup className="hidden lg:flex lg:gap-x-12">
//           <Link
//             href="/digipin-to-location-address"
//             className="text-[16px] font-semibold text-[#0c76f8]"
//           >
//             DigiPin to Location
//           </Link>
//         </PopoverGroup> */}
//       </nav>
//       {/* <Dialog
//         open={mobileMenuOpen}
//         onClose={setMobileMenuOpen}
//         className="lg:hidden text-[#0c76f8]"
//       >
//         <div className="fixed inset-0 z-50m text-[#0c76f8]" />
//         <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-[#ffffff] p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 text-[#0c76f8]">
//           <div className="flex items-center justify-between">
//             <Link href="/">
//               <div className="flex items-center justify-between">
                
//                 <div className="flex items-center space-x-3">
//                   <div className="relative">
//                     <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-xl blur opacity-50"></div>
//                     <div className="relative bg-gradient-to-r from-blue-600 to-cyan-600 p-2 rounded-xl shadow-lg">
//                       <MapPin className="w-6 h-6 text-white" />
//                     </div>
//                   </div>
//                   <div>
//                     <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
//                       DigipinLocator
//                     </h1>
//                   </div>
//                 </div>
//               </div>
//             </Link>
//             <button
//               type="button"
//               onClick={() => setMobileMenuOpen(false)}
//               className="-m-2.5 rounded-md p-2.5 text-[#0c76f8]"
//             >
//               <span className="sr-only text-[#0c76f8]">Close menu</span>
//               <XMarkIcon aria-hidden="true" className="size-8 text-[#0c76f8]" />
//             </button>
//           </div>
//           <div className="mt-6 flow-root">
//             <div className="-my-6 divide-y divide-gray-500/10">
//               <div className="space-y-2 py-6">
//                 <Link
//                   href="/digipin-to-location-address"
//                   className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-[#0c76f8]"
//                   onClick={() => setMobileMenuOpen(false)}
//                 >
//                   DigiPin to Location
//                 </Link>
//               </div>
//               <div className="py-6"></div>
//             </div>
//           </div>
//         </DialogPanel>
//       </Dialog> */}
//     </header>
//   );
// }
