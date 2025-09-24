import { create } from 'zustand';

// Interface untuk pasien
interface PasienData {
    kode?: number; // int AUTO_INCREMENT
    no_rm?: number; // int
    rm_lama?: string | null;
    nama?: string | null;
    no_ktp?: string | null;
    agama?: string | null;
    jenis_kelamin?: string | null;
    nama_ibu?: string | null;
    nama_ayah?: string | null;
    no_bpjs?: string | null;
    nama_kepala_keluarga?: string | null;
    telp?: string | null;
    tgl_lahir?: string | null;
    status?: string | null;
    pendidikan?: string | null;
    pekerjaan?: string | null;
    no_hp?: string | null;
    alamat?: string | null;
    provinsi?: string | null;
    kota?: string | null;
    kecamatan?: string | null;
    kelurahan?: string | null;
    goldar?: string | null;
    suku?: string | null;
    no_id_lain?: string | null;
    id_staff?: string | null;
    tgl_daftar?: string;
    ket?: string;
    status_satusehat?: number;
}
interface PoliData {
    id_list_poli: string;
    nama: string;
    nama_panjang: string;
    buka: string;
    kuota: string;
    status: string;
    inisial: string;
    list_tindakan: string;
    tindakan: string;
    spes: string;
    no_urut: number;
    kdpoli_bpjs: string;
    nmpoli_bpjs: string;
    status_dokter: string;
    lokasi?: string | null;
    kode_coa: string;
    tipe_staff: string;

}
interface DokterData {
    id_dokter: string;
    username: string;
    nik: string;
    nama: string;
    dokter_spes: string;
    kode_dokter: string;
    izin_akses: string;
    tipe: string;
    status: string;
    foto?: string | null;
    ket: string;
    lokasi?: string | null;
    kuota: number;
    jasmed_pp_pagi: number;
    jasmed_pp_sore: number;
    jasmed_asuransi_pagi: number;
    jasmed_asuransi_sore: number;
    jasmed_bpjs_pagi: number;
    jasmed_bpjs_sore: number;
    jasmed_timah_pagi: number;
    jasmed_timah_sore: number;
    rs_pp_pagi: number;
    rs_pp_sore: number;
    rs_asuransi_pagi: number;
    rs_asuransi_sore: number;
    rs_timah_pagi: number;
    rs_timah_sore: number;
    rs_bpjs: number;
}

interface BookingStore {
    pasien: PasienData | null;
    poli: PoliData | null;
    tanggal: string;
    dokter: DokterData | null;
}
