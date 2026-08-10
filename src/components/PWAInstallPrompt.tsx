import React, { useState, useEffect } from 'react';
import { Download, X, Share, PlusSquare, Smartphone, Check } from 'lucide-react';

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [installed, setInstalled] = useState(false);
  const [isDismissed, setIsDismissed] = useState(() => {
    return localStorage.getItem('pwa_banner_dismissed') === 'true';
  });

  useEffect(() => {
    // Check if already installed / running in standalone mode
    const isStandaloneApp = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true;
    setIsStandalone(isStandaloneApp);

    if (isStandaloneApp || localStorage.getItem('pwa_installed') === 'true') {
      setInstalled(true);
      return;
    }

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    // Listen for beforeinstallprompt event (Android / Chrome / Desktop)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Auto show prompt if not dismissed
      if (localStorage.getItem('pwa_banner_dismissed') !== 'true') {
        setShowPrompt(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    window.addEventListener('appinstalled', () => {
      setInstalled(true);
      setShowPrompt(false);
      setDeferredPrompt(null);
      localStorage.setItem('pwa_installed', 'true');
    });

    // If iOS and not dismissed, show prompt after 1.5s
    if (isIosDevice && !isStandaloneApp && localStorage.getItem('pwa_banner_dismissed') !== 'true') {
      const timer = setTimeout(() => setShowPrompt(true), 1500);
      return () => clearTimeout(timer);
    }

    // Default trigger for testing/demo if event hasn't fired yet
    const timer = setTimeout(() => {
      if (localStorage.getItem('pwa_banner_dismissed') !== 'true' && !isStandaloneApp) {
        setShowPrompt(true);
      }
    }, 2000);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      clearTimeout(timer);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setInstalled(true);
        setShowPrompt(false);
        localStorage.setItem('pwa_installed', 'true');
      }
      setDeferredPrompt(null);
    } else if (isIOS) {
      setShowIOSGuide(true);
    } else {
      alert("Pour installer TikTok :\n1. Ouvrez le menu de votre navigateur (⋮ ou ⋯)\n2. Appuyez sur 'Ajouter à l'écran d'accueil' ou 'Installer l'application'");
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    setShowIOSGuide(false);
    setIsDismissed(true);
    localStorage.setItem('pwa_banner_dismissed', 'true');
  };

  if (isStandalone || installed || isDismissed) {
    return null;
  }

  return (
    <>
      {/* Floating Mini Banner with explicit close button */}
      {!showPrompt && !showIOSGuide && (
        <div className="fixed bottom-20 right-4 z-40 flex items-center bg-[#FE2C55] text-white pl-3 pr-1 py-2 rounded-full shadow-2xl border border-white/20 transition-all hover:bg-[#e0264a] animate-bounce">
          <button
            onClick={() => setShowPrompt(true)}
            className="flex items-center gap-2 active:scale-95 transition-transform"
            title="Installer l'application TikTok"
          >
            <img
              src="https://ysbiedwkakdqadxtuwab.supabase.co/storage/v1/object/public/uploads/da6978f0-ecdb-4bb7-b0ce-ac96730cd7c4.png"
              alt="TikTok"
              className="w-6 h-6 rounded-md object-cover shadow-xs"
            />
            <span className="text-xs font-bold tracking-tight pr-1">Installer TikTok</span>
          </button>
          <button
            onClick={handleDismiss}
            className="p-1 hover:bg-black/20 rounded-full transition-colors ml-1"
            title="Fermer"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
      )}

      {/* Main Popup Modal */}
      {showPrompt && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-300">
          <div className="w-full max-w-sm bg-neutral-900 border border-neutral-800 text-white rounded-3xl p-5 shadow-2xl relative flex flex-col items-center text-center">
            
            {/* Close Button */}
            <button
              onClick={handleDismiss}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white p-1 rounded-full bg-neutral-800/80 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* TikTok Icon with Rounded Corners */}
            <div className="relative mb-3 mt-1">
              <img
                src="https://ysbiedwkakdqadxtuwab.supabase.co/storage/v1/object/public/uploads/da6978f0-ecdb-4bb7-b0ce-ac96730cd7c4.png"
                alt="TikTok App Icon"
                className="w-20 h-20 rounded-[22%] object-cover shadow-2xl border border-neutral-700/80"
              />
              <div className="absolute -bottom-1 -right-1 bg-[#FE2C55] text-white p-1 rounded-full shadow-md">
                <Download className="w-4 h-4" />
              </div>
            </div>

            {/* Title & Description */}
            <h3 className="text-lg font-bold text-white mb-1">
              Installer l'application TikTok
            </h3>
            <p className="text-xs text-neutral-300 mb-5 leading-relaxed px-2">
              Installez l'application sur votre écran d'accueil pour profiter d'une expérience plein écran plus rapide et plus fluide.
            </p>

            {/* Install Button */}
            <div className="w-full space-y-2">
              <button
                onClick={handleInstallClick}
                className="w-full bg-[#FE2C55] hover:bg-[#e0264a] text-white font-bold py-3 px-4 rounded-xl text-sm transition-all shadow-lg active:scale-98 flex items-center justify-center gap-2"
              >
                <Smartphone className="w-4 h-4" />
                <span>Installer maintenant</span>
              </button>

              <button
                onClick={handleDismiss}
                className="w-full bg-transparent hover:bg-neutral-800 text-neutral-400 font-medium py-2 text-xs rounded-xl transition-colors"
              >
                Plus tard
              </button>
            </div>
          </div>
        </div>
      )}

      {/* iOS Installation Guide Modal */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in duration-300">
          <div className="w-full max-w-sm bg-neutral-900 border border-neutral-800 text-white rounded-3xl p-6 shadow-2xl relative flex flex-col items-center text-center">
            
            <button
              onClick={() => setShowIOSGuide(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white p-1 rounded-full bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <img
              src="https://ysbiedwkakdqadxtuwab.supabase.co/storage/v1/object/public/uploads/da6978f0-ecdb-4bb7-b0ce-ac96730cd7c4.png"
              alt="TikTok Icon"
              className="w-16 h-16 rounded-[22%] object-cover shadow-xl mb-3 border border-neutral-700"
            />

            <h3 className="text-base font-bold text-white mb-3">
              Installer sur iPhone / iPad
            </h3>

            <div className="w-full text-left bg-neutral-800/80 rounded-2xl p-4 space-y-3 mb-5 border border-neutral-700/50 text-xs">
              <div className="flex items-center gap-3 text-neutral-200">
                <div className="w-7 h-7 rounded-full bg-neutral-700 flex items-center justify-center shrink-0 text-[#FE2C55]">
                  <Share className="w-4 h-4" />
                </div>
                <span>1. Appuyez sur le bouton <strong>Partager</strong> en bas de Safari.</span>
              </div>

              <div className="flex items-center gap-3 text-neutral-200">
                <div className="w-7 h-7 rounded-full bg-neutral-700 flex items-center justify-center shrink-0 text-[#FE2C55]">
                  <PlusSquare className="w-4 h-4" />
                </div>
                <span>2. Faites défiler et appuyez sur <strong>Sur l'écran d'accueil</strong>.</span>
              </div>

              <div className="flex items-center gap-3 text-neutral-200">
                <div className="w-7 h-7 rounded-full bg-neutral-700 flex items-center justify-center shrink-0 text-[#FE2C55]">
                  <Check className="w-4 h-4" />
                </div>
                <span>3. Validez en appuyant sur <strong>Ajouter</strong> en haut à droite.</span>
              </div>
            </div>

            <button
              onClick={() => setShowIOSGuide(false)}
              className="w-full bg-[#FE2C55] text-white font-bold py-3 rounded-xl text-sm hover:bg-[#e0264a] transition-all"
            >
              J'ai compris
            </button>
          </div>
        </div>
      )}
    </>
  );
}
