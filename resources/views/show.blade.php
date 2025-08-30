<x-app-layout>
    @push('scripts')
        <script>
            var model = "{{ $ruang }}";
        </script>
        @vite('resources/js/show.js')
    @endpush
    <header class="bg-white shadow-sm py-4 px-6 fixed z-30 w-full">
        <div class="container mx-auto flex items-center">
            <!-- Tombol Kembali -->
            <a href="{{ route('guest.index') }}" class="text-blue-500 hover:text-blue-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
            </a>

            <!-- Judul di Tengah -->
            <h1 class="text-xl font-semibold text-gray-800 mx-auto">
                {{ ucwords(str_replace('-', ' ', $ruang)) }}
            </h1>

            <!-- Spacer untuk menyeimbangkan layout -->
            <div class="w-6"></div>
        </div>
    </header>
</x-app-layout>
