export default function ShopHowItWorks() {
  const features = [
    {
      icon: (
        <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 40 40">
          <rect x="10" y="10" width="20" height="28" rx="4" stroke="black" fill="none"/>
          <circle cx="20" cy="22" r="3" stroke="black" fill="none"/>
        </svg>
      ),
      title: "WATER",
      desc: "12-20 fl oz of cold water",
    },
    {
      icon: (
        <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 40 40">
          <rect x="16" y="6" width="8" height="28" rx="4" stroke="black" fill="none"/>
          <circle cx="20" cy="22" r="3" stroke="black" fill="none"/>
        </svg>
      ),
      title: "DROP",
      desc: "Let the cube dissolve completely",
    },
    {
      icon: (
        <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 40 40">
          <rect x="6" y="20" width="28" height="10" rx="3" stroke="black" fill="none" />
          <circle cx="16" cy="25" r="2.5" stroke="black" fill="none"/>
          <circle cx="24" cy="25" r="2.5" stroke="black" fill="none"/>
        </svg>
      ),
      title: "ENJOY",
      desc: "Enjoy your fruity refreshment",
    }
  ]

  return (
    <section className="w-full py-10 flex flex-col lg:flex-row gap-8 lg:gap-0 items-center justify-center max-w-7xl mx-auto">
      <div className="flex-1 flex flex-col items-center lg:items-start max-w-xl px-6">
        <h2 className="text-3xl sm:text-4xl font-bold mb-2 tracking-tight">Water. Drop. Enjoy!</h2>
        <p className="text-base text-neutral-600 mb-7 text-center lg:text-left">A waterdrop® Microdrink is a small, sugar-free cube that adds flavour to your water in just 3 easy steps:</p>
        <div className="flex flex-col gap-7 w-full">
          {features.map(f => (
            <div key={f.title} className="flex gap-4 items-start">
              <div className="mt-0.5">{f.icon}</div>
              <div>
                <div className="font-bold mb-1 text-lg">{f.title}</div>
                <div className="text-sm text-neutral-700">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 flex items-center justify-end px-6 pb-6 lg:pb-0">
        <img src="/leather.png" alt="How it works demo" className="rounded-3xl lg:max-w-[520px] w-full object-cover" style={{maxHeight:450}} />
      </div>
    </section>
  );
}
