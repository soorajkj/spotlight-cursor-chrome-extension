import { defineManifest } from "@crxjs/vite-plugin";

export default defineManifest({
  manifest_version: 3,
  name: "spotlight cursor",
  description:
    "Lightweight Chrome extension that lets you activate a spotlight on any webpage",
  version: "1.0.0",
  action: { default_popup: "index.html" },
  permissions: ["scripting", "activeTab", "storage"],
  host_permissions: ["<all_urls>"],
  icons: { 32: "tourch.png" },
});
