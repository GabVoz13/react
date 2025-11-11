import { useMemo, useState } from "react";

export default function Gallery({ items }) {
    const [query, setQuery] = useState("");
    const [index, setIndex] = useState(0);
    const [dimBg, setDimBg] = useState(false);

    // filter images when typing
    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return items;
        return items.filter(
            (it) =>
                it.title.toLowerCase().includes(q) ||
                it.tags.some((t) => t.toLowerCase().includes(q))
        );
    }, [items, query]);

    const current = filtered[index] ?? null;

    // navigate between images
    function next() {
        if (filtered.length === 0) return;
        setIndex((i) => (i + 1) % filtered.length);
    }

    function prev() {
        if (filtered.length === 0) return;
        setIndex((i) => (i - 1 + filtered.length) % filtered.length);
    }

    return (
        <div
            style={{
                padding: 16,
                borderRadius: 16,
                backgroundColor: dimBg ? "rgba(0,0,0,0.05)" : "transparent",
                transition: "background-color 0.3s",
            }}
        >
            {/* search + buttons */}
            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                <input
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setIndex(0);
                    }}
                    placeholder="Search by title or tag..."
                    style={{
                        flex: 1,
                        padding: "8px 12px",
                        borderRadius: 10,
                        border: "1px solid #ccc",
                    }}
                />
                <button onClick={() => setDimBg((v) => !v)}>Toggle BG</button>
                <button
                    onClick={() =>
                        current && alert(`${current.title}\n${current.tags.join(", ")}`)
                    }
                >
                    Info
                </button>
            </div>

            {/* main image area */}
            {current ? (
                <div style={{ textAlign: "center" }}>
                    <img
                        src={current.src}
                        alt={current.title}
                        style={{ maxWidth: 520, width: "100%", borderRadius: 16 }}
                    />
                    <h2>{current.title}</h2>
                    {current.caption && <p>{current.caption}</p>}
                    <p style={{ color: "#666" }}>
                        {current.tags.map((t) => `#${t}`).join(" ")}
                    </p>
                </div>
            ) : (
                <p style={{ color: "#999" }}>No matches found.</p>
            )}

            {/* navigation buttons */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 8,
                    marginTop: 12,
                }}
            >
                <button onClick={prev} disabled={!filtered.length}>
                    ◀ Prev
                </button>
                <button onClick={next} disabled={!filtered.length}>
                    Next ▶
                </button>
            </div>

            {/* small counter */}
            <div
                style={{
                    textAlign: "center",
                    marginTop: 8,
                    fontSize: 13,
                    color: "#666",
                }}
            >
                Showing {filtered.length} of {items.length}
            </div>
        </div>
    );
}
