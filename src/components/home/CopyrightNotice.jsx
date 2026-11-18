import { Dialog } from "radix-ui";
import { Button } from "@/components/ui/button";

export function CopyrightNotice({ open, onConfirm }) {
  return (
    <Dialog.Root open={open}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/45" />
        <Dialog.Content
          onPointerDownOutside={(event) => event.preventDefault()}
          onInteractOutside={(event) => event.preventDefault()}
          onEscapeKeyDown={(event) => event.preventDefault()}
          className="fixed top-1/2 left-1/2 z-50 flex max-h-[min(36rem,calc(100svh-2.5rem))] w-[min(calc(100%-2rem),22.5rem)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-[28px] bg-white text-ink shadow-[0_24px_60px_rgba(23,48,38,0.22)] outline-none"
        >
          <div className="overflow-y-auto px-6 pt-6 pb-2">
            <Dialog.Description className="text-[11px] font-bold tracking-[0.08em] text-olive uppercase">
              Confidential Prototype
            </Dialog.Description>
            <Dialog.Title className="mt-2 text-[18px] leading-snug font-bold tracking-[-0.03em]">
              Pemberitahuan Hak Cipta & Kerahasiaan
            </Dialog.Title>
            <div className="mt-4 flex flex-col gap-3 text-[13px] leading-relaxed text-[#4d574f]">
              <p>
                Seluruh desain antarmuka (UI), alur sistem (UX flow), konsep,
                dan aset visual yang ditampilkan dalam prototipe ini merupakan
                hak milik intelektual eksklusif dan dilindungi oleh
                Undang-Undang Hak Cipta.
              </p>
              <p>
                Prototipe ini disediakan secara rahasia khusus untuk keperluan
                evaluasi dan peninjauan oleh pihak yang dituju. Dilarang keras
                menyalin, mereproduksi, memodifikasi, mendistribusikan, atau
                mengimplementasikan desain maupun alur serupa tanpa izin
                tertulis dan kesepakatan resmi dari pemilik. Segala bentuk
                pelanggaran atau penggunaan tanpa sepengetahuan pemilik akan
                diproses sesuai ketentuan hukum yang berlaku.
              </p>
            </div>
          </div>
          <div className="px-6 pt-3 pb-6">
            <Button
              type="button"
              onClick={onConfirm}
              className="h-12 w-full rounded-full text-[14px] font-semibold"
            >
              Saya mengerti
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
