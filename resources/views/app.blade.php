@php
    use App\Http\Controllers\GuestController;
@endphp

<x-app-layout>
    <div class="relative min-h-dvh">
        <!-- Lingkaran Biru (absolute, hanya setengah yg kelihatan) -->
        <div class="fixed -top-54 left-1/2 -translate-x-1/2 w-[370px] h-[370px] bg-blue-500 rounded-full"></div>
        <!-- Judul -->
        <div class="relative z-10 flex justify-center pt-14">
            <h1 class="text-2xl font-bold text-white uppercase">Bangun Ruang</h1>
        </div>

        <!-- Container Tombol -->
        <div class="relative z-10 pt-24 pb-5 flex flex-col items-center space-y-4">
            @foreach (GuestController::$ruang as $ruang)
                <a href="{{ route('guest.show', $ruang) }}"
                   class="w-60 text-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-md transition">
                    {{ ucwords(str_replace('-', ' ', $ruang)) }}
                </a>
            @endforeach
        </div>

        <!-- Footer Images Absolute -->
        <div class="absolute w-full bottom-0 left-0">
            <img src="{{ asset('images/ui1.png') }}" alt="Ruang Bangun"
                 class="absolute left-4 bottom-0 w-24 h-24">

            <img src="{{ asset('images/ui2.png') }}" alt="Ruang Bangun"
                 class="absolute right-24 bottom-0 w-24 h-24">

            <img src="{{ asset('images/ui3.png') }}" alt="Ruang Bangun"
                 class="absolute right-4 bottom-4 w-24 h-24">
        </div>
    </div>
</x-app-layout>
