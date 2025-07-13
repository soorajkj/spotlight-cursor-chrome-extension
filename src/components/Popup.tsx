export default function Popup() {
  const handleClick = async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    chrome.scripting.executeScript<boolean[], void>({
      target: { tabId: tab.id! },
      func: () => {
        const existing = document.getElementById("__spotlight-overlay");
        if (existing) {
          existing.remove();
          window.removeEventListener("mousemove", (window as any).Handler);
          delete (window as any).Active;
          return;
        }

        const overlay = document.createElement("div");
        overlay.id = "__spotlight-overlay";
        overlay.style.position = "fixed";
        overlay.style.left = "0";
        overlay.style.top = "0";
        overlay.style.width = "100vw";
        overlay.style.height = "100vh";
        overlay.style.pointerEvents = "none";
        overlay.style.zIndex = "999999999";
        overlay.style.mixBlendMode = "mutltiply";
        overlay.style.background = "rgba(0,0,0,1)";
        document.body.appendChild(overlay);

        const initX = 50;
        const initY = 50;
        overlay.style.background = `radial-gradient(
          circle at ${initX}% ${initY}%,
          rgba(20, 20, 20, 0) 0%,
          rgba(20, 20, 20, 0.4) 17%,
          rgba(20, 20, 20, 0.6) 19%,
          rgba(20, 20, 20, 0.9) 22%,
          rgba(20, 20, 20, 1) 30%,
          rgba(20, 20, 20, 1) 100%
        )`;

        const handler = (e: MouseEvent) => {
          const x = (e.clientX / window.innerWidth) * 100;
          const y = (e.clientY / window.innerHeight) * 100;
          overlay.style.background = `radial-gradient(
            circle at ${x}% ${y}%,
            rgba(20, 20, 20, 0) 0%,
            rgba(20, 20, 20, 0.4) 17%,
            rgba(20, 20, 20, 0.6) 19%,
            rgba(20, 20, 20, 0.9) 22%,
            rgba(20, 20, 20, 1) 30%,
            rgba(20, 20, 20, 1) 100%
          )`;
        };

        (window as any).Handler = handler;
        window.addEventListener("mousemove", handler);
      },
    });
  };

  return (
    <div className="flex flex-col p-6 w-full">
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded"
        onClick={handleClick}
      >
        Toggle Spotlight
      </button>
    </div>
  );
}
