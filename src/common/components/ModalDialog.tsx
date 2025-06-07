import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import type { ReactNode } from "react";

interface ModalDialogProps {
  isOpen: boolean;
  onClose?: () => void;
  children: ReactNode;
}

export default function ModalDialog({ isOpen, onClose, children }: ModalDialogProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const backdropRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (modalRef.current && backdropRef.current) {
        gsap.fromTo(
          modalRef.current,
          { y: -100, opacity: 0 },
          {
            y: 50,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
          }
        );

        gsap.fromTo(
          backdropRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.4, ease: "power1.out" }
        );
      }
    }
  }, [isOpen]);

  const handleClose = () => {
    if (!modalRef.current || !backdropRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        onClose?.();
      },
    });

    tl.to(modalRef.current, {
      y: -100,
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
    }).to(
      backdropRef.current,
      { opacity: 0, duration: 0.3 },
      "<" // start at the same time
    );
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      ref={backdropRef}
      style={{zIndex:"1001"}}
      className="fixed inset-0 flex items-start justify-center bg-black/50"
      onClick={handleClose}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-2xl shadow-lg p-6 w-[96%] max-w-lg relative mt-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        <>
          {children}
        </>
      </div>
    </div>,
    document.body
  );
}
