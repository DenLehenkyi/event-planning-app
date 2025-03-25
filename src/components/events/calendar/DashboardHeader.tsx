import { DashboardHeaderProps } from "@/lib/types/types";

export default function DashboardHeader({
  userName,
  onSignOut,
}: DashboardHeaderProps) {
  return (
    <header className="relative mb-8 mt-6 px-4">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl md:text-5xl font-bold font-montserrat text-gray-700 leading-tight text-center">
          Панель додавання подій
        </h1>
        {userName && (
          <p className="text-lg md:text-xl text-gray-600 font-montserrat">
            Вітаємо, {userName}!
          </p>
        )}
      </div>

      <div className="absolute top-4 right-4">
        <button
          onClick={onSignOut}
          className="px-5 py-2.5 bg-red-600 text-white text-lg font-montserrat rounded-lg hover:bg-red-700 focus:ring-4 focus:ring-red-200 transition-all duration-200 ease-in-out shadow-sm hover:shadow-md"
        >
          Вийти
        </button>
      </div>
    </header>
  );
}
