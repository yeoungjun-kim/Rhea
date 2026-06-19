export default function Footer() {
  return (
    <footer id="footer" className="border-t border-line py-14">
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row justify-between gap-8">
        <div>
          <p className="font-serif tracked-lg text-xl mb-3">RHEA</p>
          <p className="text-xs text-stone max-w-xs">Quiet, considered clothing. Designed in small runs, made to last.</p>
        </div>
        <div className="flex gap-16 text-xs tracked text-stone">
          <div className="space-y-2">
            <p className="text-ink">SUPPORT</p>
            <p>Sizing guide</p>
            <p>Shipping</p>
            <p>Returns</p>
          </div>
          <div className="space-y-2">
            <p className="text-ink">CONNECT</p>
            <p>Journal</p>
            <p>Instagram</p>
            <p>Contact</p>
          </div>
        </div>
      </div>
      <p className="text-[11px] text-stone text-center mt-12">© 2026 Rhea Atelier. All rights reserved.</p>
    </footer>
  );
}
