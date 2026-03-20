import { redirect } from "next/navigation";
import { getSession } from "@/app/lib/session";
import LogoutButton from "@/app/components/LogoutButton";

export default async function AdminPage() {
  const user = await getSession();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-lg font-bold text-gray-800">
            ระบบสารสนเทศ มหาวิทยาลัยกาฬสินธุ์
          </h1>
          <LogoutButton />
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-10">
        <div className="bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            ข้อมูลผู้ใช้งาน
          </h2>

          <div className="flex items-center gap-5 mb-8">
            <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-bold text-blue-600">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-800">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <InfoCard label="Username" value={user.id} />
            <InfoCard label="อีเมล" value={user.email} />
            <InfoCard label="ชื่อ" value={user.name} />
          </div>
        </div>
      </main>
    </div>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50 px-5 py-4">
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
        {label}
      </p>
      <p className="text-sm font-semibold text-gray-800 break-all">{value}</p>
    </div>
  );
}
