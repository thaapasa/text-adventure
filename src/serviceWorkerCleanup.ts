// Registers a one-shot service worker whose only job is to nuke caches and
// unregister itself, evicting the old CRA precache SW that some returning
// clients still have installed. Once those clients have successfully run
// the cleanup SW once, future loads have no SW at all.

export function registerCleanupServiceWorker(): void {
  if (!("serviceWorker" in navigator)) {
    return;
  }
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js").catch((err) => {
      console.warn("Cleanup service worker registration failed", err);
    });
  });
}
