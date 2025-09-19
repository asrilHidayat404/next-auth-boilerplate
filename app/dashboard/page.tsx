import { auth } from '@/lib/auth'
import React from 'react'

const DashboardPage = async () => {
  const session = await auth()

  return (
    <main className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">

        {/* Welcome Section */}
        <section className=" shadow-accent rounded-xl shadow-md p-8 mb-8">
          <div className=" flex items-center mb-6">
            <div className="p-3 rounded-lg mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold ">Chop, Chop Chumbergers</h2>
          </div>
          <p className="mb-6">
            Another bloody day to conquer, eh?
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="shadow shadow-accent p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Profil Anda</h3>
              <p className="text-sm text-blue-600">Lengkapi informasi profil untuk pengalaman yang lebih personal</p>
            </div>
            <div className="shadow shadow-accent p-4 rounded-lg">
              <h3 className="font-semibold text-purple-800 mb-2">Statistik</h3>
              <p className="text-sm text-purple-600">Lihat perkembangan dan aktivitas terkini Anda</p>
            </div>
            <div className="shadow shadow-accent p-4 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">Fitur Baru</h3>
              <p className="text-sm text-green-600">Jelajahi fitur-fitur terbaru yang telah kami siapkan</p>
            </div>
          </div>
        </section>

      </div>
    </main>
  )
}

export default DashboardPage