import Swatch from "./Swatch";

export default function Hero() {
  return (
    <section id="top" className="max-w-7xl mx-auto px-6 md:px-10 pt-14 md:pt-24 pb-16 md:pb-24">
      <div className="grid md:grid-cols-12 gap-8 items-end">
        <div className="md:col-span-7 fade-in">
          <p className="text-xs tracked text-oxblood mb-5">RESORT COLLECTION — NO. 24</p>
          <h1 className="font-serif font-light leading-[0.95] text-[15vw] md:text-[6.5vw] tracking-tight">
            Quiet
            <br />
            opulence.
          </h1>
        </div>
        <div className="md:col-span-5 md:pb-3">
          <p className="text-stone text-sm leading-relaxed max-w-xs ml-auto">
            Twelve pieces, cut from the world's finest mills, made to be worn for decades rather than seasons.
          </p>
          <a
            href="#catalogue"
            className="inline-block mt-6 text-xs tracked border-b border-ink pb-1 hover:text-oxblood hover:border-oxblood transition-colors"
          >
            VIEW THE COLLECTION
          </a>
        </div>
      </div>
      <div className="mt-14 md:mt-20 h-[40vh] md:h-[55vh] w-full overflow-hidden">
        <Swatch
          hex="#3a342c"
          name="Resort collection model, full look"
          src="https://images.unsplash.com/photo-1747171053296-84c4e8015b24?fm=jpg&q=80&w=1600&h=900&fit=crop&auto=format"
          className="opacity-90"
        />
      </div>
    </section>
  );
}
