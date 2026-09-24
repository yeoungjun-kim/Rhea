import { useCart } from "../context/useCart";

export default function Toast() {
  const { toast, dismissToast, setIsOpen } = useCart();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 inset-x-0 z-[60] flex justify-center px-6 pointer-events-none">
      <div
        key={toast.id}
        className="toast-enter pointer-events-auto flex items-center gap-4 bg-ink text-bone px-5 py-4 shadow-lg max-w-sm w-full sm:w-auto"
      >
        <p className="text-xs tracked flex-1">{toast.message.toUpperCase()}</p>
        <button
          onClick={() => {
            setIsOpen(true);
            dismissToast();
          }}
          className="text-[11px] tracked border-b border-bone/50 pb-0.5 hover:border-bone transition-colors flex-shrink-0"
        >
          VIEW BAG
        </button>
        <button
          onClick={dismissToast}
          aria-label="Dismiss"
          className="text-bone/60 hover:text-bone text-lg leading-none flex-shrink-0"
        >
          ×
        </button>
      </div>
    </div>
  );
}
