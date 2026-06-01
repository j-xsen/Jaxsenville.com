export default WorldMap;

import { useRef, useEffect } from "react";
import { X } from "lucide-react";
import "./WorldMap.css";

interface WorldMapProps {
    open: boolean;
    onClose: () => void;
}

// Update left/top percentages to match each building's center position on the map
const SUBDOMAINS = [
    {
        name: "Philanthropy Clinic",
        label: "Philanthropy\nClinic",
        slug: "clinic",
        href: "https://clinic.jaxsenville.com",
        img: "/map/clinic.avif",
        left: "27%",
        top: "45%",
    },
    {
        name: "Museum of Jaxsen",
        label: "Museum of\nJaxsen",
        slug: "museum",
        href: "https://museum.jaxsenville.com",
        img: "/map/museum.avif",
        left: "73%",
        top: "35%",
    },
    {
        name: "Noise Emporium",
        label: "Noise\nEmporium",
        slug: "noise",
        href: "https://noise.jaxsenville.com",
        img: "/map/noise.avif",
        left: "56%",
        top: "70%",
    },
];

function WorldMap({ open, onClose }: WorldMapProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;
        if (open) {
            dialog.showModal();
        } else if (dialog.open) {
            dialog.close();
        }
    }, [open]);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;
        const handleClose = () => onClose();
        dialog.addEventListener("close", handleClose);
        return () => dialog.removeEventListener("close", handleClose);
    }, [onClose]);

    return (
        <dialog
            ref={dialogRef}
            className="world-map-dialog"
            aria-label="Jaxsenville world map"
            aria-modal="true"
        >
            <button
                className="world-map-close"
                onClick={onClose}
                aria-label="Close map"
            >
                <X size={24} strokeWidth={2.5} />
            </button>
            <div className="world-map-container">
                <img
                    src="/map/map_open.avif"
                    alt="Map of Jaxsenville"
                    className="world-map-bg"
                    draggable={false}
                />
                {SUBDOMAINS.map((sub) => (
                    <a
                        key={sub.name}
                        href={sub.href}
                        className={`world-map-pin world-map-pin--${sub.slug}`}
                        style={{ left: sub.left, top: sub.top }}
                        aria-label={`Visit ${sub.name} at ${sub.href.replace("https://", "")}`}
                    >
                        <img src={sub.img} alt="" draggable={false} />
                        <span className="world-map-pin-label">{sub.label}</span>
                    </a>
                ))}
            </div>
        </dialog>
    );
}
