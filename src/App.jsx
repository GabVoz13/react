import "./App.css";
import Gallery from "./components/Gallery.jsx";
import { images } from "./data/images.js";

export default function App() {
    return (
        <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
            <h1>My Gallery</h1>
            <Gallery items={images} />
        </div>
    );
}

