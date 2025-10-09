export const getDays = (tanggalServer?: string | null): string => {
    if (!tanggalServer) return "-";

    try {
        // Tanggal dari server (ISO)
        const target = new Date(tanggalServer);
        if (isNaN(target.getTime())) return "-";

        // Ambil tanggal lokal (tanpa jam)
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const targetDate = new Date(target.getFullYear(), target.getMonth(), target.getDate());

        // Hitung selisih dalam milidetik
        const diffTime = targetDate.getTime() - today.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return "Sudah lewat";
        if (diffDays === 0) return "Hari ini";
        if (diffDays === 1) return "Besok";
        return `${diffDays} hari lagi`;
    } catch (error) {
        console.error("Gagal menghitung sisa hari:", error);
        return "-";
    }
};

