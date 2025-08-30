@php use App\Http\Controllers\GuestController; @endphp

<x-app-layout>
    <div>
        <h1>Ruang Bangun</h1>
    </div>
    <div>
        @foreach (GuestController::$ruang as $ruang)
            <a class="p-2 capitalize" href="{{ route('guest.show', $ruang) }}">{{ str_replace('-', ' ', $ruang) }}</a>
        @endforeach
    </div>
</x-app-layout>
