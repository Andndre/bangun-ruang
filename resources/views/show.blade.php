<x-app-layout>
    @push('scripts')
        <script>
            var model = "{{ $ruang }}";
        </script>
        @vite('resources/js/show.js')
    @endpush
    Hello
</x-app-layout>
