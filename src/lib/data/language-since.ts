// Earliest repository per language, taken from `gh repo list --limit 1000 --json createdAt,primaryLanguage`
// on the account Lebenoa. `null` means no repository was found for that language.
export const languageSince: Record<string, string | null> = {
    "C#": "2026-09-13T05:29:55Z", // Lebenoa/FPSUnlock
    GO: "2022-05-09T05:31:36Z", // Lebenoa/shorturl-gs
    Java: "2025-07-31T18:47:55Z", // Lebenoa/Meteorist (fork)
    JavaScript: "2022-12-07T09:43:38Z", // Lebenoa/webui-image-dowloader
    Kotlin: null,
    PHP: "2023-05-05T19:26:18Z", // Lebenoa/wso
    Python: null,
    Rust: "2023-01-31T05:56:28Z", // Lebenoa/renamer
    Zig: "2024-01-13T12:06:39Z" // Lebenoa/zigu
};
