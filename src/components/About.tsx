export default function About() {
  return (
    <section id="about" className="border-t border-line py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <p className="text-xs tracked text-oxblood mb-4">THE ATELIER</p>
          <h2 className="font-serif text-4xl md:text-5xl leading-tight">Made to outlast the trend cycle.</h2>
        </div>
        <div className="md:col-span-7 md:col-start-6 text-stone text-sm leading-relaxed space-y-4 self-end">
          <p>
            Every Rhea piece is cut in small runs, in a single workshop, by a team that has worked together for over
            a decade. We choose fabric mills the way others choose collaborators: slowly, and for the long term.
          </p>
          <p>
            There is no markdown calendar here. A coat from our first season is still in production, unchanged,
            because the design was right the first time.
          </p>
        </div>
      </div>
    </section>
  );
}
