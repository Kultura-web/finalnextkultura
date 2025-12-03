export default function Hero() {
  return (
    <section id="home" className="relative h-screen flex items-end overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/Rooms/IMG_20251120_145334_889.jpg"
          alt="Hotel"
          loading="eager"
          fetchPriority="high"
          className="w-full h-full object-cover transition-transform duration-[10000ms] hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative z-10 pb-24 md:pb-32 px-4 md:px-12 max-w-7xl mx-auto w-full animate-fade-in-up">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-light text-white mb-4 md:mb-6 max-w-2xl leading-tight">
          Бутик-отель в историческом центре Гродно
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-6 md:mb-8 max-w-xl font-light">
          Искусство, культура и комфорт на улице Советская, 3
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#rooms"
            className="px-6 sm:px-8 py-3 sm:py-4 bg-[#E39E14] text-gray-900 hover:bg-[#E39E14] transition-all duration-300 hover:scale-105 text-center text-sm sm:text-base font-medium"
          >
            Забронировать
          </a>
        </div>
      </div>
    </section>
  );
}