export default function Clouds() {
  return (
    <>
      {/* Top Cloud Group */}
      <div className="absolute top-16 left-[-200px] animate-cloudSlow z-20" style={{ animationDelay: "0s" }}>
        <div className="w-48 h-20 bg-white/40 rounded-full blur-lg absolute" />
        <div className="w-24 h-12 bg-white/30 rounded-full blur-lg absolute top-[-10px] left-6" />
        <div className="w-32 h-14 bg-white/30 rounded-full blur-lg absolute top-[5px] left-16" />
      </div>

      {/* Center Cloud Group */}
      <div className="absolute top-1/3 left-[-300px] animate-cloudFast z-20" style={{ animationDelay: "5s" }}>
        <div className="w-64 h-24 bg-white/40 rounded-full blur-xl absolute" />
        <div className="w-28 h-14 bg-white/30 rounded-full blur-lg absolute top-[-8px] left-10" />
        <div className="w-36 h-16 bg-white/30 rounded-full blur-lg absolute top-[4px] left-20" />
      </div>

    </>
  );
}
